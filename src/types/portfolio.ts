export interface PortfolioHolding {
  bondId: string;
  amount: number;
  purchaseDate: string;
  estimatedYield: number;
}

export interface DonationRecord {
  projectId: string;
  amount: number;
  donationDate: string;
}
