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
                reclaim time for what makes your team human
              </h2>
              <p className="text-xl text-royal-600 max-w-2xl mx-auto leading-relaxed">
                an ai layer that advocates when calendars violate what makes us human. the ai takes the blame. both people are protected.
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
                href="#how-it-works"
                className="px-8 py-3 border border-royal-200 text-royal-500 rounded-lg hover:border-royal-300 transition-colors"
              >
                learn more
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
              set it up once, let duende handle the rest
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
                    duende watches their calendars
                  </h3>
                </div>
                <p className="text-lg text-royal-600 leading-relaxed pl-13">
                  connects to google calendar. reads every event. knows when someone's been sitting too long. sees when lunch is getting crowded with meetings. detects back to back calls piling up.
                </p>
                <p className="text-royal-600 pl-13">
                  real-time. all day. no one has to remember to check.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Demo Preview */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-royal-500 mb-4">
              see it in action
            </h2>
            <p className="text-lg text-royal-600 max-w-2xl mx-auto">
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
          <div className="grid md:grid-cols-3 gap-8 mb-8">
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

          </div>

          <div className="pt-8 border-t border-royal-100 text-center text-sm text-royal-600">
            <p>© 2026 duende. protecting humanity, one calendar at a time.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
