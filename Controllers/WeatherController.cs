using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeatherApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace WeatherApp.Controllers
{

    public class WeatherController : Controller
    {
        WeatherDataAccess weatherObj = new WeatherDataAccess();

        [HttpGet]
        [Route("api/WeatherInfo/Index")]
        public IEnumerable<WeatherInfo> Index()
        {
            return weatherObj.GetAllWeatherInfo();
        }

        [HttpPost]
        [Route("api/WeatherInfo/Filter")]
        public IEnumerable<WeatherInfo> Filter([FromBody] Filters filters)
        {
            System.Diagnostics.Trace.WriteLine(filters.EndDate);
            System.Diagnostics.Trace.WriteLine(filters.StartDate);
            return weatherObj.GetFilteredWeatherInfo(filters);
        }

        [HttpPost]
        [Route("api/WeatherInfo/Create")]
        public int Create([FromBody] WeatherInfo weather)
        {

            System.Diagnostics.Trace.WriteLine(weather);

            return weatherObj.AddWeatherInfo(weather);
        }

        [HttpGet]
        [Route("api/WeatherInfo/Details/{id}")]
        public WeatherInfo Details(int id)
        {
            return weatherObj.GetWeatherInfo(id);
        }

        [HttpPut]
        [Route("api/WeatherInfo/Edit")]
        public int Edit([FromBody] WeatherInfo weather)
        {
            return weatherObj.UpdateWeather(weather);
        }

        [HttpDelete]
        [Route("api/WeatherInfo/Delete/{id}")]
        public int Delete(int id)
        {
            return weatherObj.DeleteWeatherInfo(id);
        }

        [HttpGet]
        [Route("api/WeatherInfo/GetLocationList")]
        public IEnumerable<Location> Details()
        {
            return weatherObj.GetLocations();
        }

        [HttpPost]
        [Route("api/Location/Create")]
        public int Create([FromBody] Location location)
        {

            System.Diagnostics.Trace.WriteLine(location);

            return weatherObj.AddLocation(location);
        }

        [HttpDelete]
        [Route("api/Location/Delete/{id}")]
        public int DeleteLocation(int id)
        {
            return weatherObj.DeleteLocation(id);
        }



    }
}