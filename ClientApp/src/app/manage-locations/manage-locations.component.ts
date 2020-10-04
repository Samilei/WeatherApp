import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from '../Services/weatherservice.service';

@Component({
  templateUrl: './manage-locations.component.html'
})

export class AddLocation implements OnInit {

  locationForm: FormGroup;
  public title: string = "Luo uusi";
  locationId: number;
  errorMessage: any;
  locationList: any;

  constructor(private _fb: FormBuilder, public avRoute: ActivatedRoute,
    public weatherService: WeatherService, public router: Router) {

    if (this.avRoute.snapshot.params["id"]) {
      this.locationId = this.avRoute.snapshot.params["id"];
    }

    this.locationForm = this._fb.group({
      locationId: 0,
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {

    this.weatherService.getLocationList().subscribe((data) => {

      this.locationList = data 
    });
  }

  save() {

    if (!this.locationForm.valid) {
      return;
    }

    if (this.title == "Luo uusi") {
      this.weatherService.addLocation(this.locationForm.value)
        .subscribe((data) => {

          this.ngOnInit();
         // this.router.navigate(['/manage-locations']);

        }, error => this.errorMessage = error)
    }
  }

  cancel() {
    this.router.navigate(['/fetch-weather']);
  }

  delete(locationId) {
    var ans = confirm("Haluatko varmasti poistaa paikkakunnan id:llä " + locationId);
    if (ans) {
      this.weatherService.deleteLocation(locationId).subscribe((data) => {
        this.ngOnInit();
      }, error => console.error(error))
    }
  }

  get name() { return this.locationForm.get('name'); }
}

interface LocationData {

  locationId: number;
  name: string;
}
