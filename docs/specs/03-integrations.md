# duende - integrations specification

## 1. google calendar api

### purpose
read user's calendar to understand patterns and optionally write to block protected time.

### authentication
**oauth 2.0** with incremental authorization

**scopes:**
- `calendar.readonly` - read calendar events (required)
- `calendar.events` - create/modify events (optional, user opt-in for time blocking)

### setup steps
1. create project in google cloud console
2. enable google calendar api
3. configure oauth consent screen
4. create oauth 2.0 credentials
5. add authorized redirect uris

### endpoints used

#### list events
```
GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events
```

**params:**
- `timeMin` - start of time range (iso 8601)
- `timeMax` - end of time range
- `singleEvents` - expand recurring events
- `orderBy` - sort by startTime

**response:** list of calendar events

#### watch calendar changes (webhooks)
```
POST https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events/watch
```

set up webhook to receive real-time calendar change notifications.

#### create event (time blocking)
```
POST https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events
```

create blocked time for protected activities (lunch, movement, focus time).

### data we collect
- event id
- summary (title)
- start/end time
- attendees (email addresses)
- organizer
- recurring event info
- response status

### data we don't collect
- event descriptions (may contain sensitive info)
- attachments
- location details (except for walking meeting suggestions)

### rate limits
- 1,000,000 queries per day (more than sufficient)
- quota cost: 1 per read, 5 per write

### error handling
- token expiration → refresh token flow
- calendar not found → prompt re-authentication
- insufficient permissions → explain and request upgrade

---

## 2. anthropic claude api

### purpose
conversational intelligence for all duende ai features.

### authentication
**api key** in headers: `x-api-key: {ANTHROPIC_API_KEY}`

### model
**claude-3-5-sonnet-20241022** (or latest)
- good balance of intelligence and cost
- excellent at conversational tone
- strong instruction following

### use cases

#### 1. onboarding conversation
**system prompt:**
```
you are duende, a caring ai that helps humans protect their default
settings. you're having a warm, conversational onboarding chat to
learn about the user's preferences for movement, nutrition,
relationships, stress, and transcendence. be warm, lowercase,
never clinical. ask one thing at a time.
```

**output:** conversational responses + structured data extraction

#### 2. intention generation (sunday planning)
**input:** calendar data for upcoming week
**output:** json array of proposed intentions

```json
[
  {
    "defaultSetting": "movement",
    "description": "30-minute walk tuesday or wednesday",
    "reasoning": "you have 18 hours of meetings this week. movement will help.",
    "flexible": true,
    "weatherDependent": true
  }
]
```

#### 3. suggestion generation
**input:** calendar event + user context + patterns
**output:** suggestion object with draft message

```json
{
  "type": "async",
  "reasoning": "you've been in meetings for 4 hours...",
  "draftMessage": "hi [name], duende noticed...",
  "teaching": "your brain processes info like your stomach processes food..."
}
```

#### 4. morning brief generation
**input:** today's calendar + intentions + weather + teaching
**output:** warm, concise brief text

#### 5. conversational learning
**input:** user message + conversation history + current settings
**output:** response + extracted preferences/changes

### rate limits
- tier 2: 1,000 requests per minute
- monitor usage to stay within budget

### cost management
- cache system prompts when possible
- use smaller haiku model for simple tasks
- batch similar requests

### error handling
- api timeout → retry with exponential backoff
- rate limit → queue and delay
- invalid response → fallback to template

---

## 3. openweathermap api

### purpose
weather-aware suggestions for outdoor activities.

### authentication
**api key** in query params: `?appid={OPENWEATHER_API_KEY}`

### plan
**free tier** sufficient for mvp
- 1,000 calls per day
- 60 calls per minute

### endpoints used

#### current weather
```
GET https://api.openweathermap.org/data/2.5/weather
?q={city}
&units=imperial
&appid={key}
```

**response:**
- temperature
- weather condition (clear, rain, clouds, etc.)
- wind speed
- humidity

#### 5-day forecast
```
GET https://api.openweathermap.org/data/2.5/forecast
?q={city}
&units=imperial
&appid={key}
```

**response:** forecast data every 3 hours for 5 days

### use cases
- sunday planning: check week's weather for outdoor intentions
- daily brief: include today's conditions
- real-time suggestions: "it's 68° and sunny - good for a walk"
- reschedule outdoor plans when rain expected

### caching strategy
- cache current weather for 30 minutes
- cache forecast for 3 hours
- refresh per user's location

### error handling
- api failure → skip weather mentions gracefully
- invalid location → use timezone-based fallback

---

## 4. email delivery (resend or sendgrid)

### purpose
send morning briefs and notifications.

### option a: resend (recommended)
**why:** modern, developer-friendly, generous free tier

**free tier:**
- 3,000 emails per month
- 100 emails per day

**authentication:** api key

**endpoint:**
```
POST https://api.resend.com/emails
```

**payload:**
```json
{
  "from": "duende@yourdomain.com",
  "to": "user@email.com",
  "subject": "good morning",
  "html": "<p>your morning brief...</p>"
}
```

### option b: sendgrid
**free tier:**
- 100 emails per day

**authentication:** api key

**endpoint:**
```
POST https://api.sendgrid.com/v3/mail/send
```

### email templates
- morning brief (html + plain text)
- sunday planning ritual
- suggestion notifications (optional)
- weekly summary (future)

### deliverability
- authenticate domain with spf/dkim
- monitor bounce rates
- unsubscribe link (required)
- clear sender identity

### batching strategy
- queue morning briefs for different timezones
- send in batches to avoid rate limits
- respect user's notification preferences

---

## 5. future integrations (post-mvp)

### microsoft outlook
similar to google calendar for microsoft 365 users.

### slack
- status sync ("in protected time")
- dm delivery for suggestions
- meeting rescheduling via slack

### apple health / google fit
optional movement data to improve suggestions.

### notion / linear
protect time for specific projects.

---

## integration testing

### google calendar
- test oauth flow
- test calendar read
- test time blocking (write)
- test webhook subscription

### claude api
- test conversation flow
- test json output parsing
- test error handling
- monitor token usage

### weather api
- test current weather
- test forecast
- test caching
- test invalid location handling

### email delivery
- test html rendering
- test timezone handling
- test unsubscribe flow
- monitor delivery rates

---

## environment variables

```bash
# google calendar
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI=""

# claude api
ANTHROPIC_API_KEY=""

# weather
OPENWEATHER_API_KEY=""

# email
RESEND_API_KEY=""
# or
SENDGRID_API_KEY=""

# next-auth
NEXTAUTH_URL=""
NEXTAUTH_SECRET=""
```

---

## security best practices

1. **never commit api keys** - use environment variables
2. **rotate keys regularly** - especially if exposed
3. **use minimum required scopes** - don't over-request permissions
4. **validate webhook signatures** - for google calendar webhooks
5. **rate limit api calls** - prevent abuse and control costs
6. **encrypt sensitive tokens** - google refresh tokens in database
7. **audit api usage** - monitor for unusual patterns
