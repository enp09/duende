# duende - project status

**current version:** v0.4 - enterprise landing page with andalusian soul
**last updated:** january 26, 2026

---

## ✅ completed features

### landing page (v0.4 - complete redesign)
- [x] andalusian cultural heritage positioning ("soul in motion")
- [x] enterprise-focused messaging ("for teams that care about humanity and wellbeing")
- [x] professional navigation (how it works, integrations, pricing)
- [x] story-driven "how it works" with real examples (sarah and james)
- [x] visual cards showing actual UI (threshold detection, advocacy messages)
- [x] combined "the ai takes the blame" section (immediate + long-term patterns)
- [x] educational approach section (teaches biology behind recommendations)
- [x] human pattern recognition examples (relationships, weather, energy, growth)
- [x] integrations section (google calendar, slack coming soon, notion coming soon)
- [x] social proof stats (67% reduction, 4.2hrs reclaimed, 89% more present)
- [x] pricing section ($12/user Professional, custom Enterprise)
- [x] professional footer with product/company/resources links
- [x] clear value proposition throughout

### planning page (core feature)
- [x] 6 domain questions (this week, movement, nutrition, relationships, buffers, growth)
- [x] distinct color-coded cards for each domain
- [x] exclude people input field
- [x] generate protections button
- [x] interactive week/month calendar view
- [x] drag-drop to adjust protection timing
- [x] email examples (outbound to others, inbound to user)
- [x] real-time protection preview
- [x] save answers to localStorage
- [x] connect calendar CTA

### onboarding flow
- [x] simplified 2-field form (email + city)
- [x] google calendar oauth integration
- [x] user creation in database
- [x] planning data pass-through
- [x] protection count display
- [x] redirect to settings after connection

### settings page
- [x] calendar connection status
- [x] manual sync calendar button
- [x] user profile display
- [x] link to planning and suggestions pages

### calendar integration (fully working)
- [x] google calendar oauth with proper scopes
- [x] read user's calendar events (30 days ahead)
- [x] write protection blocks to google calendar
- [x] sync with visual confirmation
- [x] token refresh logic
- [x] delete old duende-created events before re-sync
- [x] color-coded protection blocks by type

### ai advocacy system (v0.3 - complete)
- [x] threshold detection (too many meetings, no lunch, no movement, missing buffers)
- [x] claude ai integration for message generation
- [x] suggestions page with approve/send workflow
- [x] email delivery system (resend)
- [x] warm, conversational tone
- [x] beneficial framing for both parties
- [x] user approval required before sending

### technical infrastructure
- [x] next.js 15 app router setup
- [x] react 19
- [x] prisma + postgresql database
- [x] google calendar api oauth
- [x] anthropic claude api for messages
- [x] resend api for email delivery
- [x] reusable ui components (Card, Button, Input)
- [x] custom color palette (royal blue, orange, cloud)
- [x] responsive design
- [x] week calendar drag-drop component

---

## 🚧 in progress

### slack integration
- [ ] oauth setup for slack workspace
- [ ] send advocacy messages via slack DM
- [ ] notify users of threshold violations in slack
- [ ] coordinate rescheduling through slack

### notion integration
- [ ] oauth setup for notion workspace
- [ ] sync protection schedules to team databases
- [ ] update project timelines based on capacity
- [ ] track wellbeing metrics in notion

---

## 📋 planned for v1.0

### weather integration
- [ ] openweathermap api integration
- [ ] weather-aware outdoor movement suggestions
- [ ] forecast for weekly planning
- [ ] real-time conditions check

### relationship tracking enhancement
- [ ] track last connection dates with specific people
- [ ] suggest reconnection moments
- [ ] distinguish formal vs casual meetups
- [ ] energy impact tracking per relationship

### exclude list
- [ ] people duende won't email (VIPs, bosses, etc.)
- [ ] manage exclusions in settings
- [ ] still show suggestions but don't auto-send

### production deployment
- [ ] vercel deployment
- [ ] production database (supabase/neon)
- [ ] environment variable configuration
- [ ] domain setup
- [ ] ssl certificates
- [ ] monitoring and error tracking

---

## 🎯 future features (v2+)

### enhanced pattern recognition
- [ ] energy pattern learning (morning person vs night person)
- [ ] meeting type categorization (creative vs analytical)
- [ ] productivity window detection
- [ ] burnout early warning signals
- [ ] recovery pattern recommendations

### advanced ai capabilities
- [ ] conversational interface with duende
- [ ] natural language preference updates
- [ ] context from conversation history
- [ ] voice/tone matching to user style
- [ ] multi-turn message negotiation

### team features
- [ ] two-person coordination (both use duende)
- [ ] team scheduling with mutual protection
- [ ] company-wide default settings
- [ ] manager dashboard for team wellbeing
- [ ] anonymous aggregate insights

### emergency features
- [ ] "i need a break" button
- [ ] clear afternoon and auto-notify stakeholders
- [ ] override mode for urgent situations
- [ ] recovery mode after intense weeks
- [ ] vacation mode with gradual ramp-up

---

## 🐛 known issues

### high priority
- [ ] user sessions need proper auth (currently using localStorage user id)
- [ ] calendar oauth token refresh edge cases
- [ ] error handling for failed api calls
- [ ] rate limiting on api endpoints

### medium priority
- [ ] planning answers not fully persisted to database
- [ ] loading states missing on some async operations
- [ ] email examples in planning are static (should be dynamic)
- [ ] mobile optimization for calendar view
- [ ] suggestions page needs better empty state

