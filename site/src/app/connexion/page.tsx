"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [etat, setEtat] = useState<"repos" | "envoi" | "envoye" | "erreur">(
    "repos",
  );

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEtat("envoi");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setEtat(error ? "erreur" : "envoye");
    if (error) alert(error.message + " / " + process.env.NEXT_PUBLIC_SUPABASE_URL + " / " + (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "").length);
  }

  return (
    <main className="mx-auto max-w-md px-5 py-16">
      <a href="/" className="font-titre text-xl font-bold text-vert">
        Retour
      </a>
      <h1 className="mt-8 font-titre text-3xl font-bold text-vert">
        Accéder à votre espace
      </h1>

      {etat === "envoye" ? (
        <p className="mt-6 text-lg leading-relaxed">
          C’est envoyé. Ouvrez l’email que nous venons de vous écrire et
          cliquez sur le lien : vous serez connecté. Pensez à regarder dans
          vos courriers indésirables.
        </p>
      ) : (
        <form onSubmit={envoyer} className="mt-6 space-y-4">
          <label htmlFor="email" className="block text-lg font-bold">
            Votre adresse email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border-2 border-vert bg-white px-4 py-4 text-lg"
            placeholder="vous@exemple.fr"
          />
          <button
            type="submit"
            disabled={etat === "envoi"}
            className="w-full rounded-full bg-orange px-6 py-4 text-lg font-bold text-white disabled:opacity-60"
          >
            {etat === "envoi" ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
          </button>
          {etat === "erreur" && (
            <p className="text-red-700">
              L’envoi n’a pas fonctionné. Vérifiez votre adresse et réessayez
              dans une minute.
            </p>
          )}
          <p className="text-sm opacity-70">
            Pas de mot de passe : vous recevez un lien par email.
          </p>
        </form>
      )}
    </main>
  );
}
