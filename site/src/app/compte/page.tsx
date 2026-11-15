"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Compte() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function deconnecter() {
    await createClient().auth.signOut();
    window.location.href = "/";
  }

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
          <h1 className="font-titre text-3xl font-bold text-vert">
            Bienvenue
          </h1>
          <p className="mt-4 text-lg">
            Vous êtes connecté avec <strong>{email}</strong>.
          </p>
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
