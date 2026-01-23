# duende - architecture overview (v0.2)

## system design

duende is a web application built with next.js that helps users plan their week and advocates for their humanity through automated email suggestions.

```
┌─────────────────────────────────────────────┐
│              user (browser)                 │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│         next.js 15 app (vercel)             │
│  ┌──────────────────────────────────────┐   │
│  │  app router pages                    │   │
│  │  - landing page (marketing)          │   │
│  │  - planning page (core feature)      │   │
│  │  - onboarding (email + calendar)     │   │
│  │  - settings (preferences)            │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  api routes (serverless functions)   │   │
│  │  - /api/auth/google/*                │   │
│  │  - /api/onboarding/complete          │   │
│  │  - /api/planning/save                │   │
│  │  - /api/user/[id]                    │   │
│  └──────────────────────────────────────┘   │
└──────────────┬──────────────────────────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼───┐ ┌────▼─────┐ ┌─▼──────┐
│prisma │ │  google  │ │ claude │
│  +    │ │ calendar │ │   api  │
│  pg   │ │   api    │ │(future)│
└───────┘ └──────────┘ └────────┘
```

---

## tech stack

### frontend
- **next.js 15** - react framework with app router
- **react 19** - latest react with server components
- **typescript 5** - type safety
- **tailwind css 3** - utility-first styling

### backend
- **next.js api routes** - serverless functions
- **node.js** - runtime environment
- **prisma 6** - orm and migrations
- **postgresql** - relational database

### integrations
- **google calendar api** - calendar read/write (googleapis ^170.1.0)
- **google oauth 2.0** - authentication (google-auth-library ^10.5.0)
- **anthropic claude** - planned for message generation

---

## current implementation

### pages

#### 1. landing page (`app/page.tsx`)
- marketing page explaining what duende does
- shows ai advocacy examples
- displays calendar visualization
- "get started" button → planning page

**key sections:**
- hero with pronunciation guide
- how it works (3 steps)
- calendar visual preview
- ai advocacy examples (3 scenarios)
- five default settings explained
- philosophy section
- final CTA

#### 2. planning page (`app/planning/page.tsx`)
**status:** ✅ fully functional

the core experience where users plan their week.

