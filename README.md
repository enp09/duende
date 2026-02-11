# duende

> **[ dwen-dah ]** - soul in motion
>
> an Andalusian concept that depicts a fierce, raw, spiritual energy that overtakes an artist when the art becomes larger than life.

**reclaim time for what makes your team human**

an ai layer that advocates when calendars violate what makes us human. the ai takes the blame. both people are protected.

---

## what is duende?

duende is an ai advocacy system for **teams that care about their humanity and wellbeing**.

it sits between your calendar and other people, protecting movement, real meals, connection, and space to think. when someone tries to book you during lunch or you've been sitting too long, duende messages them on your behalf.

**the ai takes the blame.** nobody's the bad guy. both people are protected.

this is a humanity tool, not a productivity tool. 

---

## how it works

### 1. you set your team's defaults
tell duende what makes your people human. max meeting hours per day. protected lunch windows. time between calls to breathe.

5 minute setup. then you're done.

### 2. duende watches their calendars
connects to google calendar. reads every event. knows when someone's been sitting too long. sees when lunch is getting crowded with meetings. detects back to back calls piling up.

real-time. all day. no one has to remember to check.

### 3. duende advocates on their behalf
when a threshold gets crossed, duende messages the person who's asking for time. warm, clear, human. explains why this matters. suggests an alternative that works for both people.

the ai takes the blame. sarah doesn't have to say no. the requester understands why. both protected.

---

## ai advocacy system

### threshold detection

duende analyzes your calendar every day and detects violations:

- **too many meetings** - when meeting hours exceed your max (default: 6 hours/day)
- **no protected lunch** - meetings scheduled during 11:30am-2pm window
- **no movement** - long stretches (>3 hours) without breaks
- **missing buffers** - back-to-back meetings with <10 minute gaps

### intelligent advocacy

when a violation is detected:
1. duende creates a suggestion in your suggestions page
2. you click "generate advocacy message" to draft a warm, conversational email using claude
3. you enter the recipient's email address
4. you click "send message" to deliver the advocacy email
5. duende handles the conversation on your behalf

the ai-generated messages follow this tone:
- starts with "hi [name], duende here for [you]"
- explains the situation simply
- frames it as beneficial for both people
- uses lowercase, conversational language
- never apologizes or is overly deferential

### human pattern recognition

beyond immediate violations, duende notices long-term patterns:

- **new team members** - james joined 3 weeks ago, no 1:1 time yet
- **weather awareness** - first sunny day in weeks, suggests outdoor walking meetings
- **relationship maintenance** - been 7 weeks since casual coffee with sarah
- **energy patterns** - your strategic thinking is 3x better 9-11am than 2-4pm
- **growth time protection** - spanish learning block keeps getting filled with meetings

these are the patterns that make you human. calendars just show meetings. duende sees relationships, energy, growth, connection.

---

## current status

**v0.4 - enterprise landing page with andalusian soul** ✓

### implemented features
- ✅ enterprise landing page with cultural heritage and soul
- ✅ professional navigation with pricing, integrations, how it works
- ✅ story-driven "how it works" with real examples (sarah and james)
- ✅ educational approach: teaches biology behind movement, nutrition, buffers, deep work
- ✅ combined "the ai takes the blame" section showing immediate advocacy and long-term patterns
- ✅ social proof stats: 67% reduction in meeting overload, 4.2hrs reclaimed, 89% more present
- ✅ pricing section: $12/user/month Professional, custom Enterprise
- ✅ planning page with 6 domain questions
- ✅ interactive calendar with drag-drop protections
- ✅ simplified onboarding (email + calendar only)
- ✅ google calendar oauth integration
- ✅ google calendar read and write (sync protection blocks)
- ✅ settings page for preferences
- ✅ live protection preview
- ✅ threshold detection (too many meetings, no lunch, no movement, missing buffers)
- ✅ claude ai integration for message generation
- ✅ email delivery system (resend)
- ✅ suggestions page with approve/send workflow

### core integrations
- ✅ **google calendar** - read events, detect threshold violations, sync protection blocks
- 🔜 **slack** - send advocacy messages on behalf of team members (coming soon)
- 🔜 **notion** - sync protection schedules with team databases (coming soon)

