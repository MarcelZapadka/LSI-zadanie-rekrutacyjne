import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators'
import { ExchangeRatesDTO, ExchangeRatesInfoDTO } from './dto'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getCurrentExchanges(): Observable<Array<ExchangeRatesDTO>> {
    return this.http.get<Array<ExchangeRatesInfoDTO>>('https://api.nbp.pl/api/exchangerates/tables/A/?format=json')
      .pipe(map(value => value[0].rates));
  };
  
  getSpecificDayExchanges(formattedDate: string): Observable<Array<ExchangeRatesDTO>> {
    return this.http.get<Array<ExchangeRatesInfoDTO>>(`http://api.nbp.pl/api/exchangerates/tables/A/${formattedDate}/?format=json`)
      .pipe(map(value => value[0].rates));
  };
}
