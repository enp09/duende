'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function OnboardingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [protectionCount, setProtectionCount] = useState(0);

  useEffect(() => {
    // Check if user came from planning page with saved data
    const savedBlocks = localStorage.getItem('duende_calendar_blocks');
    if (savedBlocks) {
      const blocks = JSON.parse(savedBlocks);
      setProtectionCount(blocks.length);
    }
  }, []);

  const handleConnectCalendar = async () => {
    if (!email || !city) {
      setError('please enter your email and city');
      return;
    }

    setIsConnecting(true);

    try {
      // Get saved planning data
      const savedAnswers = localStorage.getItem('duende_planning_answers');
      const savedBlocks = localStorage.getItem('duende_calendar_blocks');

      // Create user with minimal data
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          city,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          planningAnswers: savedAnswers ? JSON.parse(savedAnswers) : null,
          calendarBlocks: savedBlocks ? JSON.parse(savedBlocks) : null,
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('duende_user_id', result.userId);

        // Start OAuth flow
        const authResponse = await fetch(`/api/auth/google/login?userId=${result.userId}`);
        const authData = await authResponse.json();

        if (authData.success && authData.authUrl) {
          window.location.href = authData.authUrl; // Redirect to Google OAuth
        } else {
          setError('failed to connect calendar');
          setIsConnecting(false);
        }
      } else {
        setError('failed to create account');
        setIsConnecting(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('something went wrong');
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-cloud-300 to-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <Image src="/logo.svg" alt="duende logo" width={80} height={80} priority />
          <h1 className="text-4xl font-serif text-royal-500">almost there</h1>
          {protectionCount > 0 && (
            <p className="text-royal-600 leading-relaxed">
              you have {protectionCount} {protectionCount === 1 ? 'protection' : 'protections'} ready to sync. connect your calendar to make it happen.
            </p>
          )}
          {protectionCount === 0 && (
            <p className="text-royal-600 leading-relaxed">
              connect your calendar so duende can start advocating for your humanity
            </p>
          )}
        </div>

        <Card>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-royal-600 mb-2 block">email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-royal-600 mb-2 block">city</label>
              <Input
                type="text"
                placeholder="San Francisco"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <p className="text-xs text-royal-400 mt-1 italic">for weather aware suggestions</p>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              onClick={handleConnectCalendar}
              disabled={isConnecting}
              className="w-full"
              size="lg"
            >
              {isConnecting ? 'connecting...' : 'connect google calendar'}
            </Button>

            <p className="text-xs text-royal-400 text-center leading-relaxed">
              duende reads your schedule to understand your week. your protections will sync after you grant access.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
