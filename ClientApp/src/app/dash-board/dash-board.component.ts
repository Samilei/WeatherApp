import { AfterViewInit, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from '../Services/weatherservice.service';
import { Observable } from "rxjs";

@Component({
      templateUrl: './dash-board.component.html'
})

export class DashboardComponent {

  public filtersToUse;
  public initialData: any
  public viewData: any;

  constructor(public http: HttpClient, private _router: Router, private _weatherService: WeatherService) {

  }

  ngAfterViewInit() {

    this.getAllWeatherData();
  }

  public refreshWithFilters(filters): void {
   
    this.filtersToUse = filters.location;
    this.getFilteredWeatherData(filters)
  }

  getAllWeatherData() {

    this._weatherService.getWeather().subscribe(
      data => this.viewData = data
    )
  }

  getFilteredWeatherData(filtersToUse) {

    this._weatherService.getWeatherWithFilters(filtersToUse).subscribe(
     data => this.viewData = data
   )
  }


}








