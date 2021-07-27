export interface UnitTrustFundDetail {
  ClientIdentifier: string;
  InvestorNames: string;
  FundShareClassCode: string;
  FundName: string;
  MarketValue: number;
  Contributions: number;
  Withdrawals: number;
  Balance: number;
  Units: number;
  UnitPrice: number;
  GainLoss: number;
  CumulativeIncome: number;
}

export interface FundBalance {
  UnitTrustFundDetails: UnitTrustFundDetail[];
  ClientIdentifier: string;
  IsSuccess: boolean;
  Message: string;
  ResponseCode: number;
}
