import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchWeatherComponent } from '../fetch-weather/fetch-weather.component';

import { WeatherService } from '../Services/weatherservice.service';


@Component({
  templateUrl: './add-weather.component.html'
})

export class CreateWeather implements OnInit {

  weatherForm: FormGroup;
  public title: string = "Lisää";
  weatherId: number;
  errorMessage: any;
  locationList: any;

  constructor(private _fb: FormBuilder, public avRoute: ActivatedRoute,
    public weatherService: WeatherService, public router: Router) {

    if (this.avRoute.snapshot.params["id"]) {
      this.weatherId = this.avRoute.snapshot.params["id"];
    }

    this.weatherForm = this._fb.group({
      weatherId: 0,
      temperature: ['', [Validators.required]],
      location: ['', [Validators.required]],
      windSpeed: ['', [Validators.required]],
      rainFall: ['', [Validators.required]],
      dateTime: ['', [Validators.required]]
    });


  }

  ngOnInit() {

   

    this.weatherService.getLocationList().subscribe((data) => {

      console.log(data);
      this.locationList = data;
      console.log(this.locationList);
    });



    console.log(this.locationList);

    if (this.weatherId > 0) {
      this.title = "Edit";
      this.weatherService.getWeatherById(this.weatherId)
        .subscribe(resp => this.weatherForm.setValue(resp)
          , error => this.errorMessage = error);
    }




  }

  save() {

    

    if (!this.weatherForm.valid) {
     return;
    }

    console.log(this.weatherForm.value)


    if (this.title == "Create") {
      this.weatherService.saveWeather(this.weatherForm.value)
        .subscribe((data) => {
          this.router.navigate(['/fetch-weather']);
        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit") {
      this.weatherService.updateWeather(this.weatherForm.value)
        .subscribe((data) => {
          this.router.navigate(['/fetch-weather']);
        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this.router.navigate(['/fetch-weather']);
  }

  get location() { return this.weatherForm.get('location'); }
  get temperature() { return this.weatherForm.get('temperature'); }
  get rainFall() { return this.weatherForm.get('rainFall'); }
  get windSpeed() { return this.weatherForm.get('windSpeed'); }
  get dateTime() { return this.weatherForm.get('dateTime'); }
}

interface LocationData {
  locationId: number;
  name: string;


}
