import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingData } from '@/types/onboarding';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface CompletionStepProps {
  data: OnboardingData;
}

export function CompletionStep({ data }: CompletionStepProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Store userId in localStorage for now (will use proper auth later)
        localStorage.setItem('duende_user_id', result.userId);
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(result.error || 'something went wrong');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error completing onboarding:', err);
      setError('failed to save your data. please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-serif text-royal-500">
          you're all set.
        </h1>
      </div>

      <Card className="space-y-6">
        <p className="text-lg text-royal-500 font-medium">
          here's what happens next:
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-medium text-royal-500">sunday evening</p>
              <p className="text-royal-600 text-sm">
                i'll help you plan your week. setting intentions for movement, connection, growth, and rest. flexible goals, never rigid.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl">☀️</span>
            <div>
              <p className="font-medium text-royal-500">every morning</p>
              <p className="text-royal-600 text-sm">
                you'll get a gentle brief. today's shape, what i'm watching, and one intention to hold.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-medium text-royal-500">throughout the week</p>
              <p className="text-royal-600 text-sm">
                i'll suggest changes to protect your humanity. you always decide.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl">🗣️</span>
            <div>
              <p className="font-medium text-royal-500">anytime</p>
              <p className="text-royal-600 text-sm">
                talk to me to adjust how i work. i learn and adapt.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-orange-50 border-orange-200 text-center">
        <p className="text-royal-500 italic">
          ready to protect your humanity?
        </p>
      </Card>

      {error && (
        <Card className="bg-orange-50 border-orange-500">
          <p className="text-orange-700 text-sm">{error}</p>
        </Card>
      )}

      <div className="flex justify-center pt-4">
        <Button onClick={handleComplete} size="lg" disabled={isLoading}>
          {isLoading ? 'saving...' : 'go to dashboard'}
        </Button>
      </div>
    </div>
  );
}
