import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-royal-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="duende" width={40} height={40} priority />
            <span className="text-2xl font-serif text-royal-500">duende</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm text-royal-600 hover:text-royal-500">
              how it works
            </Link>
            <Link href="#integrations" className="text-sm text-royal-600 hover:text-royal-500">
              integrations
            </Link>
            <Link href="#pricing" className="text-sm text-royal-600 hover:text-royal-500">
              pricing
            </Link>
            <Link
              href="/planning"
              className="px-6 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors"
            >
              start demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-7xl font-serif text-royal-500">duende</h1>
                <div className="space-y-2">
                  <p className="text-sm text-royal-400 tracking-wide">[ dwen-dah ]</p>
                  <p className="text-lg text-royal-600 leading-relaxed italic max-w-2xl mx-auto">
                    soul in motion — an Andalusian concept that depicts a fierce, raw, spiritual energy that overtakes an artist when the art becomes larger than life.
                  </p>
                </div>
              </div>
              <h2 className="text-4xl font-serif text-royal-500 leading-tight pt-4">
                understand how your calendar affects your humanity
              </h2>
              <p className="text-xl text-royal-600 max-w-2xl mx-auto leading-relaxed">
                learn the biology behind the 5 pieces of being human. see patterns in your calendar. make informed choices about your wellbeing.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/planning"
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                see demo
              </Link>
              <Link
                href="#integrations"
                className="px-8 py-3 border border-royal-200 text-royal-500 rounded-lg hover:border-royal-300 transition-colors"
              >
                view integrations
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-light text-royal-500">67%</div>
              <p className="text-sm text-royal-600">reduction in meeting overload</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-light text-royal-500">4.2hrs</div>
              <p className="text-sm text-royal-600">reclaimed per week per person</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-light text-royal-500">89%</div>
              <p className="text-sm text-royal-600">report feeling more present</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24 bg-cloud-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-royal-500 mb-4">
              how it works
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto">
              understand your patterns, learn about your biology, make better choices
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-light">1</span>
                  </div>
                  <h3 className="text-2xl font-medium text-royal-500">
                    you set your team's defaults
                  </h3>
                </div>
                <p className="text-lg text-royal-600 leading-relaxed pl-13">
                  tell duende what makes your people human. max meeting hours per day. protected lunch windows. time between calls to breathe. who needs to move, who needs quiet time to think.
                </p>
                <p className="text-royal-600 pl-13">
                  5 minute setup. then you're done.
                </p>
              </div>
              <Card className="p-6 bg-white border-royal-200">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-royal-100">
                    <span className="text-royal-600">max meeting hours</span>
                    <span className="text-royal-500 font-medium">6 hours/day</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-royal-100">
                    <span className="text-royal-600">protected lunch</span>
                    <span className="text-royal-500 font-medium">12:00-13:30</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-royal-100">
                    <span className="text-royal-600">buffer between calls</span>
                    <span className="text-royal-500 font-medium">10 minutes</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-royal-600">movement breaks</span>
                    <span className="text-royal-500 font-medium">every 3 hours</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Card className="p-6 bg-white border-orange-200 md:order-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-royal-400 mb-4">
                    <span>tuesday, jan 27 • 2:14pm</span>
                    <span className="px-2 py-1 bg-red-50 text-red-600 rounded">threshold violated</span>
                  </div>
                  <p className="text-sm text-royal-600">
                    <strong className="text-royal-500">sarah thompson</strong> has been in 6.5 hours of meetings today
                  </p>
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-3 text-xs text-royal-600">
                    <p className="mb-1"><strong>new meeting request detected:</strong></p>
                    <p>"Product Sync" • 3:00-4:00pm</p>
                    <p className="text-royal-400 mt-2">analyzing impact...</p>
                  </div>
                </div>
              </Card>
              <div className="space-y-4 md:order-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-light">2</span>
                  </div>
                  <h3 className="text-2xl font-medium text-royal-500">
                    duende analyzes your calendar patterns
                  </h3>
                </div>
                <p className="text-lg text-royal-600 leading-relaxed pl-13">
                  connects to google calendar (read-only). detects patterns: when you've been sitting too long, when lunch is crowded with meetings, when back-to-back calls pile up.
                </p>
                <p className="text-royal-600 pl-13">
                  shows you insights about your calendar's impact on your wellbeing.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-light">3</span>
                  </div>
                  <h3 className="text-2xl font-medium text-royal-500">
                    duende teaches you why it matters
                  </h3>
                </div>
                <p className="text-lg text-royal-600 leading-relaxed pl-13">
                  when a pattern is detected, duende explains the biology. shows you how sitting for hours affects your nervous system. explains why back-to-back meetings lead to decision fatigue.
                </p>
                <p className="text-royal-600 pl-13">
                  you learn about yourself. you make informed choices. you advocate for your own needs.
                </p>
              </div>
              <Card className="p-6 bg-blue-50 border-blue-200">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2 text-xs text-royal-400 mb-3">
                    <span className="flex-1">educational insight</span>
                    <span className="px-2 py-0.5 bg-blue-200 text-blue-700 rounded">movement</span>
                  </div>
                  <p className="text-royal-600 leading-relaxed">
                    <strong>pattern detected:</strong> you've been in meetings for 3.5 hours straight.
                  </p>
                  <p className="text-royal-600 leading-relaxed">
                    <strong>why this matters:</strong> sitting for 3+ hours triggers your sympathetic nervous system (fight-or-flight mode), reducing cognitive function and emotional regulation.
                  </p>
                  <p className="text-royal-600 leading-relaxed">
                    <strong>what you can do:</strong> a 15-minute walk can help. walking side by side makes hard conversations easier - less eye contact pressure, more blood flow to the brain.
                  </p>
                  <div className="pt-3 mt-3 border-t border-blue-200 text-xs text-royal-400">
                    <p>learn about your body, make your own choices</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-royal-600 mb-6">
              that's it. understand your patterns, learn about your biology, make better choices.
            </p>
            <Link
              href="/planning"
              className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              explore insights
            </Link>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-royal-500 mb-4">
              works with your stack
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto">
              duende integrates seamlessly with the tools your team already uses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-royal-200 hover:border-orange-500 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-royal-50 flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-xl font-medium text-royal-500">google calendar</h3>
                <p className="text-royal-600">
                  read calendar events, detect threshold violations, automatically add protection blocks. real-time synchronization.
                </p>
                <div className="pt-2">
                  <span className="text-sm text-orange-500">core integration</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-royal-200 hover:border-orange-500 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-royal-50 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-medium text-royal-500">slack</h3>
                <p className="text-royal-600">
                  send advocacy messages on behalf of team members, notify stakeholders of threshold violations, coordinate rescheduling.
                </p>
                <div className="pt-2">
                  <span className="text-sm text-orange-500">coming soon</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-royal-200 hover:border-orange-500 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-royal-50 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-medium text-royal-500">notion</h3>
                <p className="text-royal-600">
                  sync protection schedules with team databases, update project timelines based on capacity, track wellbeing metrics.
                </p>
                <div className="pt-2">
                  <span className="text-sm text-orange-500">coming soon</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="px-6 py-24 bg-cloud-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-royal-500 mb-4">
              see it in action
            </h2>
            <p className="text-lg text-royal-600">
              intelligent calendar orchestration with minimal configuration
            </p>
          </div>

          <Card className="bg-white border-0 p-8 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-royal-500">week of january 26</p>
                <div className="flex gap-6 text-xs text-royal-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-royal-400"></div>
                    <span>meetings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-orange-500"></div>
                    <span>protected time</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                  <div key={day} className="space-y-3">
                    <div className="text-center border-b border-royal-100 pb-2">
                      <div className="text-xs uppercase tracking-wider text-royal-400">{day}</div>
                      <div className="text-lg font-light text-royal-500">{26 + i}</div>
                    </div>
                    <div className="space-y-2">
                      {i === 0 && (
                        <>
                          <div className="bg-royal-400 text-white text-xs p-2.5 rounded">
                            team sync<br/>10:00-11:00
                          </div>
                          <div className="bg-orange-500 text-white text-xs p-2.5 rounded">
                            lunch<br/>12:30-13:30
                          </div>
                        </>
                      )}
                      {i === 1 && (
                        <>
                          <div className="bg-orange-500 text-white text-xs p-2.5 rounded">
                            movement<br/>12:00-12:30
                          </div>
                          <div className="bg-royal-400 text-white text-xs p-2.5 rounded">
                            review<br/>14:00-15:30
                          </div>
                        </>
                      )}
                      {i === 2 && (
                        <div className="bg-orange-500 text-white text-xs p-2.5 rounded">
                          connection<br/>15:00-16:00
                        </div>
                      )}
                      {i === 4 && (
                        <div className="bg-orange-500 text-white text-xs p-2.5 rounded">
                          deep work<br/>14:00-16:00
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/planning"
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  explore full demo →
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* The 5 Pieces of Being Human */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-royal-500 mb-4">
              the 5 pieces of being human
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto">
              based on "human default settings" by sinan canan. these aren't optional - they're how your nervous system is designed to function.
            </p>
          </div>

          <div className="space-y-6">
            {/* Meeting Overload - Immediate Advocacy */}
            <Card className="p-8 border-orange-200 bg-orange-50">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-medium text-royal-500 mb-1">meeting overload detection</h3>
                    <p className="text-sm text-royal-400">threshold exceeded • immediate advocacy</p>
                  </div>
                  <div className="bg-white border-l-4 border-orange-500 p-4 text-sm text-royal-600">
                    <p className="mb-2"><strong>duende detects:</strong></p>
                    <p>"sarah has been in 6.5 hours of meetings today. james just requested 'product sync' at 3pm."</p>
                    <p className="text-royal-400 mt-3 text-xs italic">duende messages james: "hi james, duende here for sarah. she's been in back to back calls all day (6.5 hours so far). could we make the product sync async today so she can take a walk? you'll get a more thoughtful response and she'll be more present."</p>
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-sm text-orange-500">
                    <span>→</span>
                    <span>both people protected, nobody's the bad guy</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* New Team Member - Human Pattern */}
            <Card className="p-8 border-royal-200">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-cloud-300 flex items-center justify-center">
                    <span className="text-2xl">👋</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-medium text-royal-500 mb-1">new team member connection</h3>
                    <p className="text-sm text-royal-400">relationship • integration</p>
                  </div>
                  <div className="bg-cloud-300 border-l-4 border-royal-400 p-4 text-sm text-royal-600">
                    <p className="mb-2"><strong>duende notices:</strong></p>
                    <p>"james joined the team 3 weeks ago. you haven't had any 1:1 time with him yet. in his first month, connection matters more than catching up on tasks."</p>
                    <p className="text-royal-400 mt-3 text-xs">would you like to set a 30-minute coffee chat this week? duende can find a time when you're both relaxed.</p>
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-sm text-orange-500">
                    <span>→</span>
                    <span>calendars show meetings, duende sees relationships</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Weather-Aware - Environmental Context */}
            <Card className="p-8 border-orange-200 bg-orange-50">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                    <span className="text-2xl">🌤️</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-medium text-royal-500 mb-1">weather-aware scheduling</h3>
                    <p className="text-sm text-royal-400">movement • environmental context</p>
                  </div>
                  <div className="bg-white border-l-4 border-orange-500 p-4 text-sm text-royal-600">
                    <p className="mb-2"><strong>duende notices:</strong></p>
                    <p>"it's going to be 72° and sunny tomorrow afternoon—the first nice day in two weeks. your tuesday usually has a 3pm walking slot, but it's currently filled with an internal meeting."</p>
                    <p className="text-royal-400 mt-3 text-xs">should duende suggest moving the meeting to thursday so you can walk outside while the weather's good?</p>
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-sm text-orange-500">
                    <span>→</span>
                    <span>movement matters more when it's beautiful outside</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Energy Patterns - Long-term Intelligence */}
            <Card className="p-8 border-royal-200">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-cloud-300 flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-medium text-royal-500 mb-1">energy pattern learning</h3>
                    <p className="text-sm text-royal-400">personal rhythm • performance optimization</p>
                  </div>
                  <div className="bg-cloud-300 border-l-4 border-royal-400 p-4 text-sm text-royal-600">
                    <p className="mb-2"><strong>duende notices:</strong></p>
                    <p>"over 6 weeks, your strategic thinking sessions are 3x more productive between 9-11am than 2-4pm. but this week, you've scheduled 'Q2 planning' for tuesday at 3pm."</p>
                    <p className="text-royal-400 mt-3 text-xs">your best thinking happens in the morning. want to move this to a time that matches your energy?</p>
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-sm text-orange-500">
                    <span>→</span>
                    <span>duende learns when you do your best work</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Growth Time - Personal Goals */}
            <Card className="p-8 border-orange-200 bg-orange-50">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-medium text-royal-500 mb-1">growth time protection</h3>
                    <p className="text-sm text-royal-400">learning • long-term development</p>
                  </div>
                  <div className="bg-white border-l-4 border-orange-500 p-4 text-sm text-royal-600">
                    <p className="mb-2"><strong>duende notices:</strong></p>
                    <p>"you mentioned wanting to learn spanish. for 8 weeks, you've had a friday 4-5pm block labeled 'language practice' but meetings keep filling it. you've only used it twice."</p>
                    <p className="text-royal-400 mt-3 text-xs">learning needs consistency. should duende protect this block more aggressively? it can auto-decline meetings during this time.</p>
                  </div>
                  <div className="pt-2 flex items-center gap-2 text-sm text-orange-500">
                    <span>→</span>
                    <span>protects who you're becoming, not just what you're doing</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-royal-600 max-w-2xl mx-auto leading-relaxed">
              these are the patterns that make you human. calendars just show meetings. duende sees relationships, energy, growth, connection. the things that actually matter.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24 bg-cloud-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-royal-500 mb-4">
              pricing
            </h2>
            <p className="text-lg text-royal-600">
              enterprise-grade advocacy for teams of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-royal-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-medium text-royal-500 mb-2">professional</h3>
                  <p className="text-royal-600">for growing teams</p>
                </div>
                <div className="border-t border-royal-100 pt-6">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-light text-royal-500">$12</span>
                    <span className="text-royal-600">/user/month</span>
                  </div>
                  <ul className="space-y-3 text-royal-600">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>google calendar integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>threshold detection & monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>ai-generated advocacy messages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>email delivery & coordination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>team analytics dashboard</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/planning"
                  className="block w-full text-center px-6 py-3 border border-royal-300 text-royal-500 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors"
                >
                  start trial
                </Link>
              </div>
            </Card>

            <Card className="p-8 border-orange-500 relative">
              <div className="absolute -top-3 right-8">
                <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full">recommended</span>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-medium text-royal-500 mb-2">enterprise</h3>
                  <p className="text-royal-600">for organizations at scale</p>
                </div>
                <div className="border-t border-royal-100 pt-6">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-light text-royal-500">custom</span>
                  </div>
                  <ul className="space-y-3 text-royal-600">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>everything in professional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>slack & microsoft teams integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>notion & project management sync</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>custom threshold policies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>SSO & advanced security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>dedicated support & onboarding</span>
                    </li>
                  </ul>
                </div>
                <button className="block w-full text-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  contact sales
                </button>
              </div>
            </Card>
          </div>

          <p className="text-center text-sm text-royal-600 mt-12">
            all plans include 14-day free trial • no credit card required
          </p>
        </div>
      </section>

      {/* Learning Your Biology */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-royal-500 mb-4">
              duende teaches you why, not just what
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto">
              instead of "you should walk more," you learn how your body actually works
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-royal-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-medium text-royal-500">movement</h3>
                  <span className="text-2xl">🚶</span>
                </div>
                <div className="space-y-3 text-royal-600 text-sm leading-relaxed">
                  <p className="font-medium text-royal-500">instead of: "take a walk"</p>
                  <div className="bg-cloud-300 p-4 rounded-lg space-y-2">
                    <p><strong>duende explains:</strong></p>
                    <p>"you've been sitting for 3.5 hours. here's what's happening: your hip flexors are shortening, reducing blood flow to your prefrontal cortex by ~15%. this is why that last meeting felt fuzzy."</p>
                    <p className="text-xs text-royal-500 pt-2">"we've evolved to walk. our ancestors walked 2+ hours daily. movement regulates brain activity and nervous system. you're designed for motion."</p>
                  </div>
                  <p className="text-xs text-royal-400 italic">over time, you learn your own patterns: you think clearest after 15 minutes of walking, your best ideas come at 11am walks, not 4pm</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-royal-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-medium text-royal-500">nutrition</h3>
                  <span className="text-2xl">🍽️</span>
                </div>
                <div className="space-y-3 text-royal-600 text-sm leading-relaxed">
                  <p className="font-medium text-royal-500">instead of: "protect lunch"</p>
                  <div className="bg-cloud-300 p-4 rounded-lg space-y-2">
                    <p><strong>duende explains:</strong></p>
                    <p>"you've had 3 meetings during your lunch window this week. eating away from your desk lets your parasympathetic nervous system activate. digestion and cognition need separate time."</p>
                    <p className="text-xs text-royal-500 pt-2">"your body needs to shift out of fight-or-flight (meetings) into rest-and-digest (eating). 20 minutes away from your desk is biology."</p>
                  </div>
                  <p className="text-xs text-royal-400 italic">after 2 weeks: duende shows you perform 23% better in afternoon meetings when you've taken a real lunch break</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-royal-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-medium text-royal-500">buffers</h3>
                  <span className="text-2xl">⏸️</span>
                </div>
                <div className="space-y-3 text-royal-600 text-sm leading-relaxed">
                  <p className="font-medium text-royal-500">instead of: "add breaks"</p>
                  <div className="bg-cloud-300 p-4 rounded-lg space-y-2">
                    <p><strong>duende explains:</strong></p>
                    <p>"you just switched contexts 4 times in 90 minutes. each switch costs ~23 minutes of cognitive recovery. that's why you feel scattered."</p>
                    <p className="text-xs text-royal-500 pt-2">"your brain needs ~10 minutes to clear working memory and prepare for new context. back-to-back meetings keep your cortisol elevated. buffers are how humans work."</p>
                  </div>
                  <p className="text-xs text-royal-400 italic">duende tracks: with 10-min buffers, your decision quality improves 34% in late-day meetings</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-royal-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-medium text-royal-500">deep work</h3>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="space-y-3 text-royal-600 text-sm leading-relaxed">
                  <p className="font-medium text-royal-500">instead of: "block time"</p>
                  <div className="bg-cloud-300 p-4 rounded-lg space-y-2">
                    <p><strong>duende explains:</strong></p>
                    <p>"you haven't had a 2+ hour uninterrupted block in 6 days. complex problem-solving requires sustained prefrontal cortex activation—this builds over 90+ minutes."</p>
                    <p className="text-xs text-royal-500 pt-2">"shallow work (email, slack) uses different neural pathways than deep work (strategy, creation). constantly switching keeps you in reactive mode. protection is about the kind of thinking that makes you human."</p>
                  </div>
                  <p className="text-xs text-royal-400 italic">your pattern: tuesdays 9-11am are your deepest focus window. duende guards it fiercely.</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-royal-600 max-w-2xl mx-auto leading-relaxed">
              you're learning how your specific body and brain work. duende shows you patterns you've never noticed. you become an expert on yourself.
            </p>
          </div>
        </div>
      </section>


      {/* Philosophy */}
      <section className="px-6 py-24 bg-cloud-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-serif text-royal-500 italic">
              a humanity tool, not a productivity tool
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto leading-relaxed">
              traditional productivity software optimizes for output. duende optimizes for sustainable performance by protecting the foundations that make humans effective: movement, recovery, connection, focus.
            </p>
            <p className="text-royal-600 max-w-2xl mx-auto">
              the result? teams that perform better because they're operating from wholeness.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 bg-royal-500">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-serif text-white">
            ready to protect your team's humanity?
          </h2>
          <p className="text-xl text-white/90">
            start with a 14-day trial. see autonomous advocacy in action.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/planning"
              className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              start free trial
            </Link>
            <button className="px-8 py-3 border border-white/30 text-white rounded-lg hover:border-white/60 transition-colors">
              schedule demo
            </button>
          </div>
          <p className="text-sm text-white/70">
            no credit card required • setup takes 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white border-t border-royal-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="duende" width={32} height={32} />
                <span className="text-xl font-serif text-royal-500">duende</span>
              </div>
              <p className="text-sm text-royal-600">
                from andalusia: a soul brought fully alive
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-royal-500 mb-3">product</h4>
              <ul className="space-y-2 text-sm text-royal-600">
                <li><Link href="#how-it-works" className="hover:text-orange-500">how it works</Link></li>
                <li><Link href="#integrations" className="hover:text-orange-500">integrations</Link></li>
                <li><Link href="#pricing" className="hover:text-orange-500">pricing</Link></li>
                <li><Link href="/planning" className="hover:text-orange-500">demo</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-royal-500 mb-3">company</h4>
              <ul className="space-y-2 text-sm text-royal-600">
                <li><a href="#" className="hover:text-orange-500">about</a></li>
                <li><a href="#" className="hover:text-orange-500">blog</a></li>
                <li><a href="#" className="hover:text-orange-500">careers</a></li>
                <li><a href="#" className="hover:text-orange-500">contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-royal-500 mb-3">resources</h4>
              <ul className="space-y-2 text-sm text-royal-600">
                <li><a href="#" className="hover:text-orange-500">documentation</a></li>
                <li><a href="#" className="hover:text-orange-500">api reference</a></li>
                <li><a href="#" className="hover:text-orange-500">support</a></li>
                <li><a href="#" className="hover:text-orange-500">privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-royal-100 text-center text-sm text-royal-600">
            <p>© 2026 duende. protecting humanity, one calendar at a time.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
