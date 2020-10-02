import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, Point } from "chart.js";
import { Observable } from "rxjs";
import { bufferTime } from "rxjs/operators";
import * as d3 from "d3";

@Component({
  selector: 'line-chart',
  template: `
      <canvas #chart width="600" height="200"></canvas>`,
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
  Locations = [];
  LineChart;

  @Input()
  private dataSource: any[];
  

  constructor() {

   

  }

  ngOnChanges() {
    

   // var jsonArray = JSON.parse(JSON.stringify(this.dataSource))

    this.Locations.length = 0;
    this.Temperatures.length = 0;

    var stripped = this.dataSource.forEach(x => {
      this.Locations.push(x.location);
      this.Temperatures.push(x.temperature)

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
        labels: this.Locations,
        datasets: [{

          data: this.Temperatures,
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
