const benefices = [
  {
    titre: "Rien à saisir en plus",
    texte:
      "Le numéro ou l’email est pris au moment du paiement. Vous ne tenez aucun fichier.",
  },
  {
    titre: "Le rappel au bon moment",
    texte:
      "Un message part tout seul quand votre client est prêt à revenir, selon la durée naturelle de votre prestation.",
  },
  {
    titre: "Vous voyez ce que ça rapporte",
    texte:
      "Un compteur vous montre combien de clients sont revenus et combien ils ont dépensé.",
  },
];

function Bouton() {
  return (
    <a
      href="#"
      className="block w-full rounded-full bg-orange px-6 py-4 text-center text-lg font-bold text-white sm:inline-block sm:w-auto sm:px-10"
    >
      Commencer, c’est gratuit
    </a>
  );
}

export default function Accueil() {
  return (
    <main>
      <section className="mx-auto max-w-2xl px-5 pb-12 pt-10 sm:pt-20">
        <p className="mb-6 flex items-center gap-2 font-titre text-xl font-bold text-vert">
          <span className="inline-block h-5 w-5 rounded-full border-4 border-orange" />
          Retour
        </p>
        <h1 className="font-titre text-4xl font-bold leading-tight text-vert sm:text-6xl">
          Vos clients ne partent pas. Ils oublient.
        </h1>
        <p className="mt-5 text-lg leading-relaxed sm:text-xl">
          Retour envoie un rappel au bon moment, avec une offre à usage unique.
          Vos clients reviennent, sans que vous leur écriviez.
        </p>
        <div className="mt-8">
          <Bouton />
        </div>
      </section>

      <section className="bg-vert px-5 py-12 text-creme">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-orange">
            Faites le calcul
          </p>
          <p className="mt-3 font-titre text-2xl font-bold leading-snug sm:text-3xl">
            40 clients qui oublient de revenir, à 35 € la séance, ce sont
            1 400 € qui s’évaporent chaque mois.
          </p>
          <p className="mt-4 opacity-80">
            Exemple chiffré : remplacez ces nombres par les vôtres.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-12">
        <h2 className="font-titre text-3xl font-bold text-vert">
          Trois choses, et rien d’autre
        </h2>
        <ul className="mt-8 space-y-8">
          {benefices.map((b) => (
            <li key={b.titre} className="border-l-4 border-orange pl-4">
              <h3 className="text-xl font-bold">{b.titre}</h3>
              <p className="mt-1 text-lg leading-relaxed">{b.texte}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Bouton />
        </div>
      </section>
    </main>
  );
}
