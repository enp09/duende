# duende

> **[ dwen-dah ]** - soul in motion
>
> an Andalusian concept that depicts a fierce, raw, spiritual energy that overtakes an artist when the art becomes larger than life.

**understand how your calendar affects your humanity**

an educational platform that helps you learn the biology behind the 5 pieces of being human. see patterns in your calendar. make informed choices about your wellbeing.

---

## what is duende?

duende is an **educational insights platform** for individuals and teams that care about their humanity and wellbeing.

it analyzes your calendar (read-only) and teaches you about the biological impact of calendar patterns on movement, nutrition, relationships, stress, and growth. when patterns are detected, duende explains why they matter and what you can do.

**you learn about yourself.** you make informed choices. you advocate for your own needs.

this is a humanity tool, not a productivity tool.

---

## how it works

### 1. you set your personal preferences
tell duende about your ideal wellbeing settings. max meeting hours per day. preferred lunch times. buffer time you need between calls.

5 minute setup. then you're done.

### 2. duende analyzes your calendar patterns
connects to google calendar (read-only). detects patterns: when you've been sitting too long, when lunch is crowded with meetings, when back-to-back calls pile up.

shows you insights about your calendar's impact on your wellbeing.

### 3. duende teaches you why it matters
when a pattern is detected, duende explains the biology. shows you how sitting for hours affects your nervous system. explains why back-to-back meetings lead to decision fatigue.

you learn about yourself. you make informed choices. you advocate for your own needs.

---

## educational insights system

### pattern detection

duende analyzes your calendar and detects patterns that affect wellbeing:

- **too many meetings** - when meeting hours exceed your max (default: 6 hours/day)
- **no protected lunch** - meetings scheduled during 11:30am-2pm window
- **no movement** - long stretches (>3 hours) without breaks
- **missing buffers** - back-to-back meetings with <10 minute gaps

### educational insights

when a pattern is detected:
1. duende shows the insight on your insights page
2. explains **why this matters** - the biological/scientific explanation
3. suggests **what you can do** - actionable steps you can take
4. provides **the science** - research and neuroscience behind it

each insight teaches you about:
- how your nervous system responds to calendar patterns
- the biological impact of stress, sitting, and lack of breaks
- why movement, nutrition, relationships, buffers, and growth matter
- how to advocate for your own needs

### understanding yourself

over time, you learn your own patterns:

- you think clearest after 15 minutes of walking
- your best ideas come at 11am walks, not 4pm
- with 10-min buffers, your decision quality improves in late-day meetings
- protected lunch helps you be more present in afternoon meetings

these are the patterns that make you human. duende helps you understand them, not automate around them.

---

## current status

**v0.5 - educational refactor** ✓

### implemented features
- ✅ educational landing page focused on learning about the 5 pieces of being human
- ✅ professional navigation with pricing, integrations, how it works
- ✅ insights dashboard with biological explanations
- ✅ educational approach: teaches neuroscience behind movement, nutrition, buffers, relationships, growth
- ✅ "the 5 pieces of being human" section explaining the biology
- ✅ social proof stats: 67% reduction in meeting overload, 4.2hrs reclaimed, 89% more present
- ✅ pricing section: $12/user/month Professional, custom Enterprise
- ✅ planning page for setting preferences
- ✅ simplified onboarding (email + calendar only)
- ✅ google calendar oauth integration (read-only)
- ✅ settings page for preferences
- ✅ pattern detection (too many meetings, no lunch, no movement, missing buffers)
- ✅ educational insights with "why this matters", "what you can do", and "the science"
- ✅ email insights system (resend)
- ✅ insights page with educational content

### core integrations
- ✅ **google calendar** - read events (read-only), detect patterns, provide insights
- 🔜 **slack** - share wellbeing insights with teams (coming soon)
- 🔜 **notion** - track wellbeing metrics (coming soon)

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

#### required for insights:
```env
RESEND_API_KEY="re_..."              # get from resend.com (for email insights)
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
│   ├── page.tsx             # landing page (educational focus)
│   ├── planning/            # planning page for setting preferences
│   ├── suggestions/         # educational insights dashboard
│   ├── onboarding/          # email + calendar connection
│   ├── settings/            # user preferences
│   └── api/                 # api routes
│       ├── auth/            # google oauth
│       ├── calendar/        # google calendar sync (read-only)
│       ├── onboarding/      # user creation
│       ├── planning/        # save preferences
│       ├── suggestions/     # manage insights
│       └── user/            # user data
├── components/
│   ├── ui/                  # reusable components (Card, Button, Input)
│   └── planning/            # preference setting components
├── lib/
│   ├── db.ts               # prisma client
│   ├── google.ts           # google calendar helpers (read-only)
│   ├── threshold-detector.ts # pattern detection logic
│   └── email-service.ts     # email insights delivery
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

1. **landing page (/)** - learn about the 5 pieces of being human, understand the biology, view pricing
2. **click "explore insights"** → planning page
3. **planning page (/planning)** - set your wellbeing preferences
4. **click "connect calendar"** → onboarding
5. **onboarding (/onboarding)** - enter email, city, connect google calendar (read-only)
6. **settings (/settings)** - manage preferences, view calendar connection
7. **insights page (/suggestions)** - view calendar patterns, learn why they matter, get actionable advice

---

## philosophy

### what duende is
- an educational platform about calendar health
- a learning tool for understanding your biology
- pattern-based (shows you insights about your wellbeing)
- user-empowering (you make your own choices)
- educational (teaches why, not just what)
- science-focused (neuroscience, biology, behavioral research)

### what duende is not
- a productivity tool
- a calendar replacement
- a time tracker
- a scoring system
- an AI that acts on your behalf
- rigid or judgmental

### key principles

> **you learn about yourself.** understand your biology, see your patterns, make informed choices.

> **teach why, not just what.** learn neuroscience rather than following rules.

> **understand human needs.** movement, nutrition, relationships, buffers, and growth aren't optional - they're how your nervous system works.

---

## for people who want to learn

duende is built for **individuals and teams that care about their humanity and wellbeing**.

if you believe:
- movement, real meals, connection, and space to think matter
- people perform better when operating from wholeness
- understanding your biology helps you make better choices
- you should advocate for your own needs, not have AI do it for you

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
