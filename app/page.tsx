import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-6">
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
          <p className="text-sm text-royal-400 tracking-wide">
            [ dwen-dah ]
          </p>
          <p className="text-xl text-royal-500 leading-relaxed italic max-w-2xl mx-auto">
            soul in motion — an Andalusian concept that depicts a fierce, raw, spiritual energy that overtakes an artist when the art becomes larger than life.
          </p>
          <p className="text-2xl text-royal-600 font-light leading-relaxed">
            reclaim time for what makes you human
          </p>
          <div className="pt-4">
            <Link
              href="/planning"
              className="inline-block px-10 py-4 bg-orange-500 text-cloud-50 rounded-lg text-lg font-sans hover:bg-orange-600 active:bg-orange-700 transition-all duration-200"
            >
              get started
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Simple */}
      <section className="py-16 px-4 bg-royal-50">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-serif text-royal-500 text-center">
            how it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="text-4xl font-serif text-orange-500">1</div>
              <h3 className="text-lg font-medium text-royal-500">
                tell duende what matters
              </h3>
              <p className="text-sm text-royal-600">
                5 minute setup. how you like to move, who you care about, what you're growing toward.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="text-4xl font-serif text-orange-500">2</div>
              <h3 className="text-lg font-medium text-royal-500">
                connect your calendar
              </h3>
              <p className="text-sm text-royal-600">
                duende watches your schedule and learns your patterns.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="text-4xl font-serif text-orange-500">3</div>
              <h3 className="text-lg font-medium text-royal-500">
                duende advocates
              </h3>
              <p className="text-sm text-royal-600">
                when your humanity needs protecting, duende messages others on your behalf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Visual */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif text-royal-500">
              visualize and adjust your week
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto">
              every sunday, duende analyzes your calendar and proposes protections. you review, drag to adjust timing, then sync to google calendar.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-royal-50 to-orange-50 border-0 p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <p className="text-lg font-serif text-royal-500">week of january 26</p>
                <div className="flex gap-4 text-xs text-royal-600">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-royal-400"></div>
                    <span>existing meetings</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>duende protections</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                  <div key={day} className="space-y-2">
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-wide text-royal-400">{day}</div>
                      <div className="text-lg font-light text-royal-500">{26 + i}</div>
                    </div>
                    <div className="space-y-1.5">
                      {i === 0 && (
                        <>
                          <div className="bg-royal-400 text-white text-xs p-2 rounded opacity-60">Team Sync<br/>10:00-11:00</div>
                          <div className="bg-orange-500 text-white text-xs p-2 rounded border-2 border-dashed border-white/60">Protected Lunch<br/>12:30-13:30</div>
                        </>
                      )}
                      {i === 1 && (
                        <>
                          <div className="bg-orange-500 text-white text-xs p-2 rounded border-2 border-dashed border-white/60">30min Walk<br/>12:00-12:30</div>
                          <div className="bg-royal-400 text-white text-xs p-2 rounded opacity-60">Investment Review<br/>14:00-15:30</div>
                        </>
                      )}
                      {i === 2 && (
                        <div className="bg-orange-500 text-white text-xs p-2 rounded border-2 border-dashed border-white/60">Coffee with Sarah<br/>15:00-16:00</div>
                      )}
                      {i === 4 && (
                        <div className="bg-orange-500 text-white text-xs p-2 rounded border-2 border-dashed border-white/60">Deep Work<br/>14:00-16:00</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-royal-600 italic pt-4">
                drag blocks to adjust timing • click to edit • sync to your calendar
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* The AI Takes the Blame - 3 Examples */}
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
            {/* Example 1 - Both parties protected */}
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">when someone tries to book you</p>
                    <p className="text-royal-500 font-medium mb-3 leading-relaxed">
                      duende thinks: "elif's been in 5 hours of meetings today. could this be async so she can take a walk and you get a more thoughtful response?"
                    </p>
                    <p className="text-sm text-royal-600">
                      you get movement. they get better work. the ai takes the blame. both protected.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 2 - Meeting reschedule protects both */}
            <Card className="bg-royal-50 border-royal-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚶</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">when you've been sitting too long</p>
                    <p className="text-royal-500 font-medium mb-3 leading-relaxed">
                      duende thinks: "elif's been in back to back calls. she needs 15 minutes to move before this meeting. 3:15pm work for you?"
                    </p>
                    <p className="text-sm text-royal-600">
                      your body gets what it needs. they get a more present version of you. everyone wins.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Example 3 - Protecting lunch */}
            <Card className="bg-orange-50 border-orange-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🍽️</span>
                  <div className="flex-1">
                    <p className="text-sm text-royal-600 mb-2">when lunch is at risk</p>
                    <p className="text-royal-500 font-medium mb-3 leading-relaxed">
                      duende thinks: "elif's lunch is getting crowded with meetings. could we move this to 2pm so she can eat away from her desk?"
                    </p>
                    <p className="text-sm text-royal-600">
                      your nervous system gets to shift out of stress mode. they get a colleague who's actually nourished.
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

      {/* Philosophy */}
      <section className="py-16 px-4 bg-royal-50">
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
            href="/planning"
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
