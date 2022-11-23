import express from "express";
import {
  createCustomer,
  createSubscriptions,
  executePaymentSubscriptions,
  cancelSubscription,
  updateSubscriptions,
} from "../controllers/PaymentsController";
import HandleErrors from "../middlewares/handleErrors";

export const paymentRoutes = express.Router();

paymentRoutes.post("/create-payment", HandleErrors(createCustomer));
paymentRoutes.post("/create-subscription", HandleErrors(createSubscriptions));
paymentRoutes.post("/update-subscription", HandleErrors(updateSubscriptions));
paymentRoutes.post("/cancel-subscription", HandleErrors(cancelSubscription));
paymentRoutes.post(
  "/execute-subscription",
  HandleErrors(executePaymentSubscriptions)
);
paymentRoutes.post(
  "/paypal-webhook",
  HandleErrors(executePaymentSubscriptions)
);
