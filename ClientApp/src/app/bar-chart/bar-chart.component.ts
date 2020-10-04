import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from "chart.js";
import { Observable } from "rxjs";
import { bufferTime } from "rxjs/operators";
import { DatePipe } from '@angular/common'
import { transform } from 'typescript';

@Component({
  selector: 'bar-chart',
  template: `<h3>Lämpötila ja sademäärä</h3>
      <canvas #chart width="800" height="300"></canvas>`,
  styles: [`
      :host {
          display: inline-block;
          position: relative;
      }
  `]
})

export class BarChartComponent implements AfterViewInit {

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

  constructor(public datepipe: DatePipe) {

  }

  ngOnChanges() {

    this.Locations.length = 0;
    this.Temperatures.length = 0;
    this.Rainfalls.length = 0;
    this.Dates.length = 0;

    if (this.locationFilter) {

      var filtered = this.dataSource.forEach(x => {

        if (x.location == this.locationFilter) {

          this.Locations.push(x.location);
          this.Rainfalls.push(x.rainFall);
          this.Temperatures.push(x.temperature);
          this.Dates.push(this.datepipe.transform(x.dateTime, 'dd.MM.yyyy H.mm'));
        }
      });

    } else {

      var all = this.dataSource.forEach(x => {

          this.Rainfalls.push(x.rainFall);
          this.Temperatures.push(x.temperature);
          this.Dates.push(this.datepipe.transform(x.dateTime, 'dd.MM.yyyy H.mm'));        
      });
    }

    if (!this.dataSource) {
      console.log('Nyt ei piirretä')
    }

    if (this.dataSource) {
      this.chart.update();
    }
  }

  ngAfterViewInit() {

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.Dates,
        datasets: [{
          data: this.Rainfalls,
          borderColor: '#3cb371',
          backgroundColor: '#1d3557'
        },
          {
            data: this.Temperatures,
            borderColor: '#3cb371',
            backgroundColor: '#FF8080',
            type: 'line'
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            display: true
          }]
        }
      }
    });


  }


}
