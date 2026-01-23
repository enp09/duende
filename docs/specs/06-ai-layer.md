# duende - ai layer specification

## philosophy

the ai layer is what makes duende different. it's not just calendar analysis — it's **advocacy**. duende takes the social awkwardness out of protecting your humanity.

**key principle:** duende takes the blame so humans don't have to.

---

## ai capabilities overview

| capability | purpose | model |
|------------|---------|-------|
| pattern detection | identify calendar issues | algorithmic + claude |
| suggestion generation | propose protective actions | claude-3.5-sonnet |
| draft messages | write messages on user's behalf | claude-3.5-sonnet |
| teaching generation | explain why suggestions matter | claude-3.5-sonnet |
| conversational learning | understand user preferences | claude-3.5-sonnet |
| intention planning | weekly planning proposals | claude-3.5-sonnet |

---

## 1. pattern detection

### sitting marathons

**trigger:** 3+ hours of consecutive meetings without break

**analysis:**
```typescript
function detectSittingMarathon(events: CalendarEvent[]): Pattern {
  // sort events by start time
  // calculate gaps between consecutive events
  // if gap < 10 minutes and total > 3 hours → marathon

  return {
    type: 'sitting_marathon',
    duration: totalHours,
    defaultSetting: 'movement',
    severity: 'high'
  };
}
```

**suggestion types:** buffer, movement, reschedule

---

### meeting overload

**trigger:** exceeds user's `maxMeetingHoursPerDay`

**analysis:**
```typescript
function detectMeetingOverload(events: CalendarEvent[], maxHours: number) {
  const totalMeetingHours = calculateMeetingHours(events);

  if (totalMeetingHours > maxHours) {
    return {
      type: 'meeting_overload',
      hours: totalMeetingHours,
      excess: totalMeetingHours - maxHours,
      defaultSetting: 'stress',
      severity: totalMeetingHours > maxHours + 2 ? 'high' : 'medium'
    };
  }
}
```

**suggestion types:** async, reschedule, shorten

---

### unprotected lunch

**trigger:** meeting scheduled during lunch time

**analysis:**
```typescript
function detectLunchConflict(
  event: CalendarEvent,
  lunchTime: string
): Pattern | null {
  const lunchStart = parseTime(lunchTime); // e.g., "12:00"
  const lunchEnd = lunchStart.add(1, 'hour');

  if (event.overlapsWith(lunchStart, lunchEnd)) {
    return {
      type: 'lunch_conflict',
      conflictingEvent: event,
      defaultSetting: 'nutrition',
      severity: 'medium'
    };
  }
}
```

**suggestion types:** reschedule, shorten, protect_lunch

---

### relationship neglect

**trigger:** haven't connected with close person in > desired frequency

**analysis:**
```typescript
function detectRelationshipNeglect(
  relationship: Relationship,
  recentEvents: CalendarEvent[]
): Pattern | null {
  const daysSinceContact = daysBetween(
    relationship.lastContactDate,
    now()
  );

  const threshold = frequencyToDays(relationship.desiredFrequency);

  if (daysSinceContact > threshold) {
    return {
      type: 'relationship_neglect',
      person: relationship,
      daysSince: daysSinceContact,
      defaultSetting: 'relationships',
      severity: daysSinceContact > threshold * 2 ? 'high' : 'medium'
    };
  }
}
```

**suggestion types:** relationship_nudge

---

### no growth time

**trigger:** calendar is 100% maintenance (no protected time for transcendence)

**analysis:**
```typescript
function detectNoGrowthTime(
  weekEvents: CalendarEvent[],
  intentions: Intention[]
): Pattern | null {
  const growthIntentions = intentions.filter(
    i => i.defaultSetting === 'transcendence'
  );

  const hasGrowthTime = growthIntentions.some(
    i => i.status === 'scheduled' || i.status === 'completed'
  );

  if (!hasGrowthTime && weekEvents.length > 15) {
    return {
      type: 'no_growth_time',
      defaultSetting: 'transcendence',
      severity: 'medium'
    };
  }
}
```

**suggestion types:** protect time, reschedule less important meetings

---

## 2. suggestion generation

### prompt structure

```typescript
const systemPrompt = `
you are duende, an ai care layer that protects humans' default settings.

you analyze calendar patterns and generate suggestions to protect:
- movement (body needs motion)
- nutrition (cognitive and physical)
- relationships (real connection)
- stress (ancient response, modern triggers)
- transcendence (growth and becoming)

when you suggest changes, you frame them as coming from the ai -
neither party is the bad guy. you're warm, lowercase, never clinical.

generate suggestions that feel caring, not controlling.
`;

const userPrompt = `
pattern detected: ${pattern.type}
severity: ${pattern.severity}

user context:
- meeting hours today: ${meetingHours}
- max comfortable: ${maxMeetingHours}
- movement preferences: ${movementPreferences}
- close relationships: ${relationships}

conflicting event:
- title: "${event.title}"
- duration: ${event.duration} minutes
- attendees: ${event.attendees.length}
- organizer: ${event.organizerEmail}

