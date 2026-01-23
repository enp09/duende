import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
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
          <p className="text-2xl text-royal-500 leading-relaxed max-w-2xl mx-auto">
            the caring membrane between humans and their time
          </p>
          <p className="text-lg text-royal-600 leading-relaxed max-w-xl mx-auto">
            duende protects your humanity in a world designed to extract it. gentle guidance for movement, nourishment, connection, calm, and growth.
          </p>
          <div className="pt-8">
            <Link
              href="/onboarding"
              className="inline-block px-10 py-4 bg-orange-500 text-cloud-50 rounded-lg text-lg font-sans hover:bg-orange-600 active:bg-orange-700 transition-all duration-200"
            >
              get started
            </Link>
          </div>
        </div>
      </section>

      {/* What It Does */}
      <section className="py-16 px-4 bg-royal-50">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-serif text-royal-500 text-center">
            what duende does
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-xl font-medium text-royal-500 mb-3">
                sunday planning
              </h3>
              <p className="text-royal-600">
                set flexible intentions for the week. duende analyzes your calendar and suggests when to protect lunch, schedule movement, or carve space for what matters.
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-medium text-royal-500 mb-3">
                morning brief
              </h3>
              <p className="text-royal-600">
                gentle guidance each morning. today's shape, what to watch for, one clear intention. grounded in your calendar, tuned to your humanity.
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-medium text-royal-500 mb-3">
                smart suggestions
              </h3>
              <p className="text-royal-600">
                real time nudges throughout the week. when to take a walk, protect a meal, reach out to someone who matters. only suggestions. you always decide.
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-medium text-royal-500 mb-3">
                conversational learning
              </h3>
              <p className="text-royal-600">
                talk to duende anytime. adjust intentions, explain why something worked or felt off. it learns your rhythms, respects your boundaries.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The Five Default Settings */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-serif text-royal-500">
              the five default settings
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto">
              these are the foundations of human wellbeing. duende protects all five in your calendar.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  movement
                </h3>
                <p className="text-royal-600">
                  your body is designed to move. duende finds moments for walks, stretches, and transitions. it watches sitting patterns and suggests when to reset.
                </p>
              </div>
            </Card>

            <Card className="bg-royal-50 border-royal-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  nutrition
                </h3>
                <p className="text-royal-600">
                  protected meals matter. eating at your desk keeps your nervous system in stress mode. duende helps you defend lunch and stay grounded.
                </p>
              </div>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  relationships
                </h3>
                <p className="text-royal-600">
                  connection regulates your nervous system. duende reminds you to reach out to people who matter and protects space for presence.
                </p>
              </div>
            </Card>

            <Card className="bg-royal-50 border-royal-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  stress
                </h3>
                <p className="text-royal-600">
                  back to back meetings keep you in fight or flight. duende suggests buffers and helps you signal safety to your body throughout the day.
                </p>
              </div>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  transcendence
                </h3>
                <p className="text-royal-600">
                  growth happens at edges. duende protects space for passion projects, learning, and becoming. this is where you expand.
                </p>
              </div>
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
                  share your preferences
                </h3>
                <p>
                  tell duende what matters. how you like to move, who you care about, what you're growing toward. this takes about 5 minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl font-serif text-orange-500">2</span>
              <div>
                <h3 className="text-xl font-medium text-royal-500 mb-2">
                  connect your calendar
                </h3>
                <p>
                  duende reads your schedule to understand your week. it watches for patterns that protect or threaten your default settings.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl font-serif text-orange-500">3</span>
              <div>
                <h3 className="text-xl font-medium text-royal-500 mb-2">
                  receive gentle guidance
                </h3>
                <p>
                  sunday planning, morning briefs, real time nudges. duende suggests when and why. you always choose whether to follow.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl font-serif text-orange-500">4</span>
              <div>
                <h3 className="text-xl font-medium text-royal-500 mb-2">
                  stay in conversation
                </h3>
                <p>
                  talk to duende anytime. adjust priorities, explain what worked, explore why something feels off. it learns your rhythms and respects your sovereignty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center space-y-6">
            <p className="text-xl text-royal-500 italic leading-relaxed">
              your calendar should protect your humanity, not extract it.
            </p>
            <p className="text-royal-600">
              duende is built on the belief that productivity tools have forgotten humans have bodies. we have nervous systems that need regulation. relationships that require tending. growth that happens at edges, not in back to back meetings.
            </p>
            <p className="text-royal-600">
              this is gentle technology. it suggests, teaches, learns. it optimizes for your wholeness, not your output.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-serif text-royal-500">
            ready to protect your humanity?
          </h2>
          <p className="text-lg text-royal-600">
            it takes 5 minutes to set up. duende starts caring for your week immediately.
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
