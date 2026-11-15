import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const PRICE_ID = "price_1Uc9ZrC7CV7WHq7Zi2Y9MKgw";

export async function POST(request: Request) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "config" }, { status: 500 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "non_connecte" }, { status: 401 });
    }

    const stripe = new Stripe(key);
    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      customer_email: user.email,
      client_reference_id: user.id,
      subscription_data: { metadata: { user_id: user.id } },
      success_url: `${origin}/merci`,
      cancel_url: `${origin}/tarifs`,
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "stripe" }, { status: 500 });
  }
}
