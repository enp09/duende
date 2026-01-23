import { OnboardingData } from '@/types/onboarding';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface CompletionStepProps {
  data: OnboardingData;
}

export function CompletionStep({ data }: CompletionStepProps) {
  const handleComplete = () => {
    // TODO: Save to database and redirect to dashboard
    console.log('Onboarding data:', data);
    alert('Onboarding complete! (Save to database and redirect to dashboard)');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-serif text-sage-800">
          you're all set.
        </h1>
      </div>

      <Card className="space-y-6">
        <p className="text-lg text-sage-800 font-medium">
          here's what happens next:
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-medium text-sage-800">sunday evening</p>
              <p className="text-sage-600 text-sm">
                i'll help you plan your week. setting intentions for movement, connection, growth, and rest. flexible goals, never rigid.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl">☀️</span>
            <div>
              <p className="font-medium text-sage-800">every morning</p>
              <p className="text-sage-600 text-sm">
                you'll get a gentle brief. today's shape, what i'm watching, and one intention to hold.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-medium text-sage-800">throughout the week</p>
              <p className="text-sage-600 text-sm">
                i'll suggest changes to protect your humanity. you always decide.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl">🗣️</span>
            <div>
              <p className="font-medium text-sage-800">anytime</p>
              <p className="text-sage-600 text-sm">
                talk to me to adjust how i work. i learn and adapt.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-terracotta-50 border-terracotta-200 text-center">
        <p className="text-sage-800 italic">
          ready to protect your humanity?
        </p>
      </Card>

      <div className="flex justify-center pt-4">
        <Button onClick={handleComplete} size="lg">
          go to dashboard
        </Button>
      </div>
    </div>
  );
}
