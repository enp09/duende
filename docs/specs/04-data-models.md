# duende - data models specification

detailed explanation of the prisma schema and how each model supports duende's features.

---

## core philosophy

the data models are designed around the **five default settings**:
1. movement
2. nutrition
3. relationships
4. stress
5. transcendence

every feature traces back to protecting these fundamental human needs.

---

## user model

the central entity - represents a person using duende.

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  imageUrl      String?

  // location for weather-aware suggestions
  city          String?
  timezone      String    @default("America/New_York")

  // google calendar integration
  googleAccessToken   String?
  googleRefreshToken  String?
  googleTokenExpiry   DateTime?
  calendarWriteAccess Boolean  @default(false)

  // onboarding tracking
  onboardingCompleted Boolean  @default(false)
  onboardedAt         DateTime?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

**key fields:**
- `city` + `timezone` - for weather-aware and time-aware suggestions
- `googleAccessToken` / `googleRefreshToken` - encrypted oauth tokens
- `calendarWriteAccess` - explicit permission for time blocking
- `onboardingCompleted` - gate features until onboarding done

**relations:**
- one-to-one: `UserSettings`
- one-to-many: `Intention`, `Suggestion`, `Relationship`, `CalendarEvent`, `ConversationMessage`, `TeachingHistory`

---

## usersettings model

stores preferences for all five default settings.

```prisma
model UserSettings {
  id     String @id @default(cuid())
  userId String @unique

  // MOVEMENT
  movementTypes          String[]  // ["walking", "yoga", "gym"]
  preferredMovementTime  String?   // "morning", "midday", "evening"
  enjoysOutdoors         Boolean
  allowsWalkingMeetings  Boolean

  // NUTRITION
  wantsProtectedLunch    Boolean
  preferredLunchTime     String?   // "12:00"
  eatsAtDesk             Boolean

  // STRESS
  decompressMethods      String[]  // ["walks", "music", "quiet"]
  maxMeetingHoursPerDay  Int
  wantsBufferTime        Boolean
  bufferMinutes          Int

  // TRANSCENDENCE
  passionProjects        String[]
  learningGoals          String[]
}
```

**why separate from user?**
- cleaner data model
- easier to reset/update preferences
- settings can evolve independently

**arrays:**
- `movementTypes`, `decompressMethods` - multiple preferences
- `passionProjects`, `learningGoals` - free text, evolving

**learned preferences:**
duende updates these over time through conversational learning.

---

## relationship model

tracks close people the user wants to stay connected with.

```prisma
model Relationship {
  id     String @id @default(cuid())
  userId String

  name              String
  email             String?
  relationshipType  String   // "friend", "family", "partner"
  isCloseConnection Boolean

  desiredFrequency  String?  // "weekly", "monthly"
  energyImpact      String?  // "energizing", "neutral", "draining"

  lastContactDate   DateTime?
  needsReconnection Boolean
}
```

**supports:** relationships default setting

**use cases:**
1. **reconnection nudges** - when `lastContactDate` is old
2. **energy-aware scheduling** - don't suggest draining people on heavy days
3. **close vs. transactional** - distinguish real connection from work meetings
4. **mutual coordination** - when both people use duende

**learning:**
- user explicitly adds during onboarding
- duende can reclassify through conversation ("priya is a close friend, not just work")
- `lastContactDate` updated from calendar analysis

---

## intention model

represents weekly intentions created during sunday planning ritual.

```prisma
model Intention {
  id     String @id @default(cuid())
  userId String

  defaultSetting String  // which of the 5 settings
  description    String
  weekStartDate  DateTime // monday of the week

  status         String   // "pending", "scheduled", "completed", "dismissed"

  targetDay      String?  // "tuesday" (flexible)
  scheduledFor   DateTime?
  completedAt    DateTime?

  requiresWeather Boolean  // outdoor intentions
  requiresGap     Int?     // minutes needed
}
```

**supports:** all five default settings

**key insight:** intentions are *prospective, not rigid*
- not time-blocked in advance
- duende finds the right moment based on context
- can move between days

**lifecycle:**
1. `pending` - created sunday, waiting for right moment
2. `scheduled` - duende found a slot and user approved
3. `completed` - user marked done
4. `dismissed` - user decided to skip

**contextual scheduling:**
- `requiresWeather` - only schedule on nice days
- `requiresGap` - needs X minutes of free time
- `targetDay` - preference, but flexible

**weekly reset:**
- intentions expire at end of week
- new intentions generated each sunday

---

## suggestion model

ai-generated suggestions to protect default settings.

```prisma
model Suggestion {
  id     String @id @default(cuid())
  userId String

  type           String   // "shorten", "async", "reschedule", etc.
  defaultSetting String?  // which setting this protects
  calendarEventId String? // related meeting

  title          String
  description    String
  reasoning      String?

  draftMessage   String?  // pre-written message to send

  teachingText   String?  // one-liner about why
  learnMoreUrl   String?  // humanbeyondtech.com link

  status         String   // "pending", "accepted", "dismissed"

  acceptedAt     DateTime?
  dismissedAt    DateTime?
  feedbackNote   String?

  expiresAt      DateTime?
}
```

**supports:** ai advocacy layer (core differentiator)

