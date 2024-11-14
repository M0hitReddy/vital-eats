import express from "express";
import {
  getPromoCodes,
  createPromoCode,
  deletePromoCode,
  togglePromoCode,
  validatePromoCode
} from "../controllers/promoCodeController.js";

const PromoCodeRouter = express.Router();

PromoCodeRouter.get("/promocodes", getPromoCodes);
PromoCodeRouter.post("/promocodes", createPromoCode);
PromoCodeRouter.delete("/promocodes/:id", deletePromoCode);
PromoCodeRouter.patch("/promocodes/:id/toggle", togglePromoCode);
PromoCodeRouter.get("/promocodes/:code/validate", validatePromoCode);

export default PromoCodeRouter;
