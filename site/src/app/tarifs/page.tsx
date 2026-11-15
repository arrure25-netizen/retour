"use client";

import { useState } from "react";

export default function Tarifs() {
  const [etat, setEtat] = useState<"repos" | "envoi" | "erreur">("repos");

  async function payer() {
    setEtat("envoi");
    try {
      const reponse = await fetch("/api/checkout", { method: "POST" });
      if (reponse.status === 401) {
        window.location.href = "/connexion";
        return;
      }
      const donnees = await reponse.json();
      if (donnees.url) {
        window.location.href = donnees.url;
        return;
      }
      setEtat("erreur");
    } catch {
      setEtat("erreur");
    }
  }

  return (
    <main className="mx-auto max-w-md px-5 py-10">
      <a href="/" className="font-titre text-xl font-bold text-vert">
        Retour
      </a>
      <h1 className="mt-8 font-titre text-3xl font-bold leading-tight text-vert">
        Faites revenir vos clients, sans y penser
      </h1>

      <div className="mt-6 rounded-2xl border-2 border-vert bg-white p-6">
        <p className="font-titre text-5xl font-bold text-vert">
          25 €
          <span className="text-xl font-normal"> / mois</span>
        </p>
        <p className="mt-1 opacity-80">Soit moins d’1 € par jour.</p>

        <div className="mt-5 rounded-xl bg-creme p-4">
          <p className="font-bold text-vert">Satisfait ou remboursé, 30 jours</p>
          <p className="mt-1 text-sm leading-relaxed">
            Si Retour ne vous convient pas dans les 30 jours, écrivez-nous :
            vous êtes remboursé intégralement sous 5 jours ouvrés.
          </p>
        </div>

        <button
          onClick={payer}
          disabled={etat === "envoi"}
          className="mt-5 w-full rounded-full bg-orange px-6 py-4 text-lg font-bold text-white disabled:opacity-60"
        >
          {etat === "envoi" ? "Un instant…" : "Je m’abonne"}
        </button>
        <p className="mt-3 text-center text-sm">
          Sans engagement, résiliable à tout moment.
        </p>
        {etat === "erreur" && (
          <p className="mt-3 text-center text-red-700">
            Le paiement n’a pas pu démarrer. Aucun montant n’a été débité.
            Réessayez dans un instant.
          </p>
        )}
      </div>
    </main>
  );
}