generate a suggestion to protect the user's ${pattern.defaultSetting} setting.

return json:
{
  "type": "async" | "shorten" | "reschedule" | "buffer" | "walking",
  "title": "short title",
  "description": "why this helps",
  "reasoning": "context about their patterns",
  "draftMessage": "message they can send",
  "teachingText": "one-line insight about default settings",
  "learnMoreUrl": "https://humanbeyondtech.com/..."
}
`;
```

### example response

```json
{
  "type": "async",
  "title": "convert status meeting to bullet points",
  "description": "you've had 4 hours of meetings already. your brain needs a cognitive fast.",
  "reasoning": "you're at hour 5 of meetings with 2 more scheduled. your stress response stays activated without breaks. converting this to async gives you space to digest.",
  "draftMessage": "hi team - duende noticed i've been in meetings since 9am. to protect both my focus and your time, would you be open to async bullet points instead? i can share updates by EOD and we can discuss questions async. what do you think?",
  "teachingText": "your brain processes information like your stomach processes food. it needs breaks to digest. 6 hours of meetings is cognitive overload.",
  "learnMoreUrl": "https://humanbeyondtech.com/nutrition"
}
```

---

## 3. draft message generation

### tone guidelines

**principles:**
- never blame the other person
- explicitly mention duende
- make it easy to say no
- show care for both parties
- lowercase, warm

**bad example:**
```
i can't make this meeting. let's do async instead.
```

**good example:**
```
hi [name] - duende flagged that i've been in meetings since 9am
and suggested we convert this to async to protect both our time.
would bullet points work instead? happy to do a quick call if
needed, but figured this might be easier for both of us.
```

### template structure

```typescript
const messageTemplates = {
  async: `
    hi {name} - duende noticed {pattern} and suggested {action}
    to protect both our time. would {alternative} work instead?
  `,

  shorten: `
    hi {name} - duende suggests shortening our {duration}-minute
    meeting to {newDuration} minutes. would that work? we can
    focus on {mainTopic} and follow up async if needed.
  `,

  reschedule: `
    hi {name} - duende noticed {reason} and suggested moving this
    to {newTime} when {benefit}. does that work for you?
  `,

  walking: `
    hi {name} - weather looks nice. want to do a walking meeting
    instead of zoom? we could meet at {location}.
  `,
};
```

### personalization

claude personalizes based on:
- user's conversation history
- communication style learned over time
- relationship with recipient (close friend vs. formal)
- urgency and context

---

## 4. teaching generation

### teaching database structure

```typescript
type Teaching = {
  key: string;              // unique identifier
  defaultSetting: DefaultSetting;
  text: string;             // one-liner
  learnMoreUrl: string;     // humanbeyondtech.com
  depth: 'foundational' | 'intermediate' | 'advanced';
};
```

### example teachings

#### movement
```typescript
const movementTeachings: Teaching[] = [
  {
    key: 'movement_mind_body',
    defaultSetting: 'movement',
    text: 'your body and mind are one system. sitting 4+ hours drops blood flow to your brain. a 10-minute walk resets everything.',
    learnMoreUrl: 'https://humanbeyondtech.com/movement',
    depth: 'foundational'
  },
  {
    key: 'movement_consistency',
    defaultSetting: 'movement',
    text: 'one intense workout doesn't undo a week of sitting. consistency transforms health, not shock.',
    learnMoreUrl: 'https://humanbeyondtech.com/movement',
    depth: 'intermediate'
  }
];
```

### rotation logic

```typescript
async function selectTeaching(
  userId: string,
  defaultSetting: DefaultSetting
): Promise<Teaching> {
  // get teachings user has seen
  const history = await getTeachingHistory(userId, defaultSetting);

  // filter out recently shown (< 7 days)
  const recentKeys = history
    .filter(h => daysSince(h.lastShownAt) < 7)
    .map(h => h.teachingKey);

  // get all teachings for this setting
  const allTeachings = getTeachings(defaultSetting);

  // filter out recent
  const available = allTeachings.filter(
    t => !recentKeys.includes(t.key)
  );

  // prefer teachings they haven't seen
  const unseen = available.filter(
    t => !history.some(h => h.teachingKey === t.key)
  );

  // select based on depth progression
  const teaching = unseen.length > 0
    ? selectByDepth(unseen, history)
    : selectByDepth(available, history);

  // log to history
  await logTeachingShown(userId, teaching);

  return teaching;
}
```

---

## 5. conversational learning

### intent recognition

```typescript
type Intent =
  | 'update_preference'
  | 'add_exception'
  | 'reclassify_relationship'
  | 'adjust_timing'
  | 'express_mood'
  | 'give_feedback';
```

### prompt structure

```typescript
const conversationPrompt = `
user said: "${userMessage}"

context:
- current settings: ${JSON.stringify(settings)}
- recent suggestions: ${recentSuggestions}
- this week's intentions: ${intentions}

