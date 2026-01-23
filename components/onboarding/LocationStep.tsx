import { LocationData } from '@/types/onboarding';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

interface LocationStepProps {
  data: LocationData;
  onUpdate: (data: LocationData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LocationStep({ data, onUpdate, onNext, onBack }: LocationStepProps) {
  const updateField = (field: keyof LocationData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-2xl font-serif text-royal-500">
          where are you based?
        </h2>
      </div>

      <Card className="space-y-4">
        <Input
          label="city"
          placeholder="e.g., washington dc"
          value={data.city}
          onChange={(e) => updateField('city', e.target.value)}
        />

        <Input
          label="timezone"
          type="text"
          value={data.timezone}
          onChange={(e) => updateField('timezone', e.target.value)}
          placeholder="auto-detected"
        />
      </Card>

      <Card className="bg-royal-50 border-royal-200">
        <p className="text-royal-500 text-sm leading-relaxed">
          this helps me watch the weather and suggest outdoor moments when conditions are nice. just your city for weather data.
        </p>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          back
        </Button>
        <Button onClick={onNext} disabled={!data.city.trim()}>
          continue
        </Button>
      </div>
    </div>
  );
}
