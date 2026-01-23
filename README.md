# duende

> pronounced "dwen-day" — the feeling of being fully alive

an ai advocacy layer that sits between you, your calendar, and other people — protecting everyone's humanity without anyone having to ask.

---

## what is duende?

duende helps you plan your week and advocates for the time that makes you human: movement, real meals, connection, space to think and grow.

**the ai takes the blame.** when someone tries to book you during lunch or you've been sitting too long, duende messages them on your behalf. nobody's the bad guy. both people are protected.

this is not a productivity tool. this is a humanity tool.

---

## how it works

1. **plan your week** - answer 6 questions about what matters to you
2. **see protections appear** - watch your calendar fill with movement time, protected lunch, connection moments
3. **adjust and sync** - drag blocks to perfect timing, then sync to google calendar
4. **duende advocates** - throughout the week, duende messages others when your humanity needs protecting

---

## current status

**v0.2 - planning mvp complete** ✓

### implemented features
- ✅ landing page with ai advocacy framing
- ✅ planning page with 6 domain questions
- ✅ interactive calendar with drag-drop protections
- ✅ email examples showing advocacy in action
- ✅ simplified onboarding (email + calendar only)
- ✅ google calendar oauth integration
- ✅ settings page for preferences
- ✅ live protection preview

### in progress
- 🚧 actual google calendar sync (read user events)
- 🚧 calendar write (add protection blocks)
- 🚧 email sending (threshold-based advocacy)

### planned for v1
- [ ] threshold detection (too many meetings, no lunch, etc)
- [ ] draft message generation with claude
- [ ] email delivery (resend/sendgrid)
- [ ] weather-aware suggestions
- [ ] relationship connection tracking
- [ ] exclude list (people duende won't email)

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

## tech stack

### frontend
- **next.js 15** with app router and react 19
- **typescript** for type safety
- **tailwind css** with custom color palette

### backend
- **next.js api routes** (serverless)
- **postgresql** with prisma orm
- **google calendar api** for calendar access
- **anthropic claude** (planned for message generation)

### colors
- **royal blue** (#00239D) - primary brand color
- **orange** (#FF5C00) - actions and highlights
- **cloud dancer** (#F4F3EE) - backgrounds

---

## getting started

### 1. clone and install

```bash
git clone https://github.com/yourusername/duende.git
cd duende
npm install
```

### 2. set up database

```bash
# create postgresql database
createdb duende

# create .env file
DATABASE_URL="postgresql://yourusername@localhost:5432/duende?schema=public"

# run migrations
npx prisma migrate dev
```

### 3. configure google calendar (optional for development)

see [docs/GOOGLE_CALENDAR_SETUP.md](docs/GOOGLE_CALENDAR_SETUP.md) for detailed setup instructions.

```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
```

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
│   ├── page.tsx             # landing page
│   ├── planning/            # planning page with calendar
│   ├── onboarding/          # email + calendar connection
│   ├── settings/            # user preferences
│   └── api/                 # api routes
│       ├── auth/            # google oauth
│       ├── onboarding/      # user creation
│       ├── planning/        # save protections
│       └── user/            # user data
├── components/
│   ├── ui/                  # reusable components (Card, Button, Input)
│   └── planning/            # WeekCalendar drag-drop component
├── lib/
│   ├── db.ts               # prisma client
│   └── google.ts           # google calendar helpers
├── prisma/
│   └── schema.prisma       # database models
└── docs/                   # specifications
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

1. **landing page (/)** - see what duende does, examples of ai advocacy
2. **click "get started"** → planning page
3. **planning page (/planning)** - answer 6 questions about what matters
4. **click "generate protections"** - see calendar blocks appear
5. **drag to adjust timing** - fine-tune when protections happen
6. **click "connect calendar"** → onboarding
7. **onboarding (/onboarding)** - enter email, city, connect google calendar
8. **settings (/settings)** - manage preferences, view calendar connection

---

## philosophy

### what duende is
- an ai advocacy layer between humans
- a protection system for your humanity
- threshold-based (only intervenes when needed)
- always requires approval before sending

### what duende is not
- a productivity tool
- a calendar replacement
- a time tracker
- a scoring system
- rigid or judgmental

### key principle
> the ai takes the blame. nobody's the bad guy. both people are protected.

---

## contributing

this is currently a solo project in active development. contributions welcome once v1 is stable.

---

## license

MIT

---

*a humanbeyondtech project*
*www.humanbeyondtech.com*
