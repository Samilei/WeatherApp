import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart, Point } from "chart.js";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from '../Services/weatherservice.service';
import { Observable } from "rxjs";
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements AfterViewInit {



 // @ViewChild('chart', { static: false }) chartRef: ElementRef; 


//  private chart: Chart;
  

 // @Input() filtersToPass: any[];

  weatherForm: FormGroup;

  start: any;
  end: any;

  data: any;
  weatherList: any;


  constructor(public http: HttpClient, private _router: Router, private _weatherService: WeatherService,
    private _fb: FormBuilder) {

   



    this.weatherForm = this._fb.group({
  
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });


  }

  save() {

    console.log(this.weatherForm.value.startDate);

    this._weatherService.getWeatherWithFilters(this.weatherForm.value).subscribe(
      data => this.weatherList = data
    )

    console.log(this.weatherList);

  }
  

  ngAfterViewInit(): void {

   // console.log(this.data)
    console.log(this.weatherList)

    /*

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Interesting Data',
          data: this.data,
          fill: false
        }]
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [{
            type: 'linear'
          }],
        }
      }
    });

  */


  }

  get endDate() { return this.weatherForm.get('endDate'); }
  get startDate() { return this.weatherForm.get('startDate'); }



}

interface Filters {

  startDate: number;
  endDate: string;


}
