import { httpClientInstance } from 'src/core/HttpClient';
import JTQP from 'src/utils/jsonToQueryParams';

interface PaymentItent {
  customerID: string;
  amount: number;
  currency: string;
}

export default class PaymentService {
  private static instance: PaymentService;

  private constructor() {
    this.createPayment = this.createPayment.bind(this);
  }

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new PaymentService();
    return this.instance;
  }

  public createPayment = (intent: PaymentItent) =>
    httpClientInstance.get(`/api/v1/payment/intent?${JTQP(intent)}`);

  public getStatus = () => httpClientInstance.get('/api/v1/payment/status');

  public updateDisplayStatus = () => httpClientInstance.put('/api/v1/payment/display/status');
}

export const paymentService = PaymentService.getInstance();
