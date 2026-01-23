'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface IntentionProposal {
  id: string;
  defaultSetting: string;
  description: string;
  reasoning: string;
  targetDay?: string;
  requiresWeather: boolean;
  status: 'pending' | 'accepted' | 'dismissed';
}

export default function PlanningPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [intentions, setIntentions] = useState<IntentionProposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('duende_user_id');
    if (!storedUserId) {
      router.push('/onboarding');
      return;
    }
    setUserId(storedUserId);

    // Generate intentions (in future this will analyze calendar)
    generateIntentions();
  }, [router]);

  const generateIntentions = () => {
    // For MVP, we'll generate sample intentions
    // Later this will be AI-powered based on actual calendar data
    const sampleIntentions: IntentionProposal[] = [
      {
        id: '1',
        defaultSetting: 'movement',
        description: '30 minute walk on tuesday or wednesday',
        reasoning: 'weather looks nice midweek. good opportunity to move outside and reset.',
        targetDay: 'tuesday',
        requiresWeather: true,
        status: 'pending',
      },
      {
        id: '2',
        defaultSetting: 'nutrition',
        description: 'protected lunch thursday',
        reasoning: 'thursday tends to be your heaviest meeting day. protecting lunch helps you stay grounded.',
        requiresWeather: false,
        status: 'pending',
      },
      {
        id: '3',
        defaultSetting: 'relationships',
        description: 'reach out to a close friend this week',
        reasoning: 'staying connected with people who matter keeps your nervous system regulated.',
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
        requiresWeather: false,
        status: 'pending',
      },
    ];

    setIntentions(sampleIntentions);
    setIsLoading(false);
  };

  const handleIntentionAction = (id: string, action: 'accepted' | 'dismissed') => {
    setIntentions(prev =>
      prev.map(i => (i.id === id ? { ...i, status: action } : i))
    );
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
        router.push('/dashboard');
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
        return 'bg-royal-50 border-royal-200';
      case 'nutrition':
        return 'bg-orange-50 border-orange-200';
      case 'relationships':
        return 'bg-royal-50 border-royal-200';
      case 'stress':
        return 'bg-orange-50 border-orange-200';
      case 'transcendence':
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Image src="/logo.svg" alt="duende" width={50} height={50} priority />
          <div>
            <h1 className="text-3xl font-serif text-royal-500">sunday planning</h1>
            <p className="text-royal-600">setting intentions for your week</p>
          </div>
        </div>

        {/* Intro */}
        <Card>
          <p className="text-royal-500 leading-relaxed">
            here are some intentions for your week. these are flexible, not rigid.
            duende will find the right moments as things unfold.
          </p>
        </Card>

        {/* Intentions */}
        <div className="space-y-4">
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
                  <p className="text-lg text-royal-500 font-medium">
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
                      sounds good
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleIntentionAction(intention.id, 'dismissed')}
                      size="sm"
                    >
                      skip this one
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

        {/* Summary */}
        <Card className="text-center">
          <p className="text-royal-600 mb-4">
            {acceptedCount} {acceptedCount === 1 ? 'intention' : 'intentions'} accepted
          </p>
          <Button onClick={handleSave} size="lg" disabled={isSaving || acceptedCount === 0}>
            {isSaving ? 'saving...' : 'confirm intentions'}
          </Button>
        </Card>
      </div>
    </div>
  );
}
