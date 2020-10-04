import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from "chart.js";
import { Observable } from "rxjs";
import { bufferTime } from "rxjs/operators";

@Component({
  selector: 'line-chart',
  template: `<h3>Tuulen nopeus</h3>
      <canvas #chart width="500" height="200"></canvas>`,
  styles: [`
      :host {
          display: inline-block;
          position: relative;
      }
  `]
})
export class LineChartComponent implements AfterViewInit {

  @ViewChild('chart', { static: false }) chartRef: ElementRef;
  private chart: Chart;

  Temperatures = [];
  Rainfalls = [];
  Windspeeds = [];
  Locations = [];
  Dates = [];

  
 

  @Input()
  private dataSource: any[];
  @Input()
  private locationFilter: any;

  constructor() {

   

  }

  ngOnChanges() {
    

   // var jsonArray = JSON.parse(JSON.stringify(this.dataSource))

    

    this.Locations.length = 0;
    this.Temperatures.length = 0;
    this.Windspeeds.length = 0;
    this.Rainfalls.length = 0;
    this.Dates.length = 0;

    var stripped = this.dataSource.forEach(x => {

      if (x.location == this.locationFilter) {

        this.Locations.push(x.location);
        this.Rainfalls.push(x.rainFall);
        this.Windspeeds.push(x.windSpeed);
        this.Temperatures.push(x.temperature);
        this.Dates.push(x.dateTime);
      }
    });

    console.log(this.Locations);
    console.log(this.Temperatures);

   // console.log(jsonArray)

    if (!this.dataSource) {
      console.log('Nyt ei piirretä')
    }

    if (this.dataSource) {
      this.chart.update();
      console.log('Nyt piirretään')
    }
  }

  ngAfterViewInit() {

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.Dates,
        datasets: [{

          data: this.Windspeeds,
          borderColor: '#3cb371',
          backgroundColor: '#0000FF'

        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{ display: true }]
        }
      }
    });


  }

 
}