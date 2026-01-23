# duende - project status

**current version:** v0.2 - planning mvp
**last updated:** january 23, 2026

---

## ✅ completed features

### landing page
- [x] hero with pronunciation and meaning
- [x] how it works (3 steps)
- [x] calendar visualization preview
- [x] ai advocacy examples (3 scenarios)
- [x] five default settings with explanations
- [x] philosophy section
- [x] final CTA to planning page

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
- [x] link back to planning

### technical infrastructure
- [x] next.js 15 app router setup
- [x] prisma + postgresql database
- [x] google calendar api oauth
- [x] reusable ui components (Card, Button, Input)
- [x] custom color palette (royal blue, orange, cloud)
- [x] responsive design
- [x] week calendar drag-drop component

---

## 🚧 in progress

### calendar integration
- [ ] read user's actual calendar events from google
- [ ] display real meetings in planning view
- [ ] write protection blocks to google calendar
- [ ] sync on drag-drop changes

### data persistence
- [ ] save planning answers to database (not just localStorage)
- [ ] save protection blocks to database
- [ ] load saved protections on return visit

---

## 📋 planned for v1.0

### threshold detection
- [ ] analyze calendar for patterns
- [ ] detect: too many meetings, no lunch, sitting too long
- [ ] identify: no movement, missing connections
- [ ] calculate: when interventions needed

### ai message generation
- [ ] integrate anthropic claude api
- [ ] generate advocacy messages
- [ ] personalize to user's communication style
- [ ] context-aware framing

### email delivery
- [ ] resend/sendgrid integration
- [ ] send threshold alerts to user
- [ ] send advocacy messages to others
- [ ] yes/no button webhooks
- [ ] handle email responses

### weather integration
- [ ] openweathermap api
- [ ] weather-aware outdoor suggestions
- [ ] forecast for weekly planning
- [ ] real-time conditions

### relationship tracking
- [ ] save relationships from planning
- [ ] track last connection dates
- [ ] suggest reconnection moments
- [ ] energy impact tracking

---

## 🎯 future features (v2+)

### enhanced planning
- [ ] ai-suggested protections based on patterns
- [ ] multi-week planning view
- [ ] recurring protection templates
- [ ] smart scheduling (best times for activities)

### conversational learning
- [ ] chat interface with duende
- [ ] natural language preference updates
- [ ] context from conversation history
- [ ] voice/tone matching

### team features
- [ ] two-person coordination (both use duende)
- [ ] team scheduling with mutual protection
- [ ] company-wide default settings
- [ ] slack/teams integration

### emergency features
- [ ] "i need a break" button
- [ ] clear afternoon and notify people
- [ ] override mode for urgent situations
- [ ] recovery mode after intense weeks

---

## 🐛 known issues

### high priority
- user sessions need proper auth (currently using localStorage user id)
- calendar oauth tokens need refresh logic
- drag-drop occasionally glitchy on mobile
- no error handling for failed api calls

### medium priority
- planning answers not persisted to database
- no loading states on async operations
- email examples are static (should be dynamic)
- no mobile optimization for calendar

### low priority
- no back button in onboarding
- settings page is minimal
- no user profile editing
- no way to disconnect calendar

---

## 📊 metrics to track (when v1 launches)

### conversion funnel
- landing page → planning page
- planning completion rate
- generate button click rate
- connect calendar rate
- onboarding completion

### engagement
- weekly active users
- planning sessions per week
- protections generated
- protections adjusted
- calendar connections maintained

### advocacy effectiveness
- emails sent (user to others)
- response rate to advocacy emails
- protections successfully added
- user satisfaction with suggestions

---

## 🔧 technical debt

### refactoring needed
- extract planning logic into hooks
- create proper form validation
- add error boundaries
- improve type safety
- add unit tests

### infrastructure improvements
- implement proper sessions (nextauth or similar)
- add database indexes
- set up error monitoring (sentry)
- configure logging
- add api rate limiting

### documentation
- add inline code comments
- create component documentation
- write api endpoint specs
- document database queries

---

## 🚀 deployment checklist

### before v1 launch
- [ ] set up production database (neon/supabase)
- [ ] configure vercel deployment
- [ ] set up environment variables
- [ ] run database migrations
- [ ] test google oauth in production
- [ ] verify email delivery works
- [ ] load test api endpoints
- [ ] security audit
- [ ] privacy policy page
- [ ] terms of service page

### post-launch monitoring
- [ ] set up uptime monitoring
- [ ] configure error tracking
- [ ] monitor api usage and costs
- [ ] track user feedback
- [ ] measure conversion rates

---

## 💭 design decisions log

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

---

*track progress at: github.com/yourusername/duende*