### planned for v1
- [ ] weather-aware suggestions
- [ ] relationship connection tracking
- [ ] exclude list (people duende won't email)
- [ ] slack integration
- [ ] notion integration
- [ ] production deployment

---

## the five default settings

duende protects five foundations of human wellbeing:

1. **movement** - your body is designed to move. sitting for hours keeps you in stress mode.
2. **nutrition** - eating at your desk keeps your nervous system in fight or flight.
3. **relationships** - connection with people who matter regulates your nervous system.
4. **buffers** - back to back meetings keep you in fight or flight all day.
5. **growth** - growth happens at edges, not in the middle of your calendar.

based on the framework from *human default settings* by sinan canan.

---

## educational approach

**duende teaches you why, not just what.**

instead of "take a walk," duende explains:

> "you've been sitting for 3.5 hours. here's what's happening: your hip flexors are shortening, reducing blood flow to your prefrontal cortex by ~15%. this is why that last meeting felt fuzzy.
>
> we've evolved to walk. our ancestors walked 2+ hours daily. movement regulates brain activity and nervous system. you're designed for motion."

over time, you learn your own patterns:
- you think clearest after 15 minutes of walking
- your best ideas come at 11am walks, not 4pm
- with 10-min buffers, your decision quality improves 34% in late-day meetings

you're learning how your specific body and brain work. duende shows you patterns you've never noticed. you become an expert on yourself.

---

## tech stack

### frontend
- **next.js 15** with app router and react 19
- **typescript** for type safety
- **tailwind css** with custom color palette

### backend
- **next.js api routes** (serverless)
- **postgresql** with prisma orm
- **google calendar api** for calendar access
- **anthropic claude** for message generation
- **resend** for email delivery

### colors
- **royal blue** (#00239D) - primary brand color
- **orange** (#FF5C00) - actions and highlights
- **cloud dancer** (#F4F3EE) - backgrounds

---

## getting started

### prerequisites
- **Node.js** v18.18.0 or higher (v20+ recommended)
- **npm** v9 or higher

### 1. clone and install

```bash
git clone https://github.com/enp09/duende.git
cd duende
npm install
```

### 2. set up database

```bash
# create postgresql database (or use Supabase)
createdb duende

# create .env file with your database URL
DATABASE_URL="postgresql://yourusername@localhost:5432/duende?schema=public"

# run migrations
npx prisma migrate dev
```

### 3. configure environment variables

copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

#### required for ai advocacy:
```env
ANTHROPIC_API_KEY="sk-ant-..."       # get from console.anthropic.com
RESEND_API_KEY="re_..."              # get from resend.com
RESEND_FROM_EMAIL="duende <hello@duende.app>"
```

#### required for calendar integration:
```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
```

see [docs/GOOGLE_CALENDAR_SETUP.md](docs/GOOGLE_CALENDAR_SETUP.md) for detailed google calendar setup instructions.

### 4. start development server

```bash
npm run dev
```

visit http://localhost:3000

---

## project structure

```
duende/
├── app/                      # next.js app router
│   ├── page.tsx             # landing page (enterprise + andalusian soul)
│   ├── planning/            # planning page with calendar
│   ├── suggestions/         # ai advocacy suggestions
│   ├── onboarding/          # email + calendar connection
│   ├── settings/            # user preferences
│   └── api/                 # api routes
│       ├── auth/            # google oauth
│       ├── advocacy/        # threshold detection & message generation
│       │   ├── analyze/     # detect calendar violations
│       │   ├── generate-message/  # claude ai integration
│       │   └── send-message/      # email delivery
│       ├── calendar/        # google calendar sync
│       ├── onboarding/      # user creation
│       ├── planning/        # save protections
│       ├── suggestions/     # manage suggestions
│       └── user/            # user data
├── components/
│   ├── ui/                  # reusable components (Card, Button, Input)
│   └── planning/            # WeekCalendar drag-drop component
├── lib/
│   ├── db.ts               # prisma client
│   ├── google.ts           # google calendar helpers
│   ├── threshold-detector.ts # violation detection logic
│   ├── message-generator.ts  # claude ai for advocacy messages
│   └── email-service.ts     # resend email sending
├── prisma/
│   └── schema.prisma       # database models
└── docs/                   # specifications
    ├── ARCHITECTURE.md      # system architecture
    ├── PROJECT_STATUS.md    # current status and roadmap
    └── GOOGLE_CALENDAR_SETUP.md  # oauth setup guide
```

---

## development commands

```bash
# start dev server
npm run dev

# database gui
npx prisma studio

# generate prisma client after schema changes
npx prisma generate

# create new migration
npx prisma migrate dev --name description

# format prisma schema
npx prisma format
```

---

## user flow

1. **landing page (/)** - see the andalusian concept, understand how duende protects humanity, view pricing
2. **click "see demo"** → planning page
3. **planning page (/planning)** - answer 6 questions about what matters
4. **click "generate protections"** - see calendar blocks appear
5. **drag to adjust timing** - fine-tune when protections happen
6. **click "connect calendar"** → onboarding
7. **onboarding (/onboarding)** - enter email, city, connect google calendar
8. **settings (/settings)** - manage preferences, view calendar connection, sync protections
9. **suggestions (/suggestions)** - view threshold violations, generate advocacy messages, send emails

---

## philosophy

### what duende is
- an ai advocacy layer between humans
- a protection system for your humanity
- threshold-based (only intervenes when needed)
- always requires approval before sending
- educational (teaches why, not just what)
- pattern-aware (sees relationships, energy, growth, connection)

### what duende is not
- a productivity tool
- a calendar replacement
- a time tracker
- a scoring system
- rigid or judgmental

### key principles

> **the ai takes the blame.** nobody's the bad guy. both people are protected.

> **teach why, not just what.** you learn your own biology rather than following orders.

> **see human patterns.** calendars just show meetings. duende sees relationships, energy, growth, connection. the things that actually matter.

---

## for teams that care

duende is built for **teams that care about their humanity and wellbeing**.

if you believe:
- movement, real meals, connection, and space to think matter
- people perform better when operating from wholeness
- ai should protect what makes us human, not extract more productivity
- nobody should have to be the bad guy for needing basic humanity

then duende is for you.

**pricing:**
- professional: $12/user/month
- enterprise: custom pricing with full integrations
- 14-day free trial, no credit card required

---

## contributing

this is currently a solo project in active development. contributions welcome once v1 is stable.

---

## license

MIT

---

*a humanbeyondtech project*

*www.humanbeyondtech.com*
