using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TestProject.Models;

namespace TestProject.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private JwtIssuerOptions jwtIssuerOptions { get; }

        public AccountController(IOptions<JwtIssuerOptions> jwtIssuerOptions, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.jwtIssuerOptions = jwtIssuerOptions.Value;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet]
        [Route("register")]
        public IActionResult Register()
        {
            return Ok("this is get request");
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Check the data provided.");
            }
            User userIdentity = new User { FirstName = user.FirstName, LastName = user.LastName, Email = user.Email, UserName = user.Email };
            var result = await userManager.CreateAsync(userIdentity, user.PasswordHash);
            if (result.Succeeded)
            {
                return Ok(new { message = user.FirstName + " Registered successfully!" });
            }
            else
            {
                string error = "";
                foreach(var err in result.Errors)
                {
                    error += err.Description;
                }
                return Problem("Issue while registering user. - " + error , null, 500); 
            }
            
        }

        [Route("login")]
        [HttpGet]
        public IActionResult Login()
        {
            return Ok("You can login by using frontend application.");
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(Credential model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Check the data provided.");
            }
            string secretKey = jwtIssuerOptions.SecretKey;
            SymmetricSecurityKey signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
            User user = await userManager.FindByNameAsync(model.UserName);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDesc = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim("UserId", user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(20),
                    SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDesc);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest("Username or Password is incorrect");
            }

        }

    }
}