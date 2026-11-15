import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";


function statutDepuis(statutStripe: string) {
  if (statutStripe === "active" || statutStripe === "trialing") return "actif";
  if (statutStripe === "past_due" || statutStripe === "unpaid") return "impaye";
  if (statutStripe === "canceled") return "annule";
  return "inactif";
}

function finPeriode(sub: Stripe.Subscription): string | null {
  const large = sub as unknown as {
    current_period_end?: number;
    items?: { data?: { current_period_end?: number }[] };
  };
  const ts = large.items?.data?.[0]?.current_period_end ?? large.current_period_end;
  return ts ? new Date(ts * 1000).toISOString() : null;
}

function idClient(sub: Stripe.Subscription): string {
  return typeof sub.customer === "string" ? sub.customer : sub.customer.id;
}

export async function POST(request: Request) {
  const cle = process.env.STRIPE_SECRET_KEY;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!cle || !secret) {
    return NextResponse.json({ error: "config" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "signature" }, { status: 400 });
  }

  const stripe = new Stripe(cle);
  const corps = await request.text();

  let evenement: Stripe.Event;
  try {
    evenement = stripe.webhooks.constructEvent(corps, signature, secret);
  } catch {
    return NextResponse.json({ error: "signature" }, { status: 400 });
  }

  try {
    const db = createAdminClient();

    if (evenement.type === "checkout.session.completed") {
      const session = evenement.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const subId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id;
      if (userId && subId) {
        const sub = await stripe.subscriptions.retrieve(subId);
        const { error } = await db.from("abonnements").upsert(
          {
            user_id: userId,
            stripe_customer_id: idClient(sub),
            stripe_subscription_id: sub.id,
            statut: statutDepuis(sub.status),
            fin_periode: finPeriode(sub),
          },
          { onConflict: "stripe_subscription_id" },
        );
        if (error) throw error;
      }
    }

    if (
      evenement.type === "customer.subscription.updated" ||
      evenement.type === "customer.subscription.deleted"
    ) {
      const sub = evenement.data.object as Stripe.Subscription;
      const { error } = await db
        .from("abonnements")
        .update({ statut: statutDepuis(sub.status), fin_periode: finPeriode(sub) })
        .eq("stripe_subscription_id", sub.id);
      if (error) throw error;
    }
  } catch {
    return NextResponse.json({ error: "traitement" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
