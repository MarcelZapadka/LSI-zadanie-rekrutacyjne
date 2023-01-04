export interface ExchangeRatesInfoDTO {
  effectiveDate: string,
  no: string,
  rates: Array<ExchangeRatesDTO>,
  table: string
}

export interface ExchangeRatesDTO {
  currency: string,
  code: string,
  mid: number
}