### low priority
- [ ] no back button in onboarding flow
- [ ] settings page minimal (needs more options)
- [ ] no user profile editing
- [ ] no way to disconnect calendar from UI
- [ ] no timezone handling edge cases

---

## 📊 metrics to track (when v1 launches)

### conversion funnel
- landing page → planning page conversion
- planning completion rate
- generate protections button click rate
- connect calendar conversion rate
- onboarding completion rate
- first protection sync success rate

### engagement
- weekly active users
- planning sessions per user per week
- protections generated per user
- protections adjusted (drag-drop usage)
- calendar sync frequency
- suggestions page visits

### advocacy effectiveness
- threshold violations detected per user per week
- advocacy messages generated
- advocacy messages sent
- response rate from recipients
- rescheduling success rate
- user satisfaction scores

### business metrics
- professional plan sign-ups
- enterprise inquiries
- churn rate
- expansion revenue (users adding team members)
- net promoter score (nps)

---

## 🔧 technical debt

### refactoring needed
- extract planning logic into reusable hooks
- create proper form validation library
- add error boundaries to all pages
- improve typescript type safety (reduce any usage)
- add unit tests for critical paths
- extract threshold detection logic into separate service

### infrastructure improvements
- implement proper sessions (nextauth or similar)
- add database indexes for performance
- set up error monitoring (sentry or similar)
- configure structured logging
- add api rate limiting per user
- implement request caching where appropriate

### security hardening
- audit all api endpoints for authorization
- implement csrf protection
- validate all user inputs
- sanitize all database queries
- implement secrets rotation
- add security headers

### documentation
- add inline code comments for complex logic
- create component documentation (storybook?)
- write comprehensive api endpoint specs
- document database schema and relationships
- create architecture decision records (adrs)

---

## 🚀 deployment checklist

### before v1 launch
- [ ] set up production database (supabase recommended)
- [ ] configure vercel deployment
- [ ] set up all environment variables in vercel
- [ ] run database migrations in production
- [ ] test google oauth with production redirect uri
- [ ] verify anthropic api works in production
- [ ] verify resend email delivery works
- [ ] load test api endpoints
- [ ] security audit (automated + manual)
- [ ] privacy policy page
- [ ] terms of service page
- [ ] cookie consent (if needed)

### post-launch monitoring
- [ ] set up uptime monitoring (betteruptime, pingdom)
- [ ] configure error tracking (sentry)
- [ ] monitor api usage and costs
- [ ] track user feedback channels
- [ ] measure conversion rates
- [ ] set up analytics (posthog, amplitude)
- [ ] create ops runbook for common issues

---

## 💭 design decisions log

### why andalusian heritage?
**decision:** centered brand around andalusian concept of duende
**reason:** cultural depth differentiates from generic productivity tools, soul gives emotional resonance
**outcome:** memorable brand identity, connects to human experience vs optimization

### why enterprise + humanity positioning?
**decision:** "for teams that care about humanity and wellbeing"
**reason:** b2b teams buy tools, individuals struggle to pay $12/month, teams have budgets and care about retention
**outcome:** clearer target market, higher willingness to pay

### why educational approach?
**decision:** teach biology behind recommendations ("why" not just "what")
**reason:** builds understanding and long-term behavior change vs compliance
**outcome:** users become experts on themselves, higher engagement

### why human pattern recognition?
**decision:** beyond thresholds to relationships, energy, weather, growth
**reason:** calendars are transactional, humans are relational
**outcome:** differentiation from basic calendar tools, deeper value

### why combined advocacy section?
**decision:** merged threshold violations and human patterns into one section
**reason:** both answer "what does duende actually do?", showed full spectrum of intelligence
**outcome:** clearer value prop, less redundancy

### why simplified onboarding?
**decision:** moved from 8-step conversation to 2-field form
**reason:** show value first (planning), reduce friction, get to calendar faster
**outcome:** better conversion expected

### why planning-first flow?
**decision:** planning page before onboarding
**reason:** let users explore without commitment, see value before signup
**outcome:** can plan without account, localStorage bridges to signup

### why threshold-based instead of daily?
**decision:** no daily morning briefs, only intervene when needed
**reason:** avoid notification fatigue, respect user attention
**outcome:** duende feels helpful not naggy

### why 6 questions not 5?
**decision:** added "this week" intentions question
**reason:** helps duende understand weekly priorities, context for protections
**outcome:** more relevant suggestions

### why drag-drop calendar?
**decision:** interactive calendar vs static preview
**reason:** users want control, timing matters, visual feedback
**outcome:** higher engagement, more personalized

### why google calendar, slack, notion only?
**decision:** focus on 3 core integrations vs many shallow ones
**reason:** do fewer things excellently, these 3 cover most enterprise workflows
**outcome:** clearer roadmap, better execution

---

## 📝 version history

### v0.4 - enterprise landing page with andalusian soul (current)
- complete landing page redesign
- andalusian cultural heritage positioning
- enterprise b2b messaging and pricing
- educational approach (teach why, not just what)
- human pattern recognition examples
- professional navigation and footer
- social proof and credibility signals

### v0.3 - ai advocacy core
- threshold detection service
- claude ai integration for message generation
- suggestions page with workflow
- resend email delivery
- warm conversational tone
- user approval required

### v0.2 - planning mvp
- 6 domain questions
- interactive calendar with drag-drop
- email examples
- protection generation
- localStorage persistence

### v0.1 - initial concept
- landing page with concept
- basic navigation
- design system setup

---

*track progress at: github.com/enp09/duende*
