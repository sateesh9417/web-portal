export interface LoanData {
  id: number;
  referenceNo:string;
  customerName:string;
  phoneNo:string;
  loanAmount:number;
  bank:string;
  referrer:string;
  assignedTo:string;
}

export interface Agent {
  id: number;
  agentId: string;
  agentName: string;
  state: string;
  phoneNo: string;
  district:string;
  assignedApp: string;
  referrer: string;
}
