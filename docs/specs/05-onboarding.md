# duende - onboarding flow specification

## philosophy

onboarding is a **conversation, not a form**. duende learns about you through warm, progressive disclosure - asking one thing at a time, building understanding naturally.

**tone:**
- lowercase, warm, friend-like
- never clinical or robotic
- genuinely curious
- validates user's feelings
- teaches gently along the way

---

## flow overview

```
welcome & philosophy
    ↓
movement preferences
    ↓
nutrition preferences
    ↓
relationships
    ↓
stress management
    ↓
transcendence
    ↓
location & timezone
    ↓
calendar connection
    ↓
onboarding complete → dashboard
```

---

## 1. welcome & philosophy

**goal:** explain what duende is and isn't

**screen:**
```
welcome to duende

duende is a caring membrane between you, your calendar, and other people.

we're not here to make you more productive. we're here to protect
your humanity — movement, nourishment, connection, calm, growth.

no scoring. no tracking. no guilt.
just suggestions — you always decide.

[start conversation]
```

**key message:**
> "duende isn't optimizing for your productivity. it's optimizing for
> your humanity — movement, nourishment, connection, calm, growth."

---

## 2. movement preferences

**goal:** learn movement habits and preferences

### question 1: what movement do you enjoy?

```
duende: what kinds of movement do you enjoy? (you can pick multiple)

[ ] walking
[ ] yoga
[ ] gym / strength training
[ ] dancing
[ ] stretching
[ ] swimming
[ ] none right now

duende: your body and mind are one system. movement isn't just physical —
it's how your brain processes emotions and stress. we'll help you find
natural moments to move.

[continue]
```

**save to:** `UserSettings.movementTypes`

### question 2: when do you feel best moving?

```
duende: when do you usually feel best moving?

( ) morning
( ) midday
( ) evening
( ) varies - i like to be flexible

[continue]
```

**save to:** `UserSettings.preferredMovementTime`

### question 3: outdoor preferences

```
duende: do you like being outside?

( ) yes, i love outdoor movement
( ) depends on the weather
( ) i prefer indoors

duende: good to know. duende will watch the weather and suggest outdoor
moments when it's nice.

[continue]
```

**save to:** `UserSettings.enjoysOutdoors`

### question 4: walking meetings

```
duende: how do you feel about walking meetings?

( ) love them
( ) open to it for 1:1s
( ) prefer video/in-person
( ) never

duende: walking side-by-side actually makes hard conversations easier —
less eye contact pressure, more blood flow to the brain.

[continue]
```

**save to:** `UserSettings.allowsWalkingMeetings`

---

## 3. nutrition preferences

**goal:** understand eating habits and cognitive nutrition needs

### question 1: protected lunch

```
duende: do you want protected lunch time?

( ) yes, lunch is sacred
( ) yes, but i'm flexible
( ) no, i'm fine eating whenever
( ) i usually skip lunch

duende: eating at your desk keeps your body in stress mode. digestion
and cognition compete for resources. a protected lunch lets your
nervous system shift gears.

[continue]
```

**save to:** `UserSettings.wantsProtectedLunch`

### question 2: preferred lunch time (if yes to protected)

```
duende: what time works best for lunch?

[time picker: 11:00 - 14:00]

[continue]
```

**save to:** `UserSettings.preferredLunchTime`

### question 3: current habits

```
duende: do you usually eat at your desk or away from it?

( ) at my desk (multitasking)
( ) away from my desk
( ) varies

duende: this isn't about what's "right" — just helping me understand
your current patterns so i can suggest gently.

[continue]
```

**save to:** `UserSettings.eatsAtDesk`

---

## 4. relationships

**goal:** identify close people to stay connected with

### question 1: who are your close people?

```
duende: who are your closest people? the ones who really matter to you.

(you don't have to list everyone — just the people you want to make sure
you stay connected with)

[input field: name]
[add another]

duende: humans evolved in tribes of 50-150. your nervous system literally
calms with people you trust. that's biology, not soft.

[continue]
```

**save to:** `Relationship` records with `isCloseConnection = true`

### question 2: for each person

```
duende: tell me about [name]

relationship:
( ) friend
( ) family
( ) partner
( ) close colleague

how often do you want to connect?
( ) weekly
( ) every couple weeks
( ) monthly
( ) no preference

how do you feel after spending time with them?
( ) energized
( ) neutral / depends
( ) drained (but i care about them)

[add] [skip for now]
```

**save to:** `Relationship.relationshipType`, `desiredFrequency`, `energyImpact`

---

## 5. stress management

**goal:** learn stress patterns and decompression needs

### question 1: what helps you decompress?

```
duende: what helps you decompress after a intense day?
(pick all that apply)

[ ] walks
[ ] naps
[ ] reading
[ ] music
[ ] quiet / solitude
[ ] exercise
[ ] talking to someone
[ ] other: [input]

duende: your stress response can't tell the difference between a tiger
and an email. movement completes the stress cycle — your body needs
the signal that you survived.

[continue]
```

**save to:** `UserSettings.decompressMethods`

### question 2: meeting tolerance

