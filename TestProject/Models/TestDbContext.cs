using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestProject.Models
{
    public class TestDbContext : IdentityDbContext<User>
    {
        public TestDbContext(DbContextOptions options) : base(options)
        {

        }
        public virtual DbSet<Wine> Wine { get; set; }
    }
}
