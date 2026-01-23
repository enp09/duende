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
          <p className="text-xl text-royal-500 leading-relaxed italic">
            the feeling of being fully alive
          </p>
          <p className="text-lg text-royal-600 max-w-xl mx-auto leading-relaxed">
            most of us have calendars that are 100% full but lives that feel empty.
            we're optimized, but not happy. and the worst part? we can't say no. it feels rude, political, career limiting.
          </p>
          <p className="text-lg text-royal-600 max-w-xl mx-auto leading-relaxed">
            duende is an ai layer that sits between you and your calendar.
            it learns what you need to feel human — and advocates for those things on your behalf.
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

      {/* How It Works */}
      <section className="py-16 px-4 bg-royal-50">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif text-royal-500">
              the ai takes the blame
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto">
              duende advocates on your behalf. nobody's the bad guy. both people are protected.
            </p>
          </div>

          <div className="space-y-6">
            {/* Example 1 - AI messages someone on your behalf */}
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">when someone tries to book you</p>
                    <p className="text-royal-500 font-medium mb-3 leading-relaxed">
                      duende messages them: "elif's had 5 hours of meetings today. could this be async so she can take a walk and respond thoughtfully?"
                    </p>
                    <p className="text-sm text-royal-600">
                      the ai takes the blame. you stay kind. your colleague gets a better response. everyone wins.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 2 - Protecting lunch */}
            <Card className="bg-royal-50 border-royal-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🍽️</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">when lunch is at risk</p>
                    <p className="text-royal-500 font-medium mb-3 leading-relaxed">
                      "elif needs to protect lunch today for focus. could we move this to 2pm?"
                    </p>
                    <p className="text-sm text-royal-600">
                      you get to eat away from your desk. your nervous system gets to shift out of stress mode.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 3 - Movement threshold */}
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚶</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">when you've been sitting too long</p>
                    <p className="text-royal-500 font-medium mb-3 leading-relaxed">
                      "elif's been in back to back meetings. she needs 15 minutes to move before this call. 3:15pm work?"
                    </p>
                    <p className="text-sm text-royal-600">
                      your body gets what it needs. the meeting gets a more present version of you.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 4 - Sunday planning */}
            <Card className="bg-royal-50 border-royal-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📅</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">sunday morning</p>
                    <p className="text-royal-500 font-medium mb-3 leading-relaxed">
                      duende analyzes your week and proposes intentions: protect lunch tuesday. 30min walk wednesday. 2 hours friday for your side project.
                    </p>
                    <p className="text-sm text-royal-600">
                      you review, adjust, confirm. duende handles the rest.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 5 - Connection nudge */}
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❤️</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">when connection matters</p>
                    <p className="text-royal-500 font-medium mb-3 leading-relaxed">
                      "you mentioned wanting to connect with sarah. you both have friday 3pm free. want me to suggest coffee?"
                    </p>
                    <p className="text-sm text-royal-600">
                      relationships that matter get tended. your nervous system stays regulated.
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
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif text-royal-500">
              the five default settings
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto">
              duende learns what you need to feel human and advocates for these foundations
            </p>
          </div>

          <div className="space-y-6">
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  movement
                </h3>
                <p className="text-royal-600">
                  your body is designed to move. sitting for hours keeps you in stress mode. duende watches your patterns and finds moments for walks, stretches, resets. not because you should be healthier. because your brain works better when your body moves.
                </p>
              </div>
            </Card>

            <Card className="bg-royal-50 border-royal-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  nutrition
                </h3>
                <p className="text-royal-600">
                  eating at your desk keeps your nervous system in fight or flight. digestion and cognition compete for resources. a protected lunch lets your body shift gears. duende defends that space before meetings crowd it out.
                </p>
              </div>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  relationships
                </h3>
                <p className="text-royal-600">
                  connection with people who matter regulates your nervous system. isolation compounds stress. duende remembers who you care about and finds natural moments to reconnect. not networking. actual presence with actual humans.
                </p>
              </div>
            </Card>

            <Card className="bg-royal-50 border-royal-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  stress
                </h3>
                <p className="text-royal-600">
                  back to back meetings keep you in fight or flight all day. buffers signal safety to your body. even 10 minutes between calls lets your nervous system reset. duende watches your threshold and intervenes before you hit overwhelm.
                </p>
              </div>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-royal-500">
                  transcendence
                </h3>
                <p className="text-royal-600">
                  growth happens at edges, not in the middle of your calendar. passion projects, learning, becoming. these need protected time. duende finds those hours when your energy is right and guards them fiercely.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Simple */}
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
                  tell duende what matters
                </h3>
                <p>
                  5 minute setup. how you like to move. who you care about. what you're growing toward. your thresholds.
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
                  duende watches your schedule. learns your patterns. stays silent until thresholds trigger.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl font-serif text-orange-500">3</span>
              <div>
                <h3 className="text-xl font-medium text-royal-500 mb-2">
                  duende advocates
                </h3>
                <p>
                  when your humanity needs protecting, duende intervenes. messages others. blocks time. takes the blame. you stay kind. everyone's protected.
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
              this is not a productivity tool. this is a humanity tool.
            </p>
            <p className="text-royal-600">
              productivity tools have forgotten that humans have bodies. nervous systems that need regulation. relationships that require tending. growth that happens at edges, not in back to back meetings.
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
            ready to feel fully alive again?
          </h2>
          <p className="text-lg text-royal-600">
            setup takes 5 minutes. duende starts advocating immediately.
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
