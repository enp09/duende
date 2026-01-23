# duende

> the caring membrane between humans and their time

an ai care layer that sits between you, your calendar, and other people — protecting everyone's humanity without anyone having to ask.

---

## project setup complete ✓

the foundation for duende has been established with:

- **next.js 15** with typescript and app router
- **tailwind css** with warm editorial color palette (cream backgrounds, sage greens, terracotta accents)
- **prisma** with comprehensive database schema
- **folder structure** for scalable development

---

## color palette

the app uses a warm, editorial aesthetic inspired by humanbeyondtech.com:

- **cream** (`cream-500: #e6d7c1`) - main background
- **sage green** (`sage-500: #6b7c6b`) - primary text and accents
- **terracotta** (`terracotta-500: #d97556`) - call-to-action and highlights

fonts:
- **inter** - sans-serif for body text
- **lora** - serif for headings

---

## database schema

the prisma schema includes models for all core features:

### core models
- **user** - authentication, preferences, calendar integration
- **usersettings** - the five default settings (movement, nutrition, relationships, stress, transcendence)
- **relationship** - close people to stay connected with
- **intention** - weekly intentions from sunday planning ritual
- **suggestion** - ai advocacy suggestions (shorten, async, reschedule, etc.)
- **calendarevent** - cached calendar data for analysis
- **conversationmessage** - conversational learning history
- **teachinghistory** - tracks shown teachings to avoid repetition

---

## next steps

### 1. set up postgresql database

```bash
# install postgresql if needed (macos)
brew install postgresql@16
brew services start postgresql@16

# create database
createdb duende

# update .env with your database url
DATABASE_URL="postgresql://yourusername@localhost:5432/duende?schema=public"
```

### 2. run database migration

```bash
npx prisma migrate dev --name init
```

### 3. start development server

```bash
npm run dev
```

visit http://localhost:3000 to see the app.

### 4. configure integrations (when ready)

copy `.env.example` to `.env` and add:
- google calendar oauth credentials
- anthropic api key (for claude)
- openweather api key
- email service credentials (resend or sendgrid)

---

## development commands

```bash
# start dev server
npm run dev

# run prisma studio (database gui)
npx prisma studio

# generate prisma client after schema changes
npx prisma generate

# create new migration
npx prisma migrate dev --name description_of_changes

# format prisma schema
npx prisma format
```

---

## project structure

```
duende/
├── app/              # next.js app router
│   ├── layout.tsx    # root layout with fonts
│   ├── page.tsx      # home page
│   └── globals.css   # tailwind styles
├── components/       # react components
├── lib/              # utilities and helpers
│   └── db.ts         # prisma client singleton
├── prisma/           # database schema and migrations
│   └── schema.prisma # comprehensive data model
├── types/            # typescript type definitions
│   └── index.ts      # core types
└── .env              # environment variables (not committed)
```

---

## philosophy

duende is built on the **default settings framework** from *human default settings* by sinan canan:

1. **movement** - body, mind, and emotions need motion
2. **nutrition** - managing abundance (food and cognitive inputs)
3. **relationships** - tribal connection regulates our nervous system
4. **stress** - ancient response, modern triggers
5. **transcendence** - humans must grow to feel alive

### what duende is not
- a productivity tool
- a calendar replacement
- a time tracker
- a scoring system
- an auto-pilot
- a rigid habit enforcer

### transparency
> "duende isn't optimizing for your productivity. it's optimizing for your humanity — movement, nourishment, connection, calm, growth."

---

## mvp features (v1 roadmap)

- [ ] google calendar integration (read + write)
- [ ] onboarding conversation flow
- [ ] sunday planning ritual
- [ ] morning brief (email delivery)
- [ ] ai advocacy suggestions
- [ ] draft message generation
- [ ] contextual chaos (weather-aware suggestions)
- [ ] woven teaching with humanbeyondtech links
- [ ] conversational learning
- [ ] weather api integration

---

*a humanbeyondtech project*
*www.humanbeyondtech.com*
