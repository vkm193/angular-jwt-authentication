using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestProject.Models
{
    public partial class Wine
    {
        public int Id { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string Designation { get; set; }
        public int? Points { get; set; }
        public double? Price { get; set; }
        public string Province { get; set; }
        [Column("region_1")]
        public string Region1 { get; set; }
        [Column("region_2")]
        public string Region2 { get; set; }
        public string Variety { get; set; }
        public string Winery { get; set; }
    }
}
