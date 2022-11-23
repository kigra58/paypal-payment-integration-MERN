import { Request, Response } from "express";
import PaymentService from "../services/PaymentService";

export const createCustomer = async (req: Request, res: Response) => {
  const resp = await PaymentService.makePayment(req.body);

  res.status(200).send(resp);
};

export const createSubscriptions = async (req: Request, res: Response) => {
  const resp = await PaymentService.createSubscriptions(req.body);
  res.status(200).send(resp);
};
export const updateSubscriptions = async (req: Request, res: Response) => {
  const resp = await PaymentService.updateSubscriptions(req.body);
  res.status(200).send(resp);
};

export const cancelSubscription = async (req: Request, res: Response) => {
  const resp = await PaymentService.cancelSubscription(req.body);
  res.status(200).send(resp);
};
export const paypalWebHook = async (req: Request, res: Response) => {
  const resp = await PaymentService.paypalWebHook(req.body);
  res.status(200).send(resp);
};

export const executePaymentSubscriptions = async (
  req: Request,
  res: Response
) => {
  const resp = await PaymentService.executePaymentSubscriptions(req.body);
  res.status(200).send(resp);
};
