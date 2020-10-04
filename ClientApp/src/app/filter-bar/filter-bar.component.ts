import { AfterViewInit, Component, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { Chart, Point } from "chart.js";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from '../Services/weatherservice.service';
import { Observable } from "rxjs";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import {EventEmitter} from '@angular/core';


@Component({
  selector: 'filters',
  templateUrl: './filter-bar.component.html'
})
export class FilterComponent {





  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();


  weatherForm: FormGroup;
  locationList: any;

  start: any;
  end: any;

  data: any;
  weatherList: any;




  constructor(public http: HttpClient, private _router: Router, private _weatherService: WeatherService,
    private _fb: FormBuilder) {

   
    this._weatherService.getLocationList().subscribe((data) => {

      console.log(data);
      this.locationList = data;
      console.log(this.locationList);
    });


    this.weatherForm = this._fb.group({
  
      startDate: ['', []],
      endDate: ['', []],
      location: ['', []]
    });


  }

  save() {

    console.log(this.weatherForm.value.endDate);


    if (this.weatherForm.value.endDate == '') {

      this.weatherForm.value.endDate = null


    }

    if (this.weatherForm.value.startDate == '') {

      this.weatherForm.value.startDate = null


    }


    this.onDatePicked.emit(this.weatherForm.value)

 

    console.log(this.weatherList);

  }
  


  get endDate() { return this.weatherForm.get('endDate'); }
  get startDate() { return this.weatherForm.get('startDate'); }
  get location() { return this.weatherForm.get('location'); }



}

interface Filters {

  startDate: number;
  endDate: string;
  


}