**suggestion types:**
- `shorten` - reduce meeting length
- `async` - convert to written update
- `reschedule` - move to better time
- `batch` - consolidate meetings
- `buffer` - add breathing room
- `walking` - suggest walking meeting
- `protect_lunch` - block meal time
- `movement` - time to move
- `relationship_nudge` - reconnect with someone

**teaching layer:**
- `teachingText` - why this suggestion matters
- `learnMoreUrl` - deep dive on humanbeyondtech.com

**user feedback:**
- `acceptedAt` / `dismissedAt` - track decisions
- `feedbackNote` - optional user explanation
- improves future suggestions

**expiration:**
- time-sensitive suggestions expire
- e.g., "reschedule tomorrow's meeting" expires after tomorrow

---

## calendarevent model

cached calendar data from google calendar.

```prisma
model CalendarEvent {
  id     String @id @default(cuid())
  userId String

  googleEventId String  @unique
  calendarId    String

  title         String?
  description   String?

  startTime     DateTime
  endTime       DateTime
  isAllDay      Boolean

  attendees     Json?    // [{email, name, responseStatus}]
  organizerEmail String?

  isRecurring   Boolean
  meetingLink   String?
  location      String?

  isProtected   Boolean  // user or duende protected
  blockedByDuende Boolean // duende created this block
}
```

**why cache?**
- reduce google calendar api calls
- faster pattern analysis
- work offline during analysis

**metadata for analysis:**
- `attendees` - understand meeting types (1:1, group, all-hands)
- `isRecurring` - daily standup vs. ad-hoc
- `startTime` / `endTime` - detect marathons, gaps
- `organizerEmail` - who scheduled this

**duende-created blocks:**
- `isProtected` - sacred time (lunch, movement)
- `blockedByDuende` - duende created this event

**sync strategy:**
- initial full sync on connection
- webhook updates for changes
- periodic refresh (every 15 min)

---

## conversationmessage model

stores conversational learning interactions.

```prisma
model ConversationMessage {
  id     String @id @default(cuid())
  userId String

  role    String // "user", "assistant", "system"
  content String @db.Text

  context Json?  // what this message relates to

  createdAt DateTime
}
```

**supports:** conversational learning feature

**use cases:**
- onboarding conversation
- ongoing preference adjustments
- "don't suggest skipping my monday standup"
- "i've been feeling low energy lately"

**context field:**
```json
{
  "feature": "onboarding",
  "setting": "movement",
  "relatedIntentionId": "..."
}
```

**learning:**
- claude uses conversation history to understand user
- patterns emerge over time
- preferences extracted and applied

---

## teachinghistory model

tracks which teachings have been shown to avoid repetition.

```prisma
model TeachingHistory {
  id     String @id @default(cuid())
  userId String

  defaultSetting String  // which setting
  teachingKey    String  // unique identifier
  teachingText   String

  timesShown     Int
  lastShownAt    DateTime

  @@unique([userId, teachingKey])
}
```

**supports:** woven teaching feature

**key principle:** never repeat the same teaching twice in a week

**teaching rotation:**
1. check if teaching shown recently
2. if not → show it
3. log in `TeachingHistory`
4. next time, rotate to different teaching

**progression:**
- early teachings: foundational concepts
- later teachings: deeper insights
- build on previous learnings

**example:**
```
week 1: "movement isn't optional if you want to age with strength"
week 3: "consistency beats intensity - your body thrives on gradual movement"
week 5: "one intense workout can't undo a week of sitting"
```

---

## data relationships diagram

```
User (1)
├─── (1) UserSettings
├─── (*) Intention
├─── (*) Suggestion
├─── (*) Relationship
├─── (*) CalendarEvent
├─── (*) ConversationMessage
└─── (*) TeachingHistory
```

---

## indexes for performance

**critical queries:**
```sql
-- find pending suggestions for user
SELECT * FROM Suggestion
WHERE userId = ? AND status = 'pending'
ORDER BY createdAt DESC;

-- find this week's intentions
SELECT * FROM Intention
WHERE userId = ?
AND weekStartDate = ?;

-- find calendar events in time range
SELECT * FROM CalendarEvent
WHERE userId = ?
AND startTime >= ?
AND endTime <= ?;

-- check if teaching shown recently
SELECT * FROM TeachingHistory
WHERE userId = ?
AND teachingKey = ?;
```

**indexes defined in schema:**
```prisma
@@index([userId, status])
@@index([userId, weekStartDate])
@@index([userId, startTime])
@@unique([userId, teachingKey])
```

---

## data lifecycle

### onboarding
1. create `User`
2. create `UserSettings`
3. create `Relationship` records
4. mark `onboardingCompleted = true`

### weekly cycle
1. sunday: generate `Intention` records
2. daily: check intentions, generate `Suggestion`
3. real-time: sync `CalendarEvent` changes
4. continuous: log `ConversationMessage`

### cleanup
- archive old intentions (> 2 weeks)
- archive dismissed suggestions (> 1 week)
- keep calendar events (useful for pattern learning)
- never delete conversation history (learning data)

---

## privacy & security

### sensitive data
- calendar tokens: encrypted at rest
- email addresses: used only for calendar integration
- names: stored with user consent

### data we don't collect
- meeting content or transcripts
- exact location (only city for weather)
- detailed descriptions (privacy risk)

### user control
- can delete account and all data
- can disconnect calendar anytime
- can revoke write access
- can export their data
