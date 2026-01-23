'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface UserData {
  id: string;
  email: string;
  city: string;
  timezone: string;
  settings?: {
    movementTypes: string[];
    passionProjects: string[];
  };
  relationships?: Array<{
    name: string;
    relationshipType: string;
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('duende_user_id');

    if (!userId) {
      router.push('/onboarding');
      return;
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
  }, [router]);

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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.svg"
              alt="duende logo"
              width={60}
              height={60}
              priority
            />
            <div>
              <h1 className="text-3xl font-serif text-royal-500">welcome to duende</h1>
              <p className="text-royal-600 text-sm">{userData.city}</p>
            </div>
          </div>
        </div>

        {/* Onboarding Complete Message */}
        <Card className="bg-orange-50 border-orange-200">
          <div className="space-y-2">
            <h2 className="text-xl font-serif text-royal-500">onboarding complete!</h2>
            <p className="text-royal-600">
              your default settings have been saved. duende is now learning your patterns and will start making suggestions to protect your humanity.
            </p>
          </div>
        </Card>

        {/* Your Settings Overview */}
        <Card>
          <h2 className="text-xl font-serif text-royal-500 mb-4">your default settings</h2>
          <div className="space-y-4">
            {userData.settings && (
              <>
                <div>
                  <p className="text-sm font-medium text-royal-600 mb-1">movement</p>
                  <p className="text-royal-500">
                    {userData.settings.movementTypes.join(', ') || 'not specified'}
                  </p>
                </div>

                {userData.settings.passionProjects.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-royal-600 mb-1">passion projects</p>
                    <p className="text-royal-500">{userData.settings.passionProjects[0]}</p>
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

        {/* Next Steps */}
        <Card>
          <h2 className="text-xl font-serif text-royal-500 mb-4">what happens next</h2>
          <div className="space-y-3 text-royal-600">
            <p>📅 <strong>sunday planning:</strong> we'll help you set intentions for the week</p>
            <p>☀️ <strong>morning brief:</strong> daily guidance tailored to your calendar</p>
            <p>💡 <strong>smart suggestions:</strong> protecting your humanity throughout the week</p>
            <p>🗣️ <strong>conversational learning:</strong> talk to duende anytime to adjust</p>
          </div>
        </Card>

        {/* Coming Soon */}
        <Card className="text-center">
          <p className="text-royal-600 italic">
            calendar integration and ai features coming soon
          </p>
        </Card>
      </div>
    </div>
  );
}
