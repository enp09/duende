'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface UserData {
  id: string;
  email: string;
  city: string;
  timezone: string;
  googleAccessToken?: string;
  settings?: {
    movementTypes: string[];
    passionProjects: string[];
  };
  relationships?: Array<{
    name: string;
    relationshipType: string;
  }>;
}

function SettingsContent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Wait for session to load
    if (status === 'loading') return;

    const userId = session?.user?.id;

    if (!userId) {
      setIsLoading(false);
      return;
    }

    // Check for URL params (calendar connection status)
    const calendarParam = searchParams.get('calendar');
    const errorParam = searchParams.get('error');

    if (calendarParam === 'connected') {
      setMessage({ type: 'success', text: 'calendar connected successfully' });

      // Auto-sync protection blocks if they exist
      const savedBlocks = localStorage.getItem('duende_calendar_blocks');
      if (savedBlocks) {
        const blocks = JSON.parse(savedBlocks);
        syncProtectionsToCalendar(userId, blocks);
      }
    } else if (errorParam) {
      setMessage({ type: 'error', text: `connection failed: ${errorParam}` });
    }

    // Fetch user data
    fetch(`/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.user);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
        setIsLoading(false);
      });
  }, [session, status, searchParams, router]);

  const syncProtectionsToCalendar = async (userId: string, protectionBlocks: any[]) => {
    try {
      const response = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, protectionBlocks }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: 'success',
          text: `calendar connected and ${data.count} protections synced!`
        });
        // Clear localStorage after successful sync
        localStorage.removeItem('duende_calendar_blocks');
      }
    } catch (error) {
      console.error('Error syncing protections:', error);
    }
  };

  const handleConnectCalendar = async () => {
    if (!userData) return;

    try {
      const response = await fetch(`/api/auth/google/login?userId=${userData.id}`);
      const data = await response.json();

      if (data.success && data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setMessage({ type: 'error', text: 'failed to start calendar connection' });
      }
    } catch (error) {
      console.error('Error connecting calendar:', error);
      setMessage({ type: 'error', text: 'something went wrong' });
    }
  };

  const handleSyncCalendar = async () => {
    if (!userData) return;

    setIsSyncing(true);
    setMessage({ type: 'success', text: 'loading your protections...' });

    try {
      // First, load saved protection blocks from database
      const loadResponse = await fetch(`/api/planning/load?userId=${userData.id}`);
      const loadData = await loadResponse.json();

      if (loadData.success && loadData.protectionBlocks && loadData.protectionBlocks.length > 0) {
        // Sync protections to Google Calendar
        const syncResponse = await fetch('/api/calendar/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userData.id,
            protectionBlocks: loadData.protectionBlocks,
          }),
        });

        const syncData = await syncResponse.json();

        if (syncData.success) {
          setMessage({
            type: 'success',
            text: `synced ${syncData.count} protection blocks to your calendar`
          });
        } else {
          setMessage({ type: 'error', text: syncData.error || 'sync failed' });
        }
      } else {
        setMessage({
          type: 'error',
          text: 'no protection blocks found. create them in the planning page first.'
        });
      }
    } catch (error) {
      console.error('Error syncing calendar:', error);
      setMessage({ type: 'error', text: 'something went wrong' });
    } finally {
      setIsSyncing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-royal-500">loading...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <p className="text-royal-500">unable to load your data</p>
          <Button onClick={() => router.push('/onboarding')} className="mt-4">
            start onboarding
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="duende logo"
                width={50}
                height={50}
                priority
                className="cursor-pointer"
              />
            </Link>
            <div>
              <h1 className="text-3xl font-serif text-royal-500">settings</h1>
              <p className="text-royal-600 text-sm">{userData.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => router.push('/suggestions')}>
              suggestions
            </Button>
            <Button variant="ghost" onClick={() => router.push('/planning')}>
              plan week
            </Button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <Card className={message.type === 'success' ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'}>
            <p className={message.type === 'success' ? 'text-royal-500' : 'text-red-600'}>
              {message.text}
            </p>
          </Card>
        )}

        {/* Calendar Integration */}
        <Card>
          <h2 className="text-xl font-serif text-royal-500 mb-4">calendar integration</h2>
          {userData.googleAccessToken ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <p className="text-royal-600">google calendar connected</p>
              </div>
              <Button onClick={handleSyncCalendar} disabled={isSyncing} size="sm">
                {isSyncing ? 'syncing...' : 'sync calendar now'}
              </Button>
              <p className="text-sm text-royal-600 italic">
                duende watches your schedule and intervenes when thresholds trigger
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-royal-600">
                connect your calendar so duende can watch for patterns and protect your default settings
              </p>
              <Button onClick={handleConnectCalendar}>
                connect google calendar
              </Button>
            </div>
          )}
        </Card>

        {/* Your Default Settings */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-royal-500">your default settings</h2>
            <p className="text-sm text-royal-600 italic">thresholds duende protects</p>
          </div>
          <div className="space-y-4">
            {userData.settings && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-royal-600 mb-1">movement</p>
                    <p className="text-royal-500">
                      {userData.settings.movementTypes.join(', ') || 'not specified'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-royal-600 mb-1">location</p>
                    <p className="text-royal-500">{userData.city}, {userData.timezone}</p>
                  </div>
                </div>

                {userData.settings.passionProjects.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-royal-600 mb-1">passion projects</p>
                    <p className="text-royal-500">{userData.settings.passionProjects.join(', ')}</p>
                  </div>
                )}
              </>
            )}

            {userData.relationships && userData.relationships.length > 0 && (
              <div>
                <p className="text-sm font-medium text-royal-600 mb-1">close connections</p>
                <p className="text-royal-500">
                  {userData.relationships.map(r => r.name).join(', ')}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Account Info */}
        <Card>
          <h2 className="text-xl font-serif text-royal-500 mb-4">account</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-royal-600 mb-1">email</p>
              <p className="text-royal-500">{userData.email}</p>
            </div>
            <div className="pt-4 border-t border-royal-200">
              <p className="text-royal-600 text-xs italic">
                to update your preferences or pause duende, email hello@duende.app
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-royal-500">loading settings...</p>
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}
