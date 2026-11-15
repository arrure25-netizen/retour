export default function Merci() {
  return (
    <main className="mx-auto max-w-md px-5 py-16">
      <a href="/" className="font-titre text-xl font-bold text-vert">
        Retour
      </a>
      <h1 className="mt-8 font-titre text-3xl font-bold text-vert">
        Merci, votre paiement est reçu
      </h1>
      <p className="mt-4 text-lg leading-relaxed">
        Votre accès s’active dans quelques instants.
      </p>
      <a
        href="/compte"
        className="mt-8 block rounded-full bg-orange px-6 py-4 text-center text-lg font-bold text-white"
      >
        Aller à mon espace
      </a>
    </main>
  );
}
