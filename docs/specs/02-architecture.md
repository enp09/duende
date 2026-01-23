# duende - technical architecture specification

## tech stack

### frontend
- **next.js 15** - react framework with app router
- **react 19** - ui library
- **typescript** - type safety
- **tailwind css** - styling with warm editorial palette

### backend
- **next.js api routes** - serverless api endpoints
- **node.js** - runtime environment
- **postgresql** - relational database
- **prisma** - orm and database toolkit

### ai & integrations
- **anthropic claude api** - conversation, suggestions, draft generation
- **google calendar api** - calendar read/write access
- **openweathermap api** - weather data
- **resend or sendgrid** - email delivery

### auth
- **next-auth** - authentication (google oauth)

### hosting (recommended)
- **vercel** - frontend and api hosting
- **neon/supabase** - postgresql hosting
- **vercel cron** - scheduled jobs (morning brief, sunday ritual)

---

## architecture overview

```
┌─────────────────────────────────────────────┐
│           user (browser/email)              │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          next.js app (vercel)               │
│  ┌──────────────────────────────────────┐   │
│  │  app/                                │   │
│  │  - pages (ui)                        │   │
│  │  - api routes (serverless functions) │   │
│  └──────────────────────────────────────┘   │
└─────────────────┬───────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐   ┌─────▼──────┐  ┌──▼─────┐
│prisma │   │ claude api │  │ google │
│  +    │   │(anthropic) │  │calendar│
│ pg db │   └────────────┘  │  api   │
└───────┘                   └────────┘
                               │
                         ┌─────▼──────┐
                         │openweather │
                         │    api     │
                         └────────────┘
```

---

## data flow

### onboarding flow
```
user → onboarding ui → claude api (conversational) →
prisma → postgres (User, UserSettings, Relationship)
```

### sunday planning ritual
```
cron trigger → api/planning →
fetch calendar events → analyze with claude →
generate intentions → store in db →
present to user → user approval → update intentions
```

### morning brief
```
cron trigger (7am local) → api/brief →
fetch today's calendar → check intentions →
get weather → fetch teaching →
claude generates brief →
email service → user inbox
```

### real-time suggestions
```
google calendar webhook → api/calendar/sync →
analyze new event → pattern detection →
generate suggestion with claude →
store in db → notify user (in-app or email) →
user accepts/dismisses → execute action
```

---

## folder structure

```
duende/
├── app/                    # next.js app router
│   ├── (auth)/            # auth-related pages
│   │   ├── login/
│   │   └── onboarding/
│   ├── dashboard/         # main app pages
│   │   ├── page.tsx       # dashboard home
│   │   ├── intentions/
│   │   ├── suggestions/
│   │   └── settings/
│   ├── api/               # api routes
│   │   ├── auth/          # next-auth endpoints
│   │   ├── calendar/      # calendar sync & webhooks
│   │   ├── suggestions/   # suggestion generation
│   │   ├── brief/         # morning brief generation
│   │   ├── planning/      # sunday ritual
│   │   └── chat/          # conversational learning
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/            # react components
│   ├── ui/               # reusable ui components
│   ├── onboarding/       # onboarding flow components
│   ├── dashboard/        # dashboard components
│   └── suggestions/      # suggestion cards
├── lib/                  # utilities & helpers
│   ├── db.ts            # prisma client
│   ├── claude.ts        # claude api wrapper
│   ├── calendar.ts      # google calendar helpers
│   ├── weather.ts       # weather api helpers
│   ├── email.ts         # email service wrapper
│   └── analysis/        # calendar analysis algorithms
│       ├── patterns.ts
│       ├── suggestions.ts
│       └── intentions.ts
├── types/               # typescript types
│   └── index.ts
├── prisma/              # database
│   ├── schema.prisma
│   └── migrations/
├── docs/                # documentation
│   └── specs/
└── public/              # static assets
```

---

## api routes specification

