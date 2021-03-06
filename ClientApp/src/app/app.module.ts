import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common'

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CreateWeather } from './add-weather/add-weather.component';
import { FetchWeatherComponent } from './fetch-weather/fetch-weather.component';
import { WeatherService } from './Services/weatherservice.service';
import { AddLocation } from './manage-locations/manage-locations.component';
import { FilterComponent } from './filter-bar/filter-bar.component';
import { DashboardComponent } from './dash-board/dash-board.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchWeatherComponent, 
    CreateWeather,
    AddLocation,
    FilterComponent,
    DashboardComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-weather', component: FetchWeatherComponent },
      { path: 'add-weather', component: CreateWeather },
      { path: 'weather/edit/:id', component: CreateWeather },
      { path: 'manage-locations', component: AddLocation },
      { path: 'dash-board', component: DashboardComponent },
      { path: 'filter-bar', component: FilterComponent },
      { path: '**', redirectTo: 'home' }  
    ])
  ],
  providers: [WeatherService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
