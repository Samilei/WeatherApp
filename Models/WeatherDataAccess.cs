using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeatherApp.Models
{
    public class WeatherDataAccess
    {
        masterContext db = new masterContext();

        public IEnumerable<WeatherInfo> GetAllWeatherInfo()
        {
            try
            {
                return db.WeatherInfo.ToList();
            }
            catch
            {
                throw;
            }
        }

           
        public int AddWeatherInfo(WeatherInfo weather)
        {
            try
            {
                db.WeatherInfo.Add(weather);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                System.Diagnostics.Trace.WriteLine(weather);
                throw;
            }
        }

        public int AddLocation(Location location)
        {
            try
            {
                db.Location.Add(location);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                System.Diagnostics.Trace.WriteLine(location);
                throw;
            }
        }

        //To Delete the record of a particular employee  
        public int DeleteLocation(int id)
        {
            try
            {
                Location location = db.Location.Find(id);
                db.Location.Remove(location);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar employee  
        public int UpdateWeather(WeatherInfo weather)
        {
            try
            {
                db.Entry(weather).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular employee  
        public WeatherInfo GetWeatherInfo(int id)
        {
            try
            {
                WeatherInfo weather = db.WeatherInfo.Find(id);
                return weather;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular employee  
        public int DeleteWeatherInfo(int id)
        {
            try
            {
                WeatherInfo emp = db.WeatherInfo.Find(id);
                db.WeatherInfo.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Get the list of Cities  
        public IEnumerable<Location> GetLocations()
        {
            /* List<Location> lstCity = new List<Location>();
             lstCity = (from CityList in db.Location select CityList).ToList(); */

            List<Location> jep = new List<Location>();

            jep = db.Location.ToList();

            System.Diagnostics.Trace.WriteLine("Joo");
           // System.Diagnostics.Trace.WriteLine(db.Location.ToList());

            foreach (var i in jep)
            {
                System.Diagnostics.Trace.WriteLine(i.Name);
            }

            try
            {
                return db.Location.ToArray();
            }
            catch
            {
                throw;
            }

           // return lstCity;
        }
    }
}