import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';

const PrimeComponents = [
  ButtonModule,
  TableModule,
  CalendarModule,
  SelectButtonModule
]

@NgModule({
  imports: [PrimeComponents],
  exports: [PrimeComponents],
})
export class PrimeModule { }
