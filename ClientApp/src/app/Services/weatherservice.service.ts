import { Injectable, Inject, ɵisObservable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  myAppUrl: string = "";
  title: 'Service';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json'
    })
  }

  getLocationList() {

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
  }

  getWeather() {
    return this.http.get(this.myAppUrl + 'api/WeatherInfo/Index')
  }

  getWeatherWithFilters(filters: any) {

    return this.http.post(this.myAppUrl + 'api/WeatherInfo/Filter', filters).
      pipe(
        map((data) => {
          console.log(data
          );
          return data;
        }),
        catchError(error => {
          return throwError('Something went wrong!');
        })
      ) 
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
  }

  deleteWeather(id) {

    return this.http.delete(this.myAppUrl + "api/WeatherInfo/Delete/" + id)
  }

  errorHandler(error: HttpErrorResponse) {

    console.log(error);
    return Observable.throw(error);
  }
}

