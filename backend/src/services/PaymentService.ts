import { IProduct, ResponseObject } from "../interfaces/commonInterfaces";
import { v4 as uuidv4 } from "uuid";
import { config } from "dotenv";
import paypal, { configure } from "paypal-rest-sdk";

config();

paypal.configure({
  mode: process.env.paypalMode as string, //sandbox or live
  client_id: process.env.paypalClientId as string,
  client_secret: process.env.paypalClientSecret as string,
});

class PaymentService {
  /**
   * Standard response object
   */
  private response: ResponseObject | undefined;

  /*
    Make  Payments
   */

  async makePayment(product: IProduct) {
    try {
      // For single Charge
      const createPaymentJson = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://return.url",
          cancel_url: "http://cancel.url",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: product.name ? product.name : "item",
                  sku: "item",
                  price: product.price.toString(),
                  currency: "USD",
                  quantity: product.quantity ? product.quantity : 1,
                },
              ],
            },
            amount: {
              currency: "USD",
              total: "1.00",
            },
            description: product.description,
          },
        ],
      };

      paypal.payment.create(createPaymentJson, function (error, payment) {
        if (error) {
          throw error;
        } else {
          console.log("Create Payment Response");
          console.log(payment);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  /*
    Subscription  Payments
   */

  async createSubscriptions(payload: any) {
    try {
      const billingPlanAttribute = {
        name: "botle",
        price: 300,
        description: "This is my new Product",
        quantity: 1,
      };

      paypal.billingAgreement.create(
        billingPlanAttribute,
        function (
          error: paypal.SDKError,
          billingAgreement: paypal.PaymentResponse
        ) {
          if (error) {
            console.error(error);
          } else {
            console.log("billingAgreement", billingAgreement);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  /*
      Update  Subscription  
   */

  async updateSubscriptions(payload: any) {
    try {
      const billingPlanId = "21321323";
      const billingPlanAttribute = {};

      paypal.billingAgreement.update(
        billingPlanId,
        billingPlanAttribute,
        function (
          error: paypal.SDKError,
          billingAgreement: paypal.PaymentResponse
        ) {
          if (error) {
            console.error(error);
          } else {
            console.log("billingAgreement", billingAgreement);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  /*
     Cancel  Subscription  
   */

  async cancelSubscription(payload: any) {
    try {
      const billingAgreementId: string = "12345";

      const cancelNote = {
        note: "cancel the agreement",
      };

      paypal.billingAgreement.cancel(
        billingAgreementId,
        cancelNote,
        function (
          error: paypal.SDKError,
          billingAgreement: paypal.PaymentResponse
        ) {
          if (error) {
            console.error(error);
          } else {
            paypal.billingAgreement.get(
              billingAgreementId,
              function (
                error: paypal.SDKError,
                billingAgreement: paypal.PaymentResponse
              ) {
                if (error) {
                  console.error(error);
                  throw error;
                } else {
                  console.log("get subscription response", billingAgreement);
                }
              }
            );
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  /*
     Subscription Payment Execute
   */

  async executePaymentSubscriptions(payload: any) {
    try {
      const { token } = payload;
      paypal.billingAgreement.execute(payload, {});
    } catch (error) {
      console.error(error);
    }
  }

  /*
     Paypal Webhook
   */

  async paypalWebHook(payload: any) {
    try {
      const { token } = payload;
      const webhook = paypal.notification.webhook;
      console.log("webhook", webhook);
    } catch (error) {
      console.error(error);
    }
  }

  /*
    Refund Payments
   */

  async refundPayment(payload: any) {
    try {
      const paymentId = "12324";
      const data = {
        amount: {
          total: "300",
          currency: "USD",
        },
      };

      paypal.sale.refund(paymentId, data, function (error, refund) {
        if (error) {
          console.error(error);
        } else {
          console.log(refund);
          return { isError: false, error };
        }
      });

      // paypal.refund.get(id,);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new PaymentService();