```
duende: what's your max comfortable meeting hours per day?

[slider: 2 - 10 hours]
(most people start feeling drained around 6)

[continue]
```

**save to:** `UserSettings.maxMeetingHoursPerDay`

### question 3: buffer time

```
duende: do you want buffer time between meetings?

( ) yes, i need breathing room
( ) yes, but just 5 minutes
( ) no, back-to-backs are fine

duende: back-to-back meetings keep you in fight-or-flight. you never
get the signal that it's safe. buffers help your stress hormones reset.

[continue]
```

**save to:** `UserSettings.wantsBufferTime`, `bufferMinutes`

---

## 6. transcendence

**goal:** understand growth goals and passion projects

### question 1: what are you working on?

```
duende: what are you working on outside of work obligations?

(passion projects, hobbies, creative pursuits, things that make you
feel most alive)

[textarea: free text]

duende: growth happens at the edge of comfort. a calendar that's 100%
maintenance is slowly numbing. we'll help you protect time for becoming,
not just maintaining.

[continue]
```

**save to:** `UserSettings.passionProjects`

### question 2: learning goals

```
duende: what do you want to learn this year?

[textarea: free text]

duende: humans are the only species that must grow to feel alive.
comfort isn't enough for us. this life is lived once — protecting
time for becoming isn't indulgent, it's essential.

[continue]
```

**save to:** `UserSettings.learningGoals`

---

## 7. location & timezone

**goal:** enable weather-aware suggestions

```
duende: where are you based?

city: [input - autocomplete]
timezone: [auto-detected, can override]

duende: this helps me watch the weather and suggest outdoor moments
when it's nice. i won't use your exact location — just your city for
weather data.

[continue]
```

**save to:** `User.city`, `User.timezone`

---

## 8. calendar connection

**goal:** connect google calendar with appropriate permissions

```
duende: almost there. let's connect your calendar.

duende will:
✓ read your calendar to understand patterns
✓ suggest changes to protect your default settings
✗ never send messages without your approval

you can also give duende permission to block time for protected
activities (like lunch or movement time). this is optional — you
can do it manually if you prefer.

[connect google calendar]

permissions:
[ ] read calendar (required)
[ ] write to calendar (optional - for time blocking)

[continue]
```

**flow:**
1. oauth flow to google
2. save tokens to `User.googleAccessToken`, `googleRefreshToken`
3. set `User.calendarWriteAccess` if write permission granted
4. initial calendar sync

---

## 9. completion

**goal:** celebrate and set expectations

```
duende: you're all set.

here's what happens next:

📅 **sunday evening**
i'll help you plan your week — setting intentions for movement,
connection, growth, and rest. nothing rigid, just flexible goals.

☀️ **every morning**
you'll get a gentle brief — today's shape, what i'm watching,
and one intention to hold.

💡 **throughout the week**
i'll suggest changes to protect your humanity. you always decide.

🗣️ **anytime**
talk to me to adjust how i work. i learn and adapt.

ready?

[go to dashboard]
```

**actions:**
- set `User.onboardingCompleted = true`
- set `User.onboardedAt = now()`
- trigger initial calendar analysis
- redirect to dashboard

---

## technical implementation

### component structure

```
app/
└── onboarding/
    ├── page.tsx              # main onboarding wrapper
    ├── welcome.tsx           # step 1
    ├── movement.tsx          # step 2
    ├── nutrition.tsx         # step 3
    ├── relationships.tsx     # step 4
    ├── stress.tsx            # step 5
    ├── transcendence.tsx     # step 6
    ├── location.tsx          # step 7
    ├── calendar.tsx          # step 8
    └── complete.tsx          # step 9
```

### state management

```typescript
type OnboardingState = {
  currentStep: number;
  data: {
    movement: MovementPreferences;
    nutrition: NutritionPreferences;
    relationships: RelationshipData[];
    stress: StressPreferences;
    transcendence: TranscendenceData;
    location: LocationData;
  };
};
```

### api endpoints

```
POST /api/onboarding/save-step
POST /api/onboarding/complete
POST /api/calendar/connect
```

---

## design notes

### visual style
- cream background (`cream-500`)
- sage text (`sage-700`)
- terracotta accents for CTAs (`terracotta-500`)
- serif headings, sans body text
- generous whitespace
- never crowded or overwhelming

### interactions
- smooth transitions between steps
- progress indicator (subtle)
- ability to go back
- save progress (resume later)

### mobile-friendly
- single column layout
- large touch targets
- readable font sizes
- no horizontal scrolling

---

## edge cases

### user skips sections
- allow skipping (except calendar connection)
- can fill in later from settings
- mark as "incomplete" in settings

### calendar connection fails
- explain error clearly
- offer retry
- support email for help

### user has no close relationships
- that's okay, don't force it
- can add later
- focus on other settings

### user has minimal preferences
- still create account
- use sensible defaults
- learn over time through conversation

---

## success metrics (internal)

- % who complete onboarding
- time to complete
- drop-off points (which step?)
- % who connect calendar
- % who grant write access
- % who add relationships
