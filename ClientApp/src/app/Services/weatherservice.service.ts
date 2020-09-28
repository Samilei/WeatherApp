import { Injectable, Inject, ɵisObservable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class WeatherService {
  myAppUrl: string = "";
  title: 'Jep';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getLocationList() {

    console.log(this.myAppUrl + 'api/WeatherInfo/GetLocationList');

    console.log(this.http.get(this.myAppUrl + 'api/WeatherInfo/GetLocationList'));

    return this.http.get(this.myAppUrl + 'api/WeatherInfo/GetLocationList').
      pipe(
        map((data) => {
          return data;
        }),

        catchError(error => {
          return throwError('Something went wrong!');
        })
  ) 
}

  addLocation(location) {


    console.log(location);

    return this.http.post(this.myAppUrl + 'api/Location/Create', location).
      pipe(
        map((data) => {
          return data;
        }),

        catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  deleteLocation(id) {
    return this.http.delete(this.myAppUrl + "api/Location/Delete/" + id)
    //  .map((response: Response) => response.json())
    //   .catch(this.errorHandler);
  }
 


  getWeather() {
    return this.http.get(this.myAppUrl + 'api/WeatherInfo/Index')
     // .map((response: Response) => response.json())
     // .pipe(catchError(this.errorHandler));
  }

  getWeatherById(id: number) {
    return this.http.get(this.myAppUrl + "api/WeatherInfo/Details/" + id).
      pipe(
        map((data) => {
          return data;
        }),

        catchError(error => {
          return throwError('Something went wrong!');
        })
      ) 

        
  }

  saveWeather(weather) {


    console.log(weather);

    return this.http.post(this.myAppUrl + 'api/WeatherInfo/Create', weather).
      pipe(
        map((data) => {
          return data;
        }),

        catchError(error => {
          return throwError('Something went wrong!');
        })
      ) 
  }

  updateWeather(weather) {
    return this.http.put(this.myAppUrl + 'api/WeatherInfo/Edit', weather)
 //     .map((response: Response) => response.json())
    //  .catch(this.errorHandler);
  }

  deleteWeather(id) {
    return this.http.delete(this.myAppUrl + "api/WeatherInfo/Delete/" + id)
    //  .map((response: Response) => response.json())
   //   .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
   return Observable.throw(error);
  }
}

