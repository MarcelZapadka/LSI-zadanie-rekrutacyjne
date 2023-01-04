import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import {filter, switchMap} from 'rxjs/operators';
import { ThemeModeService } from './theme-mode.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ThemeModeService]
})
export class AppComponent implements OnInit{

  darkModeForm: FormControl = new FormControl();
  dateForm: FormControl = new FormControl();
  exchangeRates?: Array<any> = [];
  /* Hacky way to clear primeNg table sorting. Looks like primeNg performs sort on input array */
  _exchangeRates?: Array<any> = []; 
  stateOptions = [{label: 'Ciemny', value: 'dark'}, {label: 'Jasny', value: 'light'}];
  @ViewChild(Table) tableRef?: Table;

  get browserThemeValue() {
    return this.themeService.isDarkMode ? "dark" : "light";
  }

  constructor(
    private api: ApiService,
    private themeService: ThemeModeService,
  ) {}

  setTableDate(value: Array<any>): void {
    this.exchangeRates = value;
    this._exchangeRates = value.slice();
  }

  clear(): void {
    this.tableRef?.clear();
    this.exchangeRates = this._exchangeRates?.slice();
  }

  ngOnInit(): void {
    this.api.getCurrentExchanges().subscribe(value => this.setTableDate(value));

    this.dateForm.valueChanges.pipe(
      filter(value => !!value),
      switchMap(value => this.api.getSpecificDayExchanges(moment(value).format("YYYY-MM-DD")))
    ).subscribe(
      value => this.setTableDate(value),
      () => this.exchangeRates = undefined
    );

    this.darkModeForm.valueChanges.subscribe(value => {
      this.themeService.switchTheme(value);
    });

    this.darkModeForm.setValue(this.browserThemeValue);
  }
}
