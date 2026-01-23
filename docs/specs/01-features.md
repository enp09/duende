# duende - core features specification

## mvp features (v1)

### 1. onboarding conversation
**status:** not started
**priority:** high

a conversational onboarding flow that learns the user's default settings preferences.

**flow:**
1. welcome & philosophy explanation
2. movement preferences
   - what movement do you enjoy?
   - when do you feel best moving?
   - outdoor preferences
   - walking meeting comfort
3. nutrition preferences
   - protected lunch time
   - current eating habits
   - meeting tolerance
4. relationships
   - close people to stay connected with
   - desired connection frequency
   - energy impact tracking
5. stress management
   - decompression methods
   - meeting hour limits
   - buffer preferences
6. transcendence
   - passion projects
   - learning goals
   - growth intentions
7. location & timezone

**technical requirements:**
- conversational ui (not form-based)
- progressive disclosure
- save preferences to `UserSettings`
- create `Relationship` records for close people
- mark `onboardingCompleted` when done

---

### 2. sunday planning ritual
**status:** not started
**priority:** high

weekly planning session that creates flexible intentions for the week ahead.

**timing:** sunday evening (user configurable)

**process:**
1. analyze upcoming week's calendar
2. identify patterns and gaps
3. propose intentions for each default setting:
   - movement moments
   - protected meals
   - connection time
   - buffer/decompression space
   - becoming time
4. user approves, adjusts, or dismisses
5. create `Intention` records with status "pending"

**key insight:** intentions are flexible - duende finds the right moments during the week, not rigid blocks.

**technical requirements:**
- calendar analysis algorithm
- ai-generated intention proposals
- intention management ui
- weather forecast integration for outdoor planning

---

### 3. morning brief
**status:** not started
**priority:** high

daily email (or in-app notification) with gentle guidance.

**timing:** customizable (default 7am local time)

**content:**
- today's shape (meeting count, protected time, open space)
- one thing duende is watching
- weather if relevant to intentions
- one gentle intention or nudge
- optional: one-line teaching with humanbeyondtech link

**tone:** warm, lowercase, friend-like

**example:**
```
good morning. 4 meetings today, 2 hours protected.

it's 64° and sunny — good day for that walk we planned.

i'm watching your afternoon; you'll have been sitting since 9am by 3pm.

one intention: protect your lunch.
```

**technical requirements:**
- email delivery service (resend/sendgrid)
- calendar analysis
- weather api integration
- teaching database with rotation logic

---

### 4. ai advocacy suggestions
**status:** not started
**priority:** high

the core differentiator - duende suggests changes to meetings and frames them as coming from the ai.

**trigger conditions:**
- new meeting when overloaded
- long meeting that could be shorter
- meeting that could be async
- back-to-back marathons
- sitting too long
- both parties overloaded (if they use duende)

**suggestion types:**
- **shorten** - reduce meeting duration
- **async** - convert to written format
- **reschedule** - move to better time
- **batch** - consolidate scattered meetings
- **buffer** - add breathing room
- **walking** - convert to walking meeting

**key principle:** duende takes the blame. neither party is the bad guy.

**technical requirements:**
- real-time calendar event monitoring
- pattern detection algorithms
- draft message generation (claude api)
- suggestion approval ui
- message sending (optional calendar write access)

---

### 5. contextual chaos (alive suggestions)
**status:** not started
**priority:** medium

context-aware suggestions based on current conditions, not fixed schedules.

**input factors:**
- weather (nice day = outdoor suggestions)
- calendar energy (light day = growth work)
- recent patterns (haven't moved in days)
- unexpected gaps
- time of day
- season
- user's stated mood/energy

**examples:**
- "it's 68° and sunny right now. good moment for that walk."
- "you have 45 unexpected free minutes and it's golden hour. walk?"
- "you haven't moved much this week. thursday has a gap and it's warm."

**technical requirements:**
- weather api real-time monitoring
- pattern detection (movement, relationships, etc.)
- opportunity detection in calendar gaps
- smart notification timing

---

### 6. woven teaching
**status:** not started
**priority:** medium

educational layer that teaches *why* suggestions matter.

**structure:**
```
[suggestion] + [one-sentence teaching] + [learn more link]
```

**example:**
```
duende suggests a walking 1:1 with jordan. walking side-by-side
actually makes hard conversations easier — less eye contact pressure,
more blood flow to the brain.

learn more: www.humanbeyondtech.com/movement
```

**rules:**
- never preachy
- conversational tone
- don't repeat same teaching twice in a week
- track in `TeachingHistory`
- build on previous learnings

**technical requirements:**
- teaching content database
- rotation and tracking system
- integration with humanbeyondtech.com links

---

### 7. conversational learning
**status:** not started
**priority:** medium

users can talk to duende anytime to shape how it works.

**capabilities:**
- "don't suggest skipping my monday standup"
- "priya is a close friend, not a work contact"
- "i need fridays lighter this month"
- "i prefer walking meetings when possible"
- "i've been feeling low energy lately"

**technical requirements:**
- chat interface
- natural language understanding (claude api)
- preference extraction and storage
- relationship reclassification
- temporary preference management

---

### 8. weather integration
**status:** not started
**priority:** medium

weather-aware suggestions for outdoor activities.

**use cases:**
- outdoor movement suggestions on nice days
- reschedule outdoor intentions when rain expected
- golden hour walking suggestions
- seasonal awareness

**technical requirements:**
- openweathermap api integration
- user location from profile
- forecast data for weekly planning
- real-time conditions for daily suggestions

---

## post-mvp features (v2+)

### relationship nudges
proactive reconnection suggestions based on time since last contact.

### emergency brake
"i need a break" button that clears afternoon and notifies affected people.

### mid-week check-in
gentle intervention when intentions are at risk.

### two-person coordination
when both people use duende, coordinate care for both parties.

### team/company plans
b2b offering for organizations.

### slack/teams integration
status sync and message delivery.

### voice matching
learn user's communication style for better draft messages.

---

## out of scope

things duende explicitly does not do:

- score or grade users
- track metrics visibly
- gamify with streaks
- enforce rigid routines
- send without approval
- judge bad weeks
- optimize for productivity
