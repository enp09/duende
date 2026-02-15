'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Insight {
  id: string;
  type: string;
  title: string;
  description: string | null;
  reasoning: string | null;
  defaultSetting: string | null;
  status: string;
  createdAt: Date;
}

export default function InsightsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for session to load
    if (status === 'loading') return;

    const userId = session?.user?.id;

    if (!userId) {
      setIsLoading(false);
      return;
    }

    loadInsights(userId);
  }, [session, status]);

  const loadInsights = async (userId: string) => {
    try {
      const response = await fetch(`/api/suggestions?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setInsights(data.suggestions);
      }
    } catch (error) {
      console.error('Error loading insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = async (insightId: string) => {
    try {
      await fetch('/api/suggestions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestionId: insightId, status: 'dismissed' }),
      });

      setInsights(prev => prev.filter(i => i.id !== insightId));
    } catch (error) {
      console.error('Error dismissing insight:', error);
    }
  };

  const getSeverityColor = (type: string) => {
    if (type.includes('lunch') || type.includes('too_many')) return 'border-red-300 bg-red-50';
    if (type.includes('movement') || type.includes('buffer')) return 'border-orange-300 bg-orange-50';
    return 'border-blue-300 bg-blue-50';
  };

  const getSettingLabel = (setting: string | null) => {
    const labels: { [key: string]: string } = {
      movement: 'movement',
      nutrition: 'nutrition',
      relationships: 'connection',
      stress: 'buffers',
      transcendence: 'growth',
    };
    return labels[setting || ''] || 'wellbeing';
  };

  const getSettingEducation = (setting: string | null) => {
    const education: { [key: string]: { why: string; action: string; science: string } } = {
      movement: {
        why: 'your body and mind are one system. sitting for hours keeps your nervous system in stress mode. movement is how your brain processes emotions and regulates itself.',
        action: 'consider taking a 10-15 minute walk between meetings. walking side by side makes hard conversations easier - less eye contact pressure, more blood flow to the brain.',
        science: 'studies show that 3+ hours of continuous sitting triggers the sympathetic nervous system (fight-or-flight mode), reducing cognitive function and emotional regulation.',
      },
      nutrition: {
        why: 'eating at your desk keeps your body in stress mode. digestion and cognition compete for the same resources - your parasympathetic nervous system needs to activate for proper digestion.',
        action: 'protect lunch time (ideally 11:30-14:00) as a real break. even 30 minutes away from your desk helps your body shift from sympathetic to parasympathetic mode.',
        science: 'the vagus nerve, which controls digestion, requires activation of the parasympathetic ("rest and digest") nervous system. this cannot happen while you are in work mode.',
      },
      stress: {
        why: 'back-to-back meetings keep you in fight-or-flight mode. your nervous system needs transition time to process information and regulate stress hormones.',
        action: 'build in 10-15 minute buffers between meetings. use this time to walk, breathe, or simply stare out the window. this is not wasted time - it is recovery time.',
        science: 'cortisol (stress hormone) takes time to metabolize. without breaks, cortisol accumulates throughout the day, leading to decision fatigue and emotional dysregulation.',
      },
      relationships: {
        why: 'humans evolved in tribes of 50-150 people. your nervous system literally calms when you connect with people you trust. this is biology, not "soft skills".',
        action: 'schedule regular time with the people who matter most to you. even a 15-minute call or coffee can regulate your nervous system more than meditation alone.',
        science: 'co-regulation is real: when you spend time with trusted people, mirror neurons and oxytocin release help regulate your stress response in ways that solo activities cannot.',
      },
      transcendence: {
        why: 'growth happens at the edge of comfort, not in maintenance mode. a calendar that is 100% maintenance is slowly numbing your sense of aliveness.',
        action: 'protect time for learning, creating, or exploring something that energizes you. this is not optional - it is how humans stay engaged with life.',
        science: 'neuroplasticity (the brain\'s ability to form new connections) requires novelty and challenge. without growth activities, cognitive flexibility decreases over time.',
      },
    };

    return education[setting || ''] || {
      why: 'your calendar reflects your values and priorities. patterns in your calendar directly affect your wellbeing.',
      action: 'reflect on what matters most to you and ensure your calendar supports those priorities.',
      science: 'chronic stress from poor calendar management affects sleep, immune function, and long-term health outcomes.',
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-royal-500">loading insights...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-cloud-300 to-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo.svg" alt="duende" width={50} height={50} priority className="cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-3xl font-serif text-royal-500">your calendar insights</h1>
              <p className="text-royal-600 text-sm">understanding patterns and their impact on your wellbeing</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => router.push('/planning')}>
              planning
            </Button>
            <Button variant="ghost" onClick={() => router.push('/settings')}>
              settings
            </Button>
          </div>
        </div>

        {/* Educational Introduction */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <h2 className="text-lg font-serif text-royal-500">the 5 pieces of being human</h2>
            <p className="text-royal-600 text-sm leading-relaxed">
              duende helps you understand how your calendar affects your biology. based on research from "human default settings" by sinan canan, these 5 elements are not optional - they are how your nervous system is designed to function.
            </p>
            <div className="grid grid-cols-5 gap-2 mt-4">
              <div className="text-center">
                <div className="text-2xl mb-1">🚶</div>
                <div className="text-xs text-royal-500 font-medium">movement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🍽️</div>
                <div className="text-xs text-royal-500 font-medium">nutrition</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🤝</div>
                <div className="text-xs text-royal-500 font-medium">connection</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🌬️</div>
                <div className="text-xs text-royal-500 font-medium">buffers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🌱</div>
                <div className="text-xs text-royal-500 font-medium">growth</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Insights List */}
        {insights.length === 0 ? (
          <Card className="bg-green-50 border-green-200">
            <div className="text-center py-8">
              <p className="text-royal-500 text-lg mb-2">✓ no patterns detected this week</p>
              <p className="text-royal-600 text-sm">
                your calendar looks balanced! check back next week for new insights.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-royal-500">
              {insights.length} {insights.length === 1 ? 'insight' : 'insights'} from your calendar
            </h2>

            {insights.map((insight) => {
              const education = getSettingEducation(insight.defaultSetting);

              return (
                <Card key={insight.id} className={getSeverityColor(insight.type)}>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs uppercase tracking-wide text-royal-400">
                            {getSettingLabel(insight.defaultSetting)}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-royal-500">{insight.title}</h3>
                      </div>
                    </div>

                    {/* Pattern Description */}
                    <div className="bg-white border border-royal-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-royal-500 mb-1">pattern detected:</p>
                      <p className="text-sm text-royal-600">{insight.description}</p>
                    </div>

                    {/* Why This Matters */}
                    <div className="bg-white border border-royal-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-royal-500 mb-2">why this matters:</p>
                      <p className="text-sm text-royal-600 leading-relaxed mb-3">
                        {education.why}
                      </p>

                      <p className="text-sm font-semibold text-royal-500 mb-2">what you can do:</p>
                      <p className="text-sm text-royal-600 leading-relaxed mb-3">
                        {education.action}
                      </p>

                      <p className="text-sm font-semibold text-royal-500 mb-2">the science:</p>
                      <p className="text-xs text-royal-500 leading-relaxed">
                        {education.science}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleDismiss(insight.id)}
                        size="sm"
                        variant="ghost"
                      >
                        got it
                      </Button>
                      <Button
                        onClick={() => router.push('/planning')}
                        size="sm"
                        className="bg-royal-500 hover:bg-royal-600"
                      >
                        adjust calendar
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Learn More Section */}
        <Card className="bg-cloud-100 border-royal-200">
          <div className="space-y-3">
            <h2 className="text-lg font-serif text-royal-500">want to learn more?</h2>
            <div className="space-y-2 text-sm text-royal-600">
              <p>
                <strong>book:</strong> "human default settings" by sinan canan - the neuroscience behind these 5 elements
              </p>
              <p>
                <strong>reflection:</strong> your calendar is a reflection of your priorities. does it support the human you want to be?
              </p>
              <p>
                <strong>advocacy:</strong> you can advocate for your own needs. duende is here to help you understand them, not to do it for you.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
