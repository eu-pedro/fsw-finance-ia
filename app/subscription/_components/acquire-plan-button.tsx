"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

export function AcquirePlanButton() {
  async function handleAcquirePlanClick() {
    console.log("Oi");
    const { sessionId } = await createStripeCheckout();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) throw new Error("Strip not found");

    await stripe.redirectToCheckout({
      sessionId,
    });
  }

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
}
