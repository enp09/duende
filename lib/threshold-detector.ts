import { prisma } from './db';

interface CalendarEvent {
  id: string;
  title: string | null;
  startTime: Date;
  endTime: Date;
  isAllDay: boolean;
  attendees: any;
}

interface UserSettings {
  maxMeetingHoursPerDay?: number | null;
  wantsProtectedLunch?: boolean | null;
  preferredLunchTime?: string | null;
  wantsBufferTime?: boolean | null;
  bufferMinutes?: number | null;
}

interface Violation {
  type: string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  affectedEvents?: string[];
  suggestedAction?: string;
  defaultSetting: string;
}

export class ThresholdDetector {
  private userId: string;
  private events: CalendarEvent[];
  private settings: UserSettings;

  constructor(userId: string, events: CalendarEvent[], settings: UserSettings) {
    this.userId = userId;
    this.events = events;
    this.settings = settings;
  }

  /**
   * Main method to detect all violations
   */
  async detectViolations(): Promise<Violation[]> {
    const violations: Violation[] = [];

    // Sort events by start time
    const sortedEvents = this.events.sort((a, b) =>
      a.startTime.getTime() - b.startTime.getTime()
    );

    // Group events by day
    const eventsByDay = this.groupEventsByDay(sortedEvents);

    // Run detection checks
    for (const [day, dayEvents] of Object.entries(eventsByDay)) {
      violations.push(...this.detectTooManyMeetings(day, dayEvents));
      violations.push(...this.detectNoLunch(day, dayEvents));
      violations.push(...this.detectNoMovement(day, dayEvents));
      violations.push(...this.detectMissingBuffers(day, dayEvents));
    }

    return violations.filter(v => v !== null);
  }

  /**
   * Group events by day (YYYY-MM-DD)
   */
  private groupEventsByDay(events: CalendarEvent[]): Record<string, CalendarEvent[]> {
    const grouped: Record<string, CalendarEvent[]> = {};

    for (const event of events) {
      if (event.isAllDay) continue;

      const day = event.startTime.toISOString().split('T')[0];
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(event);
    }

    return grouped;
  }

  /**
   * Detect if user has too many meetings in a day
   */
  private detectTooManyMeetings(day: string, events: CalendarEvent[]): Violation[] {
    const violations: Violation[] = [];
    const maxHours = this.settings.maxMeetingHoursPerDay || 6;

    // Calculate total meeting hours
    let totalMinutes = 0;
    const meetingTitles: string[] = [];

    for (const event of events) {
      const duration = (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60);
      totalMinutes += duration;
      meetingTitles.push(event.title || 'Untitled');
    }

    const totalHours = totalMinutes / 60;

    if (totalHours > maxHours) {
      const dayName = new Date(day).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

      violations.push({
        type: 'too_many_meetings',
        severity: totalHours > maxHours + 2 ? 'high' : 'medium',
        title: `${totalHours.toFixed(1)} hours of meetings on ${dayName}`,
        description: `you have ${events.length} meetings scheduled for ${totalHours.toFixed(1)} hours. your threshold is ${maxHours} hours. extended meeting time keeps your sympathetic nervous system (fight-or-flight mode) active, preventing your body from recovering and processing information.`,
        affectedEvents: meetingTitles,
        suggestedAction: `cortisol (stress hormone) accumulates throughout the day without breaks. consider making 1-2 meetings async or rescheduling to spread the cognitive load.`,
        defaultSetting: 'stress',
      });
    }

    return violations;
  }

  /**
   * Detect if user has no protected lunch
   */
  private detectNoLunch(day: string, events: CalendarEvent[]): Violation[] {
    const violations: Violation[] = [];

    if (!this.settings.wantsProtectedLunch) return violations;

    const preferredLunchTime = this.settings.preferredLunchTime || '12:30';
    const [preferredHour, preferredMin] = preferredLunchTime.split(':').map(Number);

    // Check if there's a meeting during lunch window (11:30 - 14:00)
    const lunchStart = new Date(day);
    lunchStart.setHours(11, 30, 0, 0);
    const lunchEnd = new Date(day);
    lunchEnd.setHours(14, 0, 0, 0);

    const lunchMeetings = events.filter(event => {
      const eventStart = event.startTime.getTime();
      const eventEnd = event.endTime.getTime();

      // Check if event overlaps with lunch window
      return (
        (eventStart >= lunchStart.getTime() && eventStart < lunchEnd.getTime()) ||
        (eventEnd > lunchStart.getTime() && eventEnd <= lunchEnd.getTime()) ||
        (eventStart <= lunchStart.getTime() && eventEnd >= lunchEnd.getTime())
      );
    });

    if (lunchMeetings.length > 0) {
      const dayName = new Date(day).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

      violations.push({
        type: 'no_protected_lunch',
        severity: 'high',
        title: `lunch is blocked on ${dayName}`,
        description: `you have ${lunchMeetings.length} meeting(s) during lunch hours (11:30-14:00). eating at your desk keeps your body in stress mode - digestion and cognition compete for the same resources. the vagus nerve, which controls digestion, requires activation of the parasympathetic nervous system ("rest and digest" mode). this cannot happen while you're in a meeting.`,
        affectedEvents: lunchMeetings.map(e => e.title || 'Untitled'),
        suggestedAction: `even 30 minutes away from your desk helps your body shift from sympathetic to parasympathetic mode. move ${lunchMeetings[0].title} to 14:30 or make it async.`,
        defaultSetting: 'nutrition',
      });
    }

    return violations;
  }