**features:**
- 6 domain questions (this week, movement, nutrition, relationships, buffers, growth)
- distinct color-coded cards for each domain
- exclude people input (who duende won't email)
- "generate protections" button
- interactive calendar with drag-drop
- email examples (what duende sends vs what you receive)
- "connect calendar" CTA

**workflow:**
1. user answers 6 questions
2. clicks "generate protections"
3. calendar blocks appear in real-time
4. user drags to adjust timing
5. clicks "connect calendar" → onboarding
6. data saved to localStorage

**components used:**
- `Card` - for question containers
- `Input` - for text inputs
- `Button` - for actions
- `WeekCalendar` - drag-drop calendar component

#### 3. onboarding page (`app/onboarding/page.tsx`)
**status:** ✅ simplified implementation

minimal friction onboarding flow.

**fields:**
- email address
- city (for weather-aware suggestions)

**flow:**
1. shows protection count from planning
2. collects email + city
3. gets planning data from localStorage
4. creates user in database
5. initiates google oauth flow
6. redirects to settings after successful connection

**api call:**
```typescript
POST /api/onboarding/complete
{
  email: string,
  city: string,
  timezone: string,
  planningAnswers: DomainAnswers,
  calendarBlocks: CalendarBlock[]
}
```

#### 4. settings page (`app/settings/page.tsx`)
**status:** ✅ functional

user preferences and account management.

**features:**
- calendar connection status
- sync calendar button
- user profile display
- link back to planning

---

### components

#### ui components (`components/ui/`)

**Card** - content container
```typescript
interface CardProps {
  children: ReactNode;
  className?: string;
}
```

**Button** - action button with variants
```typescript
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Input** - text input field
```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
```

#### planning components (`components/planning/`)

**WeekCalendar** - interactive calendar with drag-drop
```typescript
interface CalendarBlock {
  id: string;
  type: 'existing' | 'proposed';
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
  setting?: string;
}

interface WeekCalendarProps {
  blocks: CalendarBlock[];
  onBlocksChange: (blocks: CalendarBlock[]) => void;
}
```

**features:**
- week and month view toggle
- drag and drop proposed blocks
- existing meetings (non-draggable)
- color-coded by protection type
- visual feedback on hover/drag

---

### api routes

#### auth routes (`app/api/auth/google/`)

**login** - initiate oauth flow
```typescript
GET /api/auth/google/login?userId={userId}
→ returns { success: boolean, authUrl: string }
```

**callback** - handle oauth callback
```typescript
GET /api/auth/google/callback?code={code}&state={userId}
→ saves tokens to database
→ redirects to /settings?calendar=connected
```

#### onboarding route

**complete** - create user account
```typescript
POST /api/onboarding/complete
body: {
  email: string,
  city: string,
  timezone: string,
  planningAnswers?: object,
  calendarBlocks?: array
}
→ creates User record
→ returns { success: boolean, userId: string }
```

#### planning route

**save** - save weekly protections
```typescript
POST /api/planning/save
body: {
  userId: string,
  answers: DomainAnswers,
  protections: CalendarBlock[]
}
→ saves to database
→ returns { success: boolean }
```

#### user route

**get user** - fetch user data
```typescript
GET /api/user/[id]
→ returns user with settings and relationships
```

---

## database schema

### user table
```prisma
model User {
  id                  String       @id @default(cuid())
  email               String       @unique
  city                String?
  timezone            String?
  googleAccessToken   String?
  googleRefreshToken  String?
  googleTokenExpiry   DateTime?
  calendarWriteAccess Boolean      @default(false)
  onboardingCompleted Boolean      @default(false)
  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt

  settings            UserSettings?
  relationships       Relationship[]
  intentions          Intention[]
  calendarEvents      CalendarEvent[]
}
```

### usersettings table
```prisma
model UserSettings {
  id                      String   @id @default(cuid())
  userId                  String   @unique
  user                    User     @relation(fields: [userId], references: [id])

  // domain preferences
  movementTypes           String?
  preferredMovementTime   String?
  enjoysOutdoors          Boolean?
  allowsWalkingMeetings   Boolean?
  wantsProtectedLunch     Boolean?
  preferredLunchTime      String?
  eatsAtDesk              Boolean?
  decompressMethods       String?
  maxMeetingHoursPerDay   Int?
  wantsBufferTime         Boolean?
  bufferMinutes           Int?
  passionProjects         String?
  learningGoals           String?

  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
}
```

---

## data flow

### planning flow
```
user visits /planning
  ↓
answers 6 questions (localStorage)
  ↓
clicks "generate protections"
  ↓
calendar blocks generated client-side
  ↓
user adjusts with drag-drop
  ↓
clicks "connect calendar"
  ↓
redirects to /onboarding with data in localStorage
```

### onboarding flow
```
user enters email + city
  ↓
clicks "connect google calendar"
  ↓
POST /api/onboarding/complete
  ↓
user created in database with planning data
  ↓
GET /api/auth/google/login
  ↓
redirects to google oauth
  ↓
user grants permissions
  ↓
google redirects to /api/auth/google/callback
  ↓
tokens saved to database
  ↓
redirects to /settings
```

### future: calendar sync flow
```
cron job or webhook trigger
  ↓
fetch user's calendar events from google
  ↓
analyze patterns (meetings count, gaps, lunch blocked, etc)
  ↓
detect threshold violations
  ↓
generate suggestion with claude
  ↓
send email to user with yes/no buttons
  ↓
if yes: send advocacy email to others
  ↓
if yes: add protection block to calendar
```

---

## color system

### brand colors
- **royal blue** - `#00239D` - primary brand
- **orange** - `#FF5C00` - actions and highlights
- **cloud dancer** - `#F4F3EE` - backgrounds

### domain colors (planning page)
- **purple** - this week intentions
- **orange** - movement
- **green** - nutrition
- **pink** - relationships
- **blue** - buffers
- **amber** - growth

### calendar colors
- **gray** - `#9ca3af` - existing meetings
- **orange-400** - `#fb923c` - movement blocks
- **green-400** - `#4ade80` - nutrition blocks
- **pink-400** - `#f472b6` - relationship blocks
- **blue-400** - `#60a5fa` - buffer blocks
- **amber-400** - `#fbbf24` - growth blocks

---

## security

### authentication
- google oauth 2.0 flow
- tokens stored encrypted in database
- refresh tokens for long-term access

### api security
- all api routes validate requests
- user id passed via query params (temporary - need sessions)
- calendar tokens kept server-side

### privacy
- no visible tracking or metrics
- calendar data used for pattern detection only
- no meeting transcripts or audio
- user always approves before messages sent

---

## deployment

### recommended hosting
- **vercel** - frontend and api routes
- **neon/supabase** - postgresql database
- **vercel cron** - future scheduled jobs

### environment variables
```env
DATABASE_URL="postgresql://..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_REDIRECT_URI="https://yourdomain.com/api/auth/google/callback"
```

### build process
```bash
npm run build
# next.js builds optimized production bundle
# prisma generates client
# deployed to vercel
```

---

## future architecture

### planned additions

**threshold detection service**
- runs every 30 minutes
- analyzes calendar for violations
- triggers email generation

**message generation with claude**
- draft advocacy messages
- personalized to user's voice
- context-aware based on situation

**email delivery**
- resend or sendgrid integration
- transactional emails with yes/no buttons
- webhook handling for responses

**weather api**
- openweathermap integration
- weather-aware outdoor suggestions
- forecast data for planning

**calendar write access**
- add protection blocks directly
- update when user drags in planning view
- sync in real-time

---

## performance considerations

### optimization strategies
- server components for static content
- client components only where needed
- prisma query optimization with indexes
- localStorage for planning session data

### future optimizations
- cache calendar events locally
- batch ai requests
- optimize drag-drop performance
- lazy load email examples

---

## monitoring (planned)

### key metrics
- onboarding completion rate
- planning session completion
- calendar connection rate
- protection generation success
- drag-drop usage

### error tracking
- failed calendar syncs
- oauth failures
- database errors
- ai api failures

---

*last updated: january 2026*
*version: 0.2 (planning mvp)*
