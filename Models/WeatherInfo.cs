using System;

namespace WeatherApp.Models
{
    public partial class WeatherInfo
    {
        public int WeatherId { get; set; }
        public string Location { get; set; }
        public int RainFall { get; set; }
        public int Temperature { get; set; }
        public int WindSpeed { get; set; }
        public DateTime DateTime { get; set; }
    }
}
