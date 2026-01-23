'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface MorningBrief {
  date: string;
  greeting: string;
  todaysShape: {
    meetingCount: number;
    protectedHours: number;
    openHours: number;
  };
  weather?: {
    temp: number;
    condition: string;
    relevant: boolean;
  };
  watching: string;
  intention: string;
  teaching?: {
    text: string;
    learnMoreUrl: string;
  };
}

export default function BriefPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [brief, setBrief] = useState<MorningBrief | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('duende_user_id');
    if (!storedUserId) {
      router.push('/onboarding');
      return;
    }
    setUserId(storedUserId);

    // Generate brief (will be API call in future)
    generateBrief();
  }, [router]);

  const generateBrief = () => {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    const sampleBrief: MorningBrief = {
      date: today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
      greeting: 'good morning',
      todaysShape: {
        meetingCount: 4,
        protectedHours: 2,
        openHours: 3,
      },
      weather: {
        temp: 64,
        condition: 'sunny',
        relevant: true,
      },
      watching: "your 3pm is hour 5 of sitting. you'll need to move before then.",
      intention: 'protect your lunch today',
      teaching: {
        text: 'eating at your desk keeps your body in stress mode. digestion and cognition compete for resources. a protected lunch lets your nervous system shift gears.',
        learnMoreUrl: 'https://humanbeyondtech.com/nutrition',
      },
    };

    setBrief(sampleBrief);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-royal-500">preparing your brief...</p>
      </div>
    );
  }

  if (!brief) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="duende" width={40} height={40} priority />
            <div>
              <h1 className="text-2xl font-serif text-royal-500">morning brief</h1>
              <p className="text-sm text-royal-600">{brief.date}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => router.push('/dashboard')}>
            dashboard
          </Button>
        </div>

        {/* Greeting */}
        <Card className="bg-royal-50 border-royal-200">
          <p className="text-2xl font-serif text-royal-500">{brief.greeting}</p>
        </Card>

        {/* Today's Shape */}
        <Card>
          <h2 className="text-lg font-medium text-royal-500 mb-3">today's shape</h2>
          <div className="space-y-2 text-royal-600">
            <p>
              {brief.todaysShape.meetingCount}{' '}
              {brief.todaysShape.meetingCount === 1 ? 'meeting' : 'meetings'} today
            </p>
            <p>{brief.todaysShape.protectedHours} hours protected</p>
            <p>{brief.todaysShape.openHours} hours open space</p>
          </div>
        </Card>

        {/* Weather */}
        {brief.weather && brief.weather.relevant && (
          <Card className="bg-orange-50 border-orange-200">
            <p className="text-royal-500">
              it's {brief.weather.temp}° and {brief.weather.condition} today. good day
              for that walk we planned.
            </p>
          </Card>
        )}

        {/* Watching */}
        <Card>
          <h2 className="text-lg font-medium text-royal-500 mb-2">what i'm watching</h2>
          <p className="text-royal-600">{brief.watching}</p>
        </Card>

        {/* Intention */}
        <Card className="bg-royal-50 border-royal-200">
          <h2 className="text-lg font-medium text-royal-500 mb-2">one intention</h2>
          <p className="text-xl text-royal-600 font-medium">{brief.intention}</p>
        </Card>

        {/* Teaching */}
        {brief.teaching && (
          <Card>
            <div className="space-y-3">
              <p className="text-sm text-royal-600 leading-relaxed">
                {brief.teaching.text}
              </p>
              <Link
                href={brief.teaching.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-orange-600 hover:text-orange-700 underline"
              >
                learn more →
              </Link>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button onClick={() => router.push('/dashboard')} size="lg">
            go to dashboard
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              window.location.reload();
            }}
          >
            refresh brief
          </Button>
        </div>
      </div>
    </div>
  );
}
