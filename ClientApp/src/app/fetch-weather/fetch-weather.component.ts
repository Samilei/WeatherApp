import { AfterViewInit, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from '../Services/weatherservice.service';
import { Observable } from "rxjs";



@Component({
  templateUrl: './fetch-weather.component.html',
  selector: 'weather-management'
 
})

export class FetchWeatherComponent {
  public weatherList: any;
  public weathers: Observable<any>;


 

  constructor(public http: HttpClient, private _router: Router, private _weatherService: WeatherService) {
    this.getWeather();

    this.weathers = this.weatherList;

  }

  getWeather() {
    this._weatherService.getWeather().subscribe(
      data => this.weatherList = data
    )
  }



  delete(weatherID) {
    var ans = confirm("Do you want to delete customer with Id: " + weatherID);
    if (ans) {
      this._weatherService.deleteWeather(weatherID).subscribe((data) => {
        this.getWeather();
      }, error => console.error(error))
    }
  }
}





interface WeatherData {
  weatherId: number;
  rainfall: number;
  location: string;
  temperature: number;
  windspeed: number;
  datetime: Date;

}



 

