import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-serif text-royal-800 mb-4">
          duende
        </h1>
        <p className="text-xl text-royal-600 leading-relaxed">
          the caring membrane between humans and their time
        </p>
        <div className="mt-12 p-6 bg-cloud-100 rounded-lg border border-royal-200">
          <p className="text-royal-700 italic">
            duende optimizes for your humanity. movement, nourishment, connection, calm, growth.
          </p>
        </div>
        <div className="pt-8">
          <Link
            href="/onboarding"
            className="inline-block px-8 py-4 bg-orange-500 text-cloud-50 rounded-lg text-lg font-sans hover:bg-orange-600 active:bg-orange-700 transition-all duration-200"
          >
            get started
          </Link>
        </div>
      </div>
    </main>
  );
}
