"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function AcquirePlanButton() {
  const { user } = useUser();

  async function handleAcquirePlanClick() {
    const { sessionId } = await createStripeCheckout();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) throw new Error("Strip not found");

    await stripe.redirectToCheckout({
      sessionId,
    });
  }

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";
  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_COSTUMER_PORTAL_URL}?prefilled_email=${user?.emailAddresses[0]?.emailAddress}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir Plano
    </Button>
  );
}
