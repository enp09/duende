import { useState } from 'react';
import { NutritionPreferences } from '@/types/onboarding';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Radio } from '@/components/ui/Radio';
import { Input } from '@/components/ui/Input';

interface NutritionStepProps {
  data: NutritionPreferences;
  onUpdate: (data: NutritionPreferences) => void;
  onNext: () => void;
  onBack: () => void;
}

export function NutritionStep({ data, onUpdate, onNext, onBack }: NutritionStepProps) {
  const [step, setStep] = useState(1);
  const [localData, setLocalData] = useState(data);

  const updateField = (field: keyof NutritionPreferences, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const handleNext = () => {
    const needsLunchTime =
      (localData.wantsProtectedLunch === 'yes' || localData.wantsProtectedLunch === 'flexible') &&
      step === 1;

    if (needsLunchTime && !localData.preferredLunchTime) {
      setStep(2);
    } else if (step < 3) {
      setStep(step + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Question 1: Protected lunch */}
      {step === 1 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-sage-800">
              do you want protected lunch time?
            </h2>
          </div>

          <Card className="space-y-4">
            <Radio
              label="yes, lunch is sacred"
              name="protectedLunch"
              value="yes"
              checked={localData.wantsProtectedLunch === 'yes'}
              onChange={(e) => updateField('wantsProtectedLunch', e.target.value)}
            />
            <Radio
              label="yes, but i'm flexible"
              name="protectedLunch"
              value="flexible"
              checked={localData.wantsProtectedLunch === 'flexible'}
              onChange={(e) => updateField('wantsProtectedLunch', e.target.value)}
            />
            <Radio
              label="no, i'm fine eating whenever"
              name="protectedLunch"
              value="no"
              checked={localData.wantsProtectedLunch === 'no'}
              onChange={(e) => updateField('wantsProtectedLunch', e.target.value)}
            />
            <Radio
              label="i usually skip lunch"
              name="protectedLunch"
              value="skip"
              checked={localData.wantsProtectedLunch === 'skip'}
              onChange={(e) => updateField('wantsProtectedLunch', e.target.value)}
            />
          </Card>

          <Card className="bg-sage-50 border-sage-200">
            <p className="text-sage-700 text-sm leading-relaxed">
              eating at your desk keeps your body in stress mode. digestion and
              cognition compete for resources. a protected lunch lets your
              nervous system shift gears.
            </p>
          </Card>
        </>
      )}

      {/* Question 2: Lunch time */}
      {step === 2 && (localData.wantsProtectedLunch === 'yes' || localData.wantsProtectedLunch === 'flexible') && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-sage-800">
              what time works best for lunch?
            </h2>
          </div>

          <Card>
            <Input
              type="time"
              value={localData.preferredLunchTime || '12:00'}
              onChange={(e) => updateField('preferredLunchTime', e.target.value)}
              min="11:00"
              max="14:00"
            />
          </Card>
        </>
      )}

      {/* Question 3: Current habits */}
      {step === 3 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-sage-800">
              do you usually eat at your desk or away from it?
            </h2>
          </div>

          <Card className="space-y-4">
            <Radio
              label="at my desk (multitasking)"
              name="eatsAtDesk"
              value="yes"
              checked={localData.eatsAtDesk === 'yes'}
              onChange={(e) => updateField('eatsAtDesk', e.target.value)}
            />
            <Radio
              label="away from my desk"
              name="eatsAtDesk"
              value="no"
              checked={localData.eatsAtDesk === 'no'}
              onChange={(e) => updateField('eatsAtDesk', e.target.value)}
            />
            <Radio
              label="varies"
              name="eatsAtDesk"
              value="varies"
              checked={localData.eatsAtDesk === 'varies'}
              onChange={(e) => updateField('eatsAtDesk', e.target.value)}
            />
          </Card>

          <Card className="bg-sage-50 border-sage-200">
            <p className="text-sage-700 text-sm leading-relaxed">
              this isn't about what's "right" — just helping me understand your
              current patterns so i can suggest gently.
            </p>
          </Card>
        </>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={handleBack}>
          back
        </Button>
        <Button onClick={handleNext}>
          {step < 3 || (step === 2 && localData.wantsProtectedLunch !== 'yes' && localData.wantsProtectedLunch !== 'flexible')
            ? 'continue'
            : 'next section'}
        </Button>
      </div>
    </div>
  );
}