  /**
   * Detect if user has no movement breaks
   */
  private detectNoMovement(day: string, events: CalendarEvent[]): Violation[] {
    const violations: Violation[] = [];

    // Check for long stretches without breaks (> 3 hours)
    let consecutiveMinutes = 0;
    let stretchStart: Date | null = null;
    const longStretches: { start: Date; end: Date; duration: number }[] = [];

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const nextEvent = events[i + 1];

      const eventDuration = (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60);

      if (!stretchStart) {
        stretchStart = event.startTime;
        consecutiveMinutes = eventDuration;
      } else {
        consecutiveMinutes += eventDuration;
      }

      // Check gap to next event
      if (nextEvent) {
        const gap = (nextEvent.startTime.getTime() - event.endTime.getTime()) / (1000 * 60);

        if (gap < 15) {
          // Less than 15 min gap, continue the stretch
          consecutiveMinutes += gap;
        } else {
          // 15+ min gap, end the stretch
          if (consecutiveMinutes > 180) { // 3 hours
            longStretches.push({
              start: stretchStart,
              end: event.endTime,
              duration: consecutiveMinutes,
            });
          }
          stretchStart = null;
          consecutiveMinutes = 0;
        }
      } else {
        // Last event
        if (consecutiveMinutes > 180) {
          longStretches.push({
            start: stretchStart,
            end: event.endTime,
            duration: consecutiveMinutes,
          });
        }
      }
    }

    if (longStretches.length > 0) {
      const dayName = new Date(day).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
      const longest = longStretches.reduce((a, b) => a.duration > b.duration ? a : b);

      violations.push({
        type: 'no_movement',
        severity: longest.duration > 240 ? 'high' : 'medium',
        title: `${Math.floor(longest.duration / 60)} hours without a break on ${dayName}`,
        description: `you have a stretch from ${this.formatTime(longest.start)} to ${this.formatTime(longest.end)} with no movement. your body and mind are one system - sitting for 3+ hours triggers the sympathetic nervous system (fight-or-flight mode), reducing cognitive function and emotional regulation. movement is how your brain processes emotions and stress.`,
        suggestedAction: `walking side by side makes hard conversations easier - less eye contact pressure, more blood flow to the brain. add a 15-minute walk or standing break around ${this.formatTime(new Date(longest.start.getTime() + (longest.duration / 2) * 60000))}.`,
        defaultSetting: 'movement',
      });
    }

    return violations;
  }

  /**
   * Detect missing buffers between meetings
   */
  private detectMissingBuffers(day: string, events: CalendarEvent[]): Violation[] {
    const violations: Violation[] = [];

    if (!this.settings.wantsBufferTime) return violations;

    const bufferMinutes = this.settings.bufferMinutes || 10;
    const backToBackMeetings: string[] = [];

    for (let i = 0; i < events.length - 1; i++) {
      const current = events[i];
      const next = events[i + 1];

      const gap = (next.startTime.getTime() - current.endTime.getTime()) / (1000 * 60);

      if (gap < bufferMinutes) {
        backToBackMeetings.push(`${current.title} → ${next.title}`);
      }
    }

    if (backToBackMeetings.length > 2) {
      const dayName = new Date(day).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

      violations.push({
        type: 'missing_buffers',
        severity: backToBackMeetings.length > 4 ? 'high' : 'medium',
        title: `${backToBackMeetings.length} back-to-back meetings on ${dayName}`,
        description: `you have ${backToBackMeetings.length} meetings with less than ${bufferMinutes} minutes between them. back-to-back meetings keep you in fight-or-flight mode all day. your nervous system needs transition time to process information and regulate stress hormones. cortisol takes time to metabolize - without breaks, it accumulates throughout the day, leading to decision fatigue and emotional dysregulation.`,
        affectedEvents: backToBackMeetings,
        suggestedAction: `10-15 minute buffers are not wasted time - they are recovery time. shorten some meetings by 5-10 minutes to create breathing room. use this time to walk, breathe, or simply stare out the window.`,
        defaultSetting: 'stress',
      });
    }

    return violations;
  }

  /**
   * Helper to format time
   */
  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}

/**
 * Main function to run threshold detection for a user
 */
export async function analyzeUserCalendar(userId: string): Promise<Violation[]> {
  // Fetch user with settings
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { settings: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Fetch calendar events for the next 7 days
  const now = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(now.getDate() + 7);

  const events = await prisma.calendarEvent.findMany({
    where: {
      userId,
      startTime: {
        gte: now,
        lte: weekFromNow,
      },
    },
    orderBy: {
      startTime: 'asc',
    },
  });

  // Run threshold detection
  const detector = new ThresholdDetector(
    userId,
    events,
    user.settings || {}
  );

  return await detector.detectViolations();
}
