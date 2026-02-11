'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import WeekCalendar from '@/components/planning/WeekCalendar';

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

interface DomainAnswers {
  intentions: string;
  movement: string;
  nutrition: string;
  relationships: string;
  stress: string;
  transcendence: string;
  excludePeople: string;
}

export default function PlanningPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [answers, setAnswers] = useState<DomainAnswers>({
    intentions: '',
    movement: '',
    nutrition: '',
    relationships: '',
    stress: '',
    transcendence: '',
    excludePeople: '',
  });
  const [calendarBlocks, setCalendarBlocks] = useState<CalendarBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showCalendarOverlay, setShowCalendarOverlay] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [demoEmails, setDemoEmails] = useState({
    heavyTuesday: true,
    sarahAgreed: false,
    sundayPlanning: true,
  });

  useEffect(() => {
    // Wait for session to load
    if (status === 'loading') return;

    // Load saved data and calendar events
    if (session?.user?.id) {
      loadSavedDataAndEvents();
    } else {
      setIsLoading(false);
    }
  }, [session, status]);

  const loadSavedDataAndEvents = async () => {
    const userId = session?.user?.id;

    if (!userId) {
      setIsLoading(false);
      return;
    }

    // Try to load from database first if user is logged in
    if (userId) {
      try {
        const response = await fetch(`/api/planning/load?userId=${userId}`);
        const data = await response.json();

        if (data.success && data.hasExistingData) {
          // Load saved planning data from database
          setAnswers(prev => ({ ...prev, ...data.answers }));

          // Load calendar events and merge with saved protections
          await loadCalendarEvents(data.protectionBlocks);
          setHasGenerated(true);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('Could not load saved planning data:', error);
      }
    }

    // Fallback to localStorage
    const savedAnswers = localStorage.getItem('duende_planning_answers');
    if (savedAnswers) {
      const parsed = JSON.parse(savedAnswers);
      setAnswers(prev => ({ ...prev, ...parsed }));
    }

    // Load calendar events (real or dummy)
    await loadCalendarEvents();
    setIsLoading(false);
  };

  const loadCalendarEvents = async (savedProtections: CalendarBlock[] = []) => {
    // Check if user has connected calendar
    const userId = session?.user?.id;

    if (userId) {
      try {
        // Fetch real calendar events
        const response = await fetch(`/api/calendar/events?userId=${userId}`);
        const data = await response.json();

        if (data.success && data.events) {
          const formattedEvents = formatGoogleCalendarEvents(data.events);
          // Merge with saved protections if provided
          setCalendarBlocks([...formattedEvents, ...savedProtections]);
          return;
        }
      } catch (error) {
        console.log('Could not fetch calendar events, showing dummy data', error);
      }
    }

    // Fallback to dummy data if calendar not connected
    generateExistingMeetings();
  };

  const formatGoogleCalendarEvents = (events: any[]): CalendarBlock[] => {
    return events.map(event => {
      const startDate = new Date(event.startTime);
      const endDate = new Date(event.endTime);

      // Get day name
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = dayNames[startDate.getDay()];

      // Format time as HH:MM
      const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };

      return {
        id: event.id,
        type: 'existing',
        title: event.title,
        day: dayName,
        startTime: formatTime(startDate),
        endTime: formatTime(endDate),
        color: '#9ca3af',
      };
    });
  };

  const generateExistingMeetings = () => {
    const existingMeetings: CalendarBlock[] = [
      {
        id: 'meeting-1',
        type: 'existing',
        title: 'Team Sync',
        day: 'Monday',
        startTime: '10:00',
        endTime: '11:00',
        color: '#9ca3af',
      },
      {
        id: 'meeting-2',
        type: 'existing',
        title: 'Investment Review',
        day: 'Tuesday',
        startTime: '14:00',
        endTime: '15:30',
        color: '#9ca3af',
      },
      {
        id: 'meeting-3',
        type: 'existing',
        title: 'Client Call',
        day: 'Wednesday',
        startTime: '11:00',
        endTime: '12:00',
        color: '#9ca3af',
      },
      {
        id: 'meeting-4',
        type: 'existing',
        title: 'Sprint Planning',
        day: 'Thursday',
        startTime: '10:00',
        endTime: '11:30',
        color: '#9ca3af',
      },
      {
        id: 'meeting-5',
        type: 'existing',
        title: '1:1 with Manager',
        day: 'Friday',
        startTime: '15:00',
        endTime: '15:30',
        color: '#9ca3af',
      },
    ];

    setCalendarBlocks(existingMeetings);
  };

  const generateProtections = () => {
    const protections: CalendarBlock[] = [];

    // Movement protection
    if (answers.movement.trim()) {
      protections.push({
        id: 'duende-movement',
        type: 'proposed',
        title: answers.movement.includes('walk') ? '30min Walk' :
               answers.movement.includes('run') ? '30min Run' :
               answers.movement.includes('yoga') ? 'Yoga Session' :
               answers.movement.includes('stretch') ? 'Stretch Break' : 'Movement Time',
        day: 'Tuesday',
        startTime: '12:00',
        endTime: '12:30',
        color: '#fb923c', // orange-400
        setting: 'movement',
      });
    }

    // Nutrition protection
    if (answers.nutrition.trim()) {
      const lunchTime = answers.nutrition.includes('12') ? '12:00' :
                       answers.nutrition.includes('1') || answers.nutrition.includes('13') ? '13:00' : '12:30';
      protections.push({
        id: 'duende-nutrition',
        type: 'proposed',
        title: 'Protected Lunch',
        day: 'Thursday',
        startTime: lunchTime,
        endTime: `${parseInt(lunchTime.split(':')[0]) + 1}:00`,
        color: '#4ade80', // green-400
        setting: 'nutrition',
      });
    }

    // Relationships protection
    if (answers.relationships.trim()) {
      const names = answers.relationships.split(',').map(n => n.trim()).filter(n => n);
      if (names.length > 0) {
        protections.push({
          id: 'duende-relationships',
          type: 'proposed',
          title: `Coffee with ${names[0]}`,
          day: 'Wednesday',
          startTime: '15:00',
          endTime: '16:00',
          color: '#f472b6', // pink-400
          setting: 'relationships',
        });
      }
    }

    // Stress protection (buffers are handled differently, not shown as blocks)
    // Could add visual indicators between meetings instead

    // Transcendence protection
    if (answers.transcendence.trim()) {
      const truncated = answers.transcendence.length > 20
        ? answers.transcendence.substring(0, 20) + '...'
        : answers.transcendence;
      protections.push({
        id: 'duende-transcendence',
        type: 'proposed',
        title: 'Deep Work: ' + truncated,
        day: 'Friday',
        startTime: '14:00',
        endTime: '16:00',
        color: '#fbbf24', // amber-400
        setting: 'transcendence',
      });
    }

    // Combine existing meetings with protections
    setCalendarBlocks(prev => {
      const existingOnly = prev.filter(b => b.type === 'existing');
      return [...existingOnly, ...protections];
    });
  };

  const handleAnswerChange = (domain: keyof DomainAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [domain]: value }));
  };

  const handleGenerateProtections = () => {
    generateProtections();
    setHasGenerated(true);
    setShowCalendarOverlay(false);
    // Save answers to localStorage
    localStorage.setItem('duende_planning_answers', JSON.stringify(answers));
    // Scroll to calendar section
    setTimeout(() => {
      const calendarSection = document.querySelector('.week-calendar-section');
      calendarSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleProtectTime = () => {
    // Add a walk protection to Tuesday at noon
    const newProtection: CalendarBlock = {
      id: 'demo-walk',
      type: 'proposed',
      title: '30min Walk',
      day: 'Tuesday',
      startTime: '12:00',
      endTime: '12:30',
      color: '#fb923c',
      setting: 'movement',
    };

    setCalendarBlocks(prev => {
      // Remove if already exists
      const filtered = prev.filter(b => b.id !== 'demo-walk');
      return [...filtered, newProtection];
    });

    // Hide the alert email and show the confirmation email
    setDemoEmails(prev => ({
      ...prev,
      heavyTuesday: false,
      sarahAgreed: true,
    }));

    setSyncMessage('✓ protection suggested - drag the walk block on your calendar to adjust timing');
    setTimeout(() => setSyncMessage(''), 5000);
  };

  const handleSkipProtection = () => {
    setDemoEmails(prev => ({
      ...prev,
      heavyTuesday: false,
    }));
  };

  const handleReviewProtections = () => {
    // Scroll to calendar section
    const calendarSection = document.querySelector('.week-calendar-section');
    calendarSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSyncToCalendar = async () => {
    const userId = session?.user?.id;
    const protections = calendarBlocks.filter(b => b.type === 'proposed');

    // Save to localStorage as backup
    localStorage.setItem('duende_calendar_blocks', JSON.stringify(protections));

    // If user is logged in, try to sync directly
    if (userId) {
      setIsSyncing(true);
      setSyncMessage('syncing to your calendar...');

      try {
        // First save to database
        await fetch('/api/planning/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            answers,
            protectionBlocks: protections,
          }),
        });

        // Then sync to Google Calendar
        const syncResponse = await fetch('/api/calendar/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, protectionBlocks: protections }),
        });

        const syncData = await syncResponse.json();

        if (syncData.success) {
          setSyncMessage(`✓ ${syncData.count} protections synced to your calendar!`);
          setTimeout(() => setSyncMessage(''), 5000);
        } else {
          setSyncMessage(`sync failed: ${syncData.error}`);
          setTimeout(() => setSyncMessage(''), 5000);
        }
      } catch (error) {
        console.error('Error syncing:', error);
        setSyncMessage('sync failed - try again from settings');
        setTimeout(() => setSyncMessage(''), 5000);
      } finally {
        setIsSyncing(false);
      }
    } else {
      // Redirect to onboarding to collect email and connect calendar
      router.push('/onboarding');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-royal-500">preparing your week...</p>
      </div>
    );
  }

  const protectionCount = calendarBlocks.filter(b => b.type === 'proposed').length;

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-cloud-300 to-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo.svg" alt="duende" width={50} height={50} priority className="cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-3xl font-serif text-royal-500">plan your week</h1>
              <p className="text-royal-600 text-sm">duende will advocate for what makes you human</p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <Card>
          <p className="text-royal-500 leading-relaxed">
            answer these questions and click generate to see your protections appear on the calendar below. duende will automatically send emails to protect your time. you can exclude specific people below.
          </p>
        </Card>

        {/* Domain Questions */}
        <div className="space-y-4">
          <h2 className="text-xl font-serif text-royal-500">plan your week</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Intentions for the week */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300">
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-purple-700 mb-1 font-semibold">this week</p>
                  <p className="text-sm text-royal-600 mb-3">
                    what do you want to accomplish or focus on this week?
                  </p>
                </div>
                <Input
                  placeholder="e.g., finish the proposal, be more present"
                  value={answers.intentions || ''}
                  onChange={(e) => handleAnswerChange('intentions', e.target.value)}
                />
              </div>
            </Card>

            {/* Movement */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300">
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-orange-700 mb-1 font-semibold">movement</p>
                  <p className="text-sm text-royal-600 mb-3">
                    how do you like to move your body?
                  </p>
                </div>
                <Input
                  placeholder="e.g., walk, run, yoga, stretch"
                  value={answers.movement || ''}
                  onChange={(e) => handleAnswerChange('movement', e.target.value)}
                />
              </div>
            </Card>

            {/* Nutrition */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-300">
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-green-700 mb-1 font-semibold">nutrition</p>
                  <p className="text-sm text-royal-600 mb-3">
                    when do you want to protect lunch?
                  </p>
                </div>
                <Input
                  placeholder="e.g., 12:30pm, 1pm"
                  value={answers.nutrition || ''}
                  onChange={(e) => handleAnswerChange('nutrition', e.target.value)}
                />
              </div>
            </Card>

            {/* Relationships */}
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-300">
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-pink-700 mb-1 font-semibold">relationships</p>
                  <p className="text-sm text-royal-600 mb-3">
                    who do you want to stay connected with?
                  </p>
                </div>
                <Input
                  placeholder="e.g., sarah, mike, alex"
                  value={answers.relationships || ''}
                  onChange={(e) => handleAnswerChange('relationships', e.target.value)}
                />
              </div>
            </Card>

            {/* Stress */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300">
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-blue-700 mb-1 font-semibold">buffers</p>
                  <p className="text-sm text-royal-600 mb-3">
                    how much breathing room between meetings?
                  </p>
                </div>
                <Input
                  placeholder="e.g., 10 minutes, 15 minutes"
                  value={answers.stress || ''}
                  onChange={(e) => handleAnswerChange('stress', e.target.value)}
                />
              </div>
            </Card>

            {/* Transcendence */}
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300">
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-amber-700 mb-1 font-semibold">growth</p>
                  <p className="text-sm text-royal-600 mb-3">
                    what are you learning or building?
                  </p>
                </div>
                <Input
                  placeholder="e.g., side project, learning spanish"
                  value={answers.transcendence || ''}
                  onChange={(e) => handleAnswerChange('transcendence', e.target.value)}
                />
              </div>
            </Card>
          </div>

          {/* Generate button */}
          <div className="flex justify-center pt-2">
            <Button
              onClick={handleGenerateProtections}
              disabled={!answers.intentions && !answers.movement && !answers.nutrition && !answers.relationships && !answers.transcendence}
              className="bg-royal-500 hover:bg-royal-600 text-white disabled:bg-royal-300"
              size="lg"
            >
              {hasGenerated ? 'regenerate protections' : 'generate protections'}
            </Button>
          </div>
        </div>

        {/* Calendar Visualization */}
        <div className="space-y-4 week-calendar-section">
          <h2 className="text-xl font-serif text-royal-500">your week with protections</h2>
          <div className="relative">
            {showCalendarOverlay && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl">
                <p className="text-center text-royal-600 text-lg font-medium px-8">
                  answer the que––stions above and click generate to see your protections appear here
                </p>
              </div>
            )}
            <div className={showCalendarOverlay ? 'opacity-100' : ''}>
              <WeekCalendar
                blocks={calendarBlocks}
                onBlocksChange={setCalendarBlocks}
              />
            </div>
          </div>
        </div>

        {/* Sync Message */}
        {syncMessage && (
          <Card className="bg-orange-50 border-orange-200">
            <p className="text-royal-500 text-center">{syncMessage}</p>
          </Card>
        )}

        {/* Connect Calendar */}
        <Card className="bg-royal-500 border-royal-500">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-2xl font-serif font-light mb-1">
                {protectionCount} {protectionCount === 1 ? 'protection' : 'protections'} ready
              </p>
              <p className="text-sm opacity-90">
                {protectionCount === 0
                  ? 'answer questions above to see your protections'
                  : 'drag blocks to adjust timing, then sync to your calendar'}
              </p>
            </div>
            <Button
              onClick={handleSyncToCalendar}
              disabled={protectionCount === 0 || isSyncing}
              className="bg-orange-500 hover:bg-orange-600 text-white disabled:bg-orange-300"
              size="lg"
            >
              {isSyncing ? 'syncing...' : 'sync to your google calendar'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
