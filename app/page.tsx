import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.svg"
              alt="duende logo"
              width={120}
              height={120}
              priority
            />
          </div>
          <h1 className="text-6xl font-serif text-royal-500">
            duende
          </h1>
          <p className="text-2xl text-royal-500 leading-relaxed">
            the caring membrane between humans and their time
          </p>
          <p className="text-lg text-royal-600 max-w-xl mx-auto">
            duende watches your calendar and intervenes when your humanity needs protecting.
            gentle, threshold based, respectful.
          </p>
          <div className="pt-4">
            <Link
              href="/onboarding"
              className="inline-block px-10 py-4 bg-orange-500 text-cloud-50 rounded-lg text-lg font-sans hover:bg-orange-600 active:bg-orange-700 transition-all duration-200"
            >
              get started
            </Link>
          </div>
        </div>
      </section>

      {/* What You Can Expect - 360 Examples */}
      <section className="py-16 px-4 bg-royal-50">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl font-serif text-royal-500 text-center">
            what you can expect
          </h2>

          <div className="space-y-6">
            {/* Example 1 */}
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📧</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">thursday 2:15pm</p>
                    <p className="text-royal-500 font-medium mb-2">
                      "you have 6 back to back meetings tomorrow. your max is 4. want buffers?"
                    </p>
                    <p className="text-sm text-royal-600">
                      duende noticed your calendar violated your threshold. one click adds 10 minute breaks between meetings.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 2 */}
            <Card className="bg-royal-50 border-royal-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📅</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">sunday 8am</p>
                    <p className="text-royal-500 font-medium mb-2">
                      "planning your week"
                    </p>
                    <p className="text-sm text-royal-600">
                      5 intention proposals based on your calendar patterns. protect lunch tuesday. 30min walk wednesday. 2 hours friday afternoon for your side project.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 3 */}
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚶</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">tuesday 3pm</p>
                    <p className="text-royal-500 font-medium mb-2">
                      "you've been sitting for 4 hours. want a 15min walk block?"
                    </p>
                    <p className="text-sm text-royal-600">
                      your next meeting is at 4:30pm. duende found a gap and suggests movement. click yes to add to calendar.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 4 */}
            <Card className="bg-royal-50 border-royal-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🍽️</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">monday 11am</p>
                    <p className="text-royal-500 font-medium mb-2">
                      "wednesday lunch is getting crowded with meetings. protect it now?"
                    </p>
                    <p className="text-sm text-royal-600">
                      duende blocks 12:30-1:30pm on your calendar before someone books over it.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 5 */}
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">wednesday 10am</p>
                    <p className="text-royal-500 font-medium mb-2">
                      "you mentioned wanting to connect with sarah. you both have friday 3pm free"
                    </p>
                    <p className="text-sm text-royal-600">
                      duende remembers your relationships and finds natural moments to reconnect.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Five Default Settings */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif text-royal-500 mb-3">
              the five default settings
            </h2>
            <p className="text-royal-600 max-w-2xl mx-auto">
              duende protects these foundations in your calendar
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <Card className="text-center">
              <h3 className="text-lg font-medium text-royal-500 mb-2">movement</h3>
              <p className="text-sm text-royal-600">watches sitting patterns</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-lg font-medium text-royal-500 mb-2">nutrition</h3>
              <p className="text-sm text-royal-600">protects meals</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-lg font-medium text-royal-500 mb-2">relationships</h3>
              <p className="text-sm text-royal-600">finds connection moments</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-lg font-medium text-royal-500 mb-2">stress</h3>
              <p className="text-sm text-royal-600">adds buffers</p>
            </Card>
            <Card className="text-center">
              <h3 className="text-lg font-medium text-royal-500 mb-2">transcendence</h3>
              <p className="text-sm text-royal-600">guards growth time</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-royal-50">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-serif text-royal-500 text-center">
            how it works
          </h2>
          <div className="space-y-6 text-royal-600">
            <div className="flex gap-4">
              <span className="text-3xl font-serif text-orange-500">1</span>
              <div>
                <h3 className="text-xl font-medium text-royal-500 mb-2">
                  5 minute setup
                </h3>
                <p>
                  tell duende your preferences. connect your calendar. done.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl font-serif text-orange-500">2</span>
              <div>
                <h3 className="text-xl font-medium text-royal-500 mb-2">
                  duende watches
                </h3>
                <p>
                  reads your schedule. learns your patterns. stays silent until thresholds trigger.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl font-serif text-orange-500">3</span>
              <div>
                <h3 className="text-xl font-medium text-royal-500 mb-2">
                  you decide
                </h3>
                <p>
                  get an email with context and a specific suggestion. yes adds it to your calendar. no teaches duende.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center space-y-4">
            <p className="text-xl text-royal-500 italic">
              your calendar should protect your humanity, not extract it.
            </p>
            <p className="text-royal-600">
              duende optimizes for your wholeness, not your output.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-serif text-royal-500">
            ready to protect your humanity?
          </h2>
          <p className="text-lg text-royal-600">
            setup takes 5 minutes. duende starts watching immediately.
          </p>
          <Link
            href="/onboarding"
            className="inline-block px-10 py-4 bg-orange-500 text-cloud-50 rounded-lg text-lg font-sans hover:bg-orange-600 active:bg-orange-700 transition-all duration-200"
          >
            get started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-royal-600">
        <p>duende • protecting humanity, one calendar at a time</p>
      </footer>
    </main>
  );
}
