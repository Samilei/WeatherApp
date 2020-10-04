using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace WeatherApp.Models
{
    public class WeatherDataAccess
    {
        DatabaseContext db = new DatabaseContext();

        public IEnumerable<WeatherInfo> GetAllWeatherInfo()
        {
            try
            {
                return db.WeatherInfo.OrderBy(WeatherInfo => WeatherInfo.DateTime).ToList();
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<WeatherInfo> GetFilteredWeatherInfo(Filters filters)
        {

            try
            {
                List<WeatherInfo> weathers = null;

                if (filters.StartDate != null && filters.EndDate != null)
                {
                    return db.WeatherInfo.Where(t => t.DateTime > filters.StartDate && t.DateTime < filters.EndDate).OrderBy(WeatherInfo => WeatherInfo.DateTime).ToArray();

                }

                else if (filters.StartDate != null && filters.EndDate == null)
                {
                    return db.WeatherInfo.Where(t => t.DateTime > filters.StartDate).OrderBy(WeatherInfo => WeatherInfo.DateTime).ToArray();

                }

                else if (filters.StartDate == null && filters.EndDate != null)
                {
                    return db.WeatherInfo.Where(t => t.DateTime < filters.EndDate).OrderBy(WeatherInfo => WeatherInfo.DateTime).ToArray();

                }

                else return weathers;

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

    
        public IEnumerable<Location> GetLocations()
        {

            try
            {
                return db.Location.OrderBy(Location => Location.Name).ToArray();
            }
            catch
            {
                throw;
            }
        }
    }
}