analyze the user's message and extract:
1. intent (what they want to change)
2. specific adjustments to make
3. a warm, confirming response

return json:
{
  "intent": "update_preference",
  "changes": [
    {
      "model": "UserSettings",
      "field": "allowsWalkingMeetings",
      "value": false
    }
  ],
  "response": "got it - i won't suggest walking meetings anymore..."
}
`;
```

### example interactions

**user:** "don't suggest skipping my monday standup - i actually like it"

**ai response:**
```json
{
  "intent": "add_exception",
  "changes": [
    {
      "model": "ConversationMessage",
      "field": "context",
      "value": {
        "exception": "never suggest skipping monday standup"
      }
    }
  ],
  "response": "got it - your monday standup is sacred. i'll remember that."
}
```

**user:** "priya is a close friend, not just a work contact"

**ai response:**
```json
{
  "intent": "reclassify_relationship",
  "changes": [
    {
      "model": "Relationship",
      "where": { "name": "Priya" },
      "updates": {
        "relationshipType": "friend",
        "isCloseConnection": true
      }
    }
  ],
  "response": "updated - priya is a close friend. i'll nudge you to connect with her outside of work stuff."
}
```

---

## 6. intention planning (sunday ritual)

### analysis algorithm

```typescript
async function generateWeeklyIntentions(
  userId: string,
  weekStart: Date
): Promise<Intention[]> {
  // fetch upcoming week's calendar
  const events = await getCalendarEvents(userId, weekStart, weekStart + 7days);

  // analyze patterns
  const patterns = {
    totalMeetingHours: calculateTotalMeetingHours(events),
    longestMarathon: findLongestMarathon(events),
    gaps: findGaps(events),
    lightDays: findLightDays(events),
    heavyDays: findHeavyDays(events),
  };

  // get user preferences
  const settings = await getUserSettings(userId);
  const relationships = await getRelationships(userId);

  // get weather forecast
  const weather = await getWeatherForecast(settings.city, weekStart);

  // use claude to generate intentions
  const intentions = await claude.generateIntentions({
    patterns,
    settings,
    relationships,
    weather
  });

  return intentions;
}
```

### claude prompt

```typescript
const intentionPrompt = `
analyze the upcoming week and propose intentions for each default setting.

week overview:
- total meetings: ${patterns.totalMeetingHours} hours
- heaviest day: ${patterns.heavyDays[0].day} (${patterns.heavyDays[0].hours} hours)
- lightest day: ${patterns.lightDays[0].day}
- gaps: ${patterns.gaps.map(g => g.duration).join(', ')}

user preferences:
- movement: ${settings.movementTypes.join(', ')}
- prefers: ${settings.preferredMovementTime}
- protected lunch: ${settings.wantsProtectedLunch ? 'yes' : 'no'}
- passion projects: ${settings.passionProjects}
- close people: ${relationships.map(r => r.name).join(', ')}

weather forecast:
${weather.map(d => `${d.day}: ${d.temp}°F, ${d.condition}`).join('\n')}

generate 3-5 intentions that:
1. protect their default settings
2. work with their calendar reality
3. take advantage of weather
4. are flexible (not rigid time blocks)

return json array:
[
  {
    "defaultSetting": "movement",
    "description": "30-minute walk tuesday or wednesday",
    "reasoning": "you have 18 hours of meetings this week...",
    "targetDay": "tuesday",
    "requiresWeather": true,
    "requiresGap": 30
  }
]
`;
```

---

## 7. contextual chaos

### opportunity detection

**real-time monitoring:**
```typescript
// check every 30 minutes
async function detectOpportunities(userId: string) {
  const now = new Date();
  const nextHour = now + 1hour;

  // unexpected gap?
  const upcomingEvents = await getEvents(userId, now, nextHour);
  if (upcomingEvents.length === 0) {
    const currentWeather = await getWeather(user.city);

    if (currentWeather.isNice && user.enjoysOutdoors) {
      return {
        type: 'surprise_moment',
        suggestion: 'you have 45 unexpected free minutes and it\'s golden hour. walk?'
      };
    }
  }
}
```

**contextual factors:**
- weather (real-time)
- calendar gaps (unexpected)
- time of day (energy levels)
- recent patterns (haven't moved in days)
- day energy (light calendar = good for growth work)

---

## cost optimization

### caching strategies
- cache calendar analysis (5 min)
- cache teaching selection (per suggestion)
- cache weather data (30 min)

### model selection
- simple tasks: claude-3-haiku (faster, cheaper)
- complex tasks: claude-3.5-sonnet
- ultra-simple: algorithmic (no ai)

### batching
- generate suggestions in batches
- analyze week once (sunday)
- batch email generation

---

## error handling

### ai failures
- timeout → retry with exponential backoff
- invalid json → parse with fallback
- generic error → log and use template

### fallback templates
if claude fails, use pre-written templates with variable substitution.

### user feedback loop
- track accept/dismiss rates per suggestion type
- a/b test different framings
- improve prompts based on patterns
