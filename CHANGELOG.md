# changelog

all notable changes to duende will be documented in this file.

## [0.2.0] - 2026-01-23

### added - planning mvp complete

#### landing page
- comprehensive marketing page with ai advocacy framing
- "pronounced dwen-day" with meaning explanation
- how it works section (3 steps)
- calendar visualization showing example week
- 3 ai advocacy scenarios showing both perspectives
- five default settings with nervous system explanations
- philosophy section (humanity tool not productivity tool)

#### planning page (core feature)
- 6 domain questions with distinct color-coded cards:
  - purple: this week's intentions
  - orange: movement preferences
  - green: nutrition (protected lunch)
  - pink: relationships (connection)
  - blue: buffers (stress management)
  - amber: growth (transcendence)
- exclude people input field (who duende won't email)
- "generate protections" button workflow
- interactive week/month calendar with drag-drop
- real-time protection block generation
- email examples section:
  - outbound: what duende sends to others on your behalf
  - inbound: threshold alerts and confirmations you receive
- save planning data to localStorage
- "connect calendar" CTA that flows to onboarding

#### onboarding simplified
- reduced from 8-step conversation to 2-field form
- email and city only (weather-aware suggestions)
- displays protection count from planning
- google calendar oauth integration
- passes planning data from localStorage to database
- redirects to settings after successful connection

#### settings page
- calendar connection status display
- manual "sync calendar" button
- user profile information
- navigation back to planning

#### technical infrastructure
- next.js 15 with app router and react 19
- typescript for type safety
- tailwind css with custom royal blue and orange palette
- prisma orm with postgresql
- google calendar api oauth (read-only for now)
- reusable ui components:
  - `Card` component for content containers
  - `Button` component with variants and sizes
  - `Input` component for form fields
- `WeekCalendar` drag-drop component:
  - week and month view toggle
  - drag proposed blocks to adjust timing
  - existing meetings shown but not draggable
  - color-coded by protection type
  - visual feedback on hover and drag states

### changed
- **flow redesign**: landing → planning → onboarding → settings
  - show value first before asking for signup
  - let users explore planning without account
  - reduce friction in onboarding
- **onboarding simplified**: from conversation to form
  - collect minimal data upfront
  - learn preferences from planning page instead
- **renamed dashboard to settings**: more accurate description
- **no daily briefs**: switched to threshold-based interventions only
- **color palette**: from cream/sage/terracotta to royal blue/orange
  - royal blue (#00239D) primary
  - orange (#FF5C00) actions
  - cloud dancer (#F4F3EE) backgrounds

### removed
- 8-step conversational onboarding flow
- morning brief page (no daily emails)
- form-based preference collection
- dashboard terminology

---

## [0.1.0] - 2026-01-15

### added - initial setup

#### project foundation
- next.js 15 project initialized
- typescript configuration
- tailwind css setup with initial color palette
- prisma orm configured
- postgresql database schema designed

#### database models
- `User` - authentication and calendar integration
- `UserSettings` - five default settings preferences
- `Relationship` - close people tracking
- `Intention` - weekly planning intentions
- `Suggestion` - ai advocacy suggestions
- `CalendarEvent` - cached calendar data
- `ConversationMessage` - learning history
- `TeachingHistory` - educational content tracking

#### initial documentation
- README with project overview
- specs/01-features.md - feature specifications
- specs/02-architecture.md - technical architecture
- specs/03-integrations.md - api integrations
- specs/04-data-models.md - database design
- specs/05-onboarding.md - conversational onboarding flow
- specs/06-ai-layer.md - ai advocacy layer design
- GOOGLE_CALENDAR_SETUP.md - oauth setup guide

#### core concepts established
- five default settings framework (sinan canan)
- threshold-based intervention model
- "ai takes the blame" advocacy principle
- no scoring or tracking visible to users

---

## [unreleased] - planned for v1.0

### to implement

#### calendar integration
- read user's actual google calendar events
- display real meetings in planning view
- write protection blocks to google calendar
- real-time sync on drag-drop changes
- refresh token management

#### threshold detection
- analyze calendar patterns every 30 minutes
- detect violations:
  - too many meetings (over user's limit)
  - no protected lunch
  - sitting too long (no movement breaks)
  - missing connections with close people
  - no growth time blocked
- calculate intervention timing
- generate context-aware suggestions

#### ai message generation
- integrate anthropic claude api
- draft advocacy emails:
  - to others: "duende here for [user]..."
  - explain why reschedule/shorten/async needed
  - frame as beneficial for both parties
- personalize to user's communication style
- context-aware based on situation and relationships

#### email delivery
- resend or sendgrid integration
- transactional email templates
- threshold alert emails to user (with yes/no buttons)
- advocacy emails to others (on user approval)
- webhook handling for email responses
- email tracking (opens, clicks, responses)

#### weather integration
- openweathermap api integration
- weather-aware outdoor movement suggestions
- forecast data for weekly planning
- real-time conditions for day-of suggestions
- seasonal awareness

#### relationship features
- save relationships from planning answers
- track last connection dates
- calculate connection frequency
- suggest reconnection moments
- energy impact tracking

#### data persistence
- save planning answers to database (not localStorage)
- save generated protections
- load previous protections on return
- edit/adjust protections after initial generation

---

## version history

- **0.2.0** (2026-01-23) - planning mvp complete
- **0.1.0** (2026-01-15) - initial project setup

---

## future roadmap

### v1.0 - full ai advocacy (target: february 2026)
- complete google calendar integration
- threshold detection and analysis
- claude-powered message generation
- email delivery and response handling
- weather-aware suggestions

### v2.0 - enhanced intelligence (target: q2 2026)
- conversational learning interface
- relationship tracking and nudges
- emergency brake feature
- mid-week check-ins
- two-person coordination

### v3.0 - team features (target: q3 2026)
- b2b offering for organizations
- team-wide default settings
- slack/teams integration
- company calendar optimization
- admin dashboard

---

*for detailed progress tracking, see [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md)*
