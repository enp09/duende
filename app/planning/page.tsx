'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import WeekCalendar from '@/components/planning/WeekCalendar';

interface IntentionProposal {
  id: string;
  defaultSetting: string;
  description: string;
  reasoning: string;
  targetDay?: string;
  requiresWeather: boolean;
  status: 'pending' | 'accepted' | 'dismissed';
}

interface CalendarBlock {
  id: string;
  type: 'existing' | 'proposed';
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
  setting?: string;
  intention?: string;
}

export default function PlanningPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [intentions, setIntentions] = useState<IntentionProposal[]>([]);
  const [calendarBlocks, setCalendarBlocks] = useState<CalendarBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualIntention, setManualIntention] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('duende_user_id');
    if (!storedUserId) {
      router.push('/onboarding');
      return;
    }
    setUserId(storedUserId);

    // Generate intentions and calendar blocks
    generateIntentions();
    generateCalendarBlocks();
  }, [router]);

  const generateIntentions = () => {
    const sampleIntentions: IntentionProposal[] = [
      {
        id: '1',
        defaultSetting: 'movement',
        description: '30 minute walk on tuesday or wednesday',
        reasoning: 'weather looks nice midweek. good opportunity to move outside and reset.',
        targetDay: 'Tuesday',
        requiresWeather: true,
        status: 'pending',
      },
      {
        id: '2',
        defaultSetting: 'nutrition',
        description: 'protected lunch thursday',
        reasoning: 'thursday tends to be your heaviest meeting day. protecting lunch helps you stay grounded.',
        targetDay: 'Thursday',
        requiresWeather: false,
        status: 'pending',
      },
      {
        id: '3',
        defaultSetting: 'relationships',
        description: 'coffee with sarah wednesday afternoon',
        reasoning: 'staying connected with people who matter keeps your nervous system regulated.',
        targetDay: 'Wednesday',
        requiresWeather: false,
        status: 'pending',
      },
      {
        id: '4',
        defaultSetting: 'stress',
        description: 'add 10 minute buffers between meetings',
        reasoning: 'back to back meetings keep you in fight or flight. buffers signal safety to your body.',
        requiresWeather: false,
        status: 'pending',
      },
      {
        id: '5',
        defaultSetting: 'transcendence',
        description: '2 hours friday afternoon for passion project',
        reasoning: 'growth happens at edges. friday afternoon when meetings are lighter is perfect for becoming.',
        targetDay: 'Friday',
        requiresWeather: false,
        status: 'pending',
      },
    ];

    setIntentions(sampleIntentions);
    setIsLoading(false);
  };

  const generateCalendarBlocks = () => {
    // Sample existing meetings and proposed blocks
    const blocks: CalendarBlock[] = [
      // Existing meetings
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
      // Movement
      {
        id: 'duende-1',
        type: 'proposed',
        title: '30min Walk',
        day: 'Tuesday',
        startTime: '12:00',
        endTime: '12:30',
        color: '#FF5C00',
        setting: 'movement',
        intention: '30 minute walk on tuesday or wednesday'
      },
      // Nutrition
      {
        id: 'duende-2',
        type: 'proposed',
        title: 'Protected Lunch',
        day: 'Thursday',
        startTime: '12:30',
        endTime: '13:30',
        color: '#00239D',
        setting: 'nutrition',
        intention: 'protected lunch thursday'
      },
      // Relationships
      {
        id: 'duende-3',
        type: 'proposed',
        title: 'Coffee with Sarah',
        day: 'Wednesday',
        startTime: '15:00',
        endTime: '16:00',
        color: '#FF5C00',
        setting: 'relationships',
        intention: 'coffee with sarah wednesday afternoon'
      },
      // Transcendence
      {
        id: 'duende-4',
        type: 'proposed',
        title: 'Deep Work: Side Project',
        day: 'Friday',
        startTime: '14:00',
        endTime: '16:00',
        color: '#FF5C00',
        setting: 'transcendence',
        intention: '2 hours friday afternoon for passion project'
      },
    ];

    setCalendarBlocks(blocks);
  };

  const handleIntentionAction = (id: string, action: 'accepted' | 'dismissed') => {
    setIntentions(prev =>
      prev.map(i => (i.id === id ? { ...i, status: action } : i))
    );
  };

  const handleAddManualIntention = () => {
    if (!manualIntention.trim()) return;

    const newIntention: IntentionProposal = {
      id: `manual-${Date.now()}`,
      defaultSetting: 'movement', // Could be selected by user
      description: manualIntention,
      reasoning: 'added manually',
      requiresWeather: false,
      status: 'accepted',
    };

    setIntentions(prev => [...prev, newIntention]);
    setManualIntention('');
    setShowManualInput(false);
  };

  const handleSave = async () => {
    if (!userId) return;

    setIsSaving(true);

    const acceptedIntentions = intentions.filter(i => i.status === 'accepted');

    try {
      const response = await fetch('/api/planning/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          intentions: acceptedIntentions,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // TODO: Sync calendar blocks to Google Calendar here
        router.push('/settings');
      } else {
        alert('failed to save intentions');
        setIsSaving(false);
      }
    } catch (error) {
      console.error('Error saving intentions:', error);
      alert('something went wrong');
      setIsSaving(false);
    }
  };

  const getDefaultSettingColor = (setting: string) => {
    switch (setting) {
      case 'movement':
      case 'relationships':
      case 'transcendence':
        return 'bg-orange-50 border-orange-200';
      case 'nutrition':
      case 'stress':
        return 'bg-royal-50 border-royal-200';
      default:
        return 'bg-cloud-100 border-royal-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-royal-500">preparing your week...</p>
      </div>
    );
  }

  const acceptedCount = intentions.filter(i => i.status === 'accepted').length;

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-cloud-300 to-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/settings">
              <Image src="/logo.svg" alt="duende" width={50} height={50} priority className="cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-3xl font-serif text-royal-500">sunday planning</h1>
              <p className="text-royal-600 text-sm">setting intentions for your week</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => router.push('/settings')}>
            settings
          </Button>
        </div>

        {/* Intro */}
        <Card>
          <p className="text-royal-500 leading-relaxed">
            duende analyzed your calendar and proposes these protections. review, adjust timing in the calendar below, or add your own intentions.
          </p>
        </Card>

        {/* Intention Proposals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-royal-500">duende suggests</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowManualInput(!showManualInput)}
            >
              + add your own
            </Button>
          </div>

          {showManualInput && (
            <Card>
              <div className="space-y-3">
                <Input
                  placeholder="e.g., 'protect lunch tuesday' or '2hr deep work friday morning'"
                  value={manualIntention}
                  onChange={(e) => setManualIntention(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddManualIntention()}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddManualIntention}>
                    add intention
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowManualInput(false)}>
                    cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {intentions.map((intention) => (
              <Card
                key={intention.id}
                className={`${getDefaultSettingColor(intention.defaultSetting)} ${
                  intention.status === 'dismissed' ? 'opacity-50' : ''
                }`}
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-royal-600 mb-1">
                      {intention.defaultSetting}
                    </p>
                    <p className="text-base text-royal-500 font-medium">
                      {intention.description}
                    </p>
                  </div>

                  <p className="text-sm text-royal-600">{intention.reasoning}</p>

                  {intention.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleIntentionAction(intention.id, 'accepted')}
                        size="sm"
                      >
                        yes
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleIntentionAction(intention.id, 'dismissed')}
                        size="sm"
                      >
                        skip
                      </Button>
                    </div>
                  )}

                  {intention.status === 'accepted' && (
                    <p className="text-sm text-orange-600 font-medium">✓ accepted</p>
                  )}

                  {intention.status === 'dismissed' && (
                    <p className="text-sm text-royal-400">skipped</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Calendar Visualization */}
        <div className="space-y-4">
          <h2 className="text-xl font-serif text-royal-500">visualize your week</h2>
          <WeekCalendar
            blocks={calendarBlocks}
            onBlocksChange={setCalendarBlocks}
          />
        </div>

        {/* Confirm */}
        <Card className="bg-royal-500 border-royal-500">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-2xl font-serif font-light mb-1">
                {acceptedCount} {acceptedCount === 1 ? 'protection' : 'protections'} ready
              </p>
              <p className="text-sm opacity-90">drag blocks to adjust, then sync to google calendar</p>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving || acceptedCount === 0}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              size="lg"
            >
              {isSaving ? 'syncing...' : 'confirm + sync to calendar'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
