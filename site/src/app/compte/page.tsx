"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Abonnement = { statut: string; fin_periode: string | null } | null;

export default function Compte() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [abo, setAbo] = useState<Abonnement | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      setEmail(data.user?.email ?? null);
      if (data.user) {
        const { data: ligne } = await supabase
          .from("abonnements")
          .select("statut, fin_periode")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        setAbo(ligne ?? null);
      }
    });
  }, []);

  async function deconnecter() {
    await createClient().auth.signOut();
    window.location.href = "/";
  }

  const actif = abo?.statut === "actif";

  return (
    <main className="mx-auto max-w-md px-5 py-16">
      <a href="/" className="font-titre text-xl font-bold text-vert">
        Retour
      </a>
      {email === undefined && <p className="mt-8">Chargement…</p>}
      {email === null && (
        <div className="mt-8">
          <h1 className="font-titre text-3xl font-bold text-vert">
            Vous n’êtes pas connecté
          </h1>
          <a
            href="/connexion"
            className="mt-6 block rounded-full bg-orange px-6 py-4 text-center text-lg font-bold text-white"
          >
            Me connecter
          </a>
        </div>
      )}
      {email && (
        <div className="mt-8">
          <h1 className="font-titre text-3xl font-bold text-vert">Bienvenue</h1>
          <p className="mt-4 text-lg">
            Vous êtes connecté avec <strong>{email}</strong>.
          </p>

          {abo === undefined && <p className="mt-6">Vérification de votre abonnement…</p>}
          {abo !== undefined && actif && (
            <p className="mt-6 rounded-xl bg-vert px-4 py-3 text-lg font-bold text-creme">
              Votre abonnement est actif.
            </p>
          )}
          {abo !== undefined && !actif && (
            <div className="mt-6">
              <p className="text-lg">
                {abo?.statut === "impaye"
                  ? "Votre dernier paiement a échoué."
                  : "Vous n’avez pas encore d’abonnement actif."}
              </p>
              <a
                href="/tarifs"
                className="mt-4 block rounded-full bg-orange px-6 py-4 text-center text-lg font-bold text-white"
              >
                Voir l’offre
              </a>
            </div>
          )}

          <button
            onClick={deconnecter}
            className="mt-8 w-full rounded-full border-2 border-vert px-6 py-4 text-lg font-bold text-vert"
          >
            Me déconnecter
          </button>
        </div>
      )}
    </main>
  );
}
