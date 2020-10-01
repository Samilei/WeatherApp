import { AfterViewInit, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from '../Services/weatherservice.service';
import { Observable } from "rxjs";



@Component({
  template: `<filters (onDatePicked)="refreshWithFilters($event)"></filters>
             <line-chart [dataSource]="viewData"></line-chart>
             
`
})

export class DashboardComponent {


  public filtersToUse;

  public initialData: any
  public viewData: any;




  constructor(public http: HttpClient, private _router: Router, private _weatherService: WeatherService) {


    this.getAllWeatherData();
    

  }

  public refreshWithFilters(filters): void {
    console.log('Picked date: ', filters);


    this.getFilteredWeatherData(filters)
  }


  getAllWeatherData() {
    this._weatherService.getWeather().subscribe(
      data => this.initialData = data
    )
  }

  getFilteredWeatherData(filtersToUse) {
    this._weatherService.getWeatherWithFilters(filtersToUse).subscribe(
     data => this.viewData = data
   )
  }


}








