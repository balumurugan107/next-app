export interface Plans {
  status: string;
  name: string;
  description?: string;
  referer?: string;
  maxNumOfGroups?: number;
  assignsTheRole: string;
  amount: number;
  interval: string;
  trialPeriod?: number;
}