### auth
- `POST /api/auth/signup` - create account
- `GET /api/auth/callback/google` - oauth callback
- `POST /api/auth/signout` - sign out

### onboarding
- `POST /api/onboarding/conversation` - process onboarding chat
- `PATCH /api/onboarding/complete` - mark onboarding complete

### calendar
- `POST /api/calendar/connect` - connect google calendar
- `POST /api/calendar/sync` - sync calendar events
- `POST /api/calendar/webhook` - receive calendar change notifications
- `GET /api/calendar/events` - fetch user's calendar events

### intentions
- `POST /api/intentions/generate` - generate weekly intentions
- `GET /api/intentions` - fetch user's intentions
- `PATCH /api/intentions/:id` - update intention status
- `DELETE /api/intentions/:id` - dismiss intention

### suggestions
- `POST /api/suggestions/generate` - analyze and generate suggestions
- `GET /api/suggestions` - fetch pending suggestions
- `POST /api/suggestions/:id/accept` - accept suggestion
- `POST /api/suggestions/:id/dismiss` - dismiss suggestion
- `GET /api/suggestions/:id/draft` - get draft message

### brief
- `POST /api/brief/generate` - generate morning brief
- `POST /api/brief/send` - send brief via email
- `GET /api/brief/preview` - preview today's brief

### planning
- `POST /api/planning/ritual` - trigger sunday planning
- `GET /api/planning/week-preview` - preview week ahead

### chat
- `POST /api/chat/message` - conversational learning endpoint
- `GET /api/chat/history` - fetch conversation history

### settings
- `GET /api/settings` - fetch user settings
- `PATCH /api/settings` - update settings
- `GET /api/settings/relationships` - fetch relationships
- `POST /api/settings/relationships` - add relationship

---

## background jobs (cron)

### daily morning brief
- **schedule:** 7am user's local time (configurable)
- **job:** generate and send morning brief
- **endpoint:** `POST /api/brief/send`

### sunday planning ritual
- **schedule:** sunday 6pm user's local time
- **job:** analyze week, generate intentions
- **endpoint:** `POST /api/planning/ritual`

### calendar sync
- **schedule:** every 15 minutes
- **job:** sync calendar events for all users
- **endpoint:** `POST /api/calendar/sync`

### suggestion generation
- **schedule:** every 30 minutes
- **job:** analyze recent calendar changes, generate suggestions
- **endpoint:** `POST /api/suggestions/generate`

---

## security considerations

### data access
- calendar: read-only by default, write with explicit permission
- no audio recording or meeting transcripts
- only calendar metadata (title, attendees, time)

### user privacy
- no visible tracking or scoring
- suggestions stored but not used to judge users
- conversation history for learning only

### api security
- next-auth for session management
- api routes protected with authentication
- rate limiting on ai endpoints
- webhook verification for calendar events

---

## scalability considerations

### database
- indexes on frequently queried fields
- efficient calendar event caching
- teaching history to avoid redundant queries

### ai api usage
- cache claude responses when possible
- batch suggestion generation
- rate limit user-initiated ai calls

### email delivery
- queue system for morning briefs
- batch sending with delays
- handle timezone differences

---

## monitoring & observability

### key metrics (internal only)
- suggestion acceptance rate
- onboarding completion rate
- user retention (30/60/90 day)
- api response times
- claude api usage and cost

### error tracking
- sentry or similar for error monitoring
- failed calendar syncs
- failed email deliveries
- claude api failures

---

## development workflow

### local development
```bash
# install dependencies
npm install

# set up database
createdb duende
npx prisma migrate dev

# start dev server
npm run dev
```

### database changes
```bash
# edit prisma/schema.prisma
npx prisma format
npx prisma migrate dev --name description
npx prisma generate
```

### deployment
- push to github
- vercel auto-deploys from main branch
- database migrations run automatically
- environment variables set in vercel dashboard
