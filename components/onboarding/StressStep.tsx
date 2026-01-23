import { useState } from 'react';
import { StressPreferences } from '@/types/onboarding';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';

interface StressStepProps {
  data: StressPreferences;
  onUpdate: (data: StressPreferences) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StressStep({ data, onUpdate, onNext, onBack }: StressStepProps) {
  const [step, setStep] = useState(1);
  const [localData, setLocalData] = useState(data);

  const updateField = (field: keyof StressPreferences, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const toggleDecompressMethod = (method: string) => {
    const current = localData.decompressMethods;
    const updated = current.includes(method)
      ? current.filter((m) => m !== method)
      : [...current, method];
    updateField('decompressMethods', updated);
  };

  const handleNext = () => {
    if (step < 3) {
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
      {/* Question 1: Decompression methods */}
      {step === 1 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-500">
              what helps you decompress after an intense day?
            </h2>
            <p className="text-royal-600">pick all that apply</p>
          </div>

          <Card className="space-y-4">
            <Checkbox
              label="walks"
              checked={localData.decompressMethods.includes('walks')}
              onChange={() => toggleDecompressMethod('walks')}
            />
            <Checkbox
              label="naps"
              checked={localData.decompressMethods.includes('naps')}
              onChange={() => toggleDecompressMethod('naps')}
            />
            <Checkbox
              label="reading"
              checked={localData.decompressMethods.includes('reading')}
              onChange={() => toggleDecompressMethod('reading')}
            />
            <Checkbox
              label="music"
              checked={localData.decompressMethods.includes('music')}
              onChange={() => toggleDecompressMethod('music')}
            />
            <Checkbox
              label="quiet / solitude"
              checked={localData.decompressMethods.includes('quiet')}
              onChange={() => toggleDecompressMethod('quiet')}
            />
            <Checkbox
              label="exercise"
              checked={localData.decompressMethods.includes('exercise')}
              onChange={() => toggleDecompressMethod('exercise')}
            />
            <Checkbox
              label="talking to someone"
              checked={localData.decompressMethods.includes('talking')}
              onChange={() => toggleDecompressMethod('talking')}
            />
          </Card>

          <Card className="bg-royal-50 border-royal-200">
            <p className="text-royal-500 text-sm leading-relaxed">
              your stress response can't tell the difference between a tiger and
              an email. movement completes the stress cycle — your body needs the
              signal that you survived.
            </p>
          </Card>
        </>
      )}

      {/* Question 2: Meeting tolerance */}
      {step === 2 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-500">
              what's your max comfortable meeting hours per day?
            </h2>
            <p className="text-royal-600">most people start feeling drained around 6</p>
          </div>

          <Card className="space-y-6">
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              value={localData.maxMeetingHoursPerDay}
              onChange={(e) => updateField('maxMeetingHoursPerDay', parseInt(e.target.value))}
              className="w-full h-2 bg-royal-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="text-center">
              <span className="text-3xl font-serif text-royal-500">
                {localData.maxMeetingHoursPerDay} hours
              </span>
            </div>
            <div className="flex justify-between text-xs text-royal-500">
              <span>2h</span>
              <span>6h</span>
              <span>10h</span>
            </div>
          </Card>
        </>
      )}

      {/* Question 3: Buffer time */}
      {step === 3 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-500">
              do you want buffer time between meetings?
            </h2>
          </div>

          <Card className="space-y-4">
            <Radio
              label="yes, i need breathing room"
              name="buffer"
              value="yes-10"
              checked={localData.wantsBufferTime === 'yes-10'}
              onChange={(e) => {
                updateField('wantsBufferTime', e.target.value);
                updateField('bufferMinutes', 10);
              }}
            />
            <Radio
              label="yes, but just 5 minutes"
              name="buffer"
              value="yes-5"
              checked={localData.wantsBufferTime === 'yes-5'}
              onChange={(e) => {
                updateField('wantsBufferTime', e.target.value);
                updateField('bufferMinutes', 5);
              }}
            />
            <Radio
              label="back to backs are fine"
              name="buffer"
              value="no"
              checked={localData.wantsBufferTime === 'no'}
              onChange={(e) => {
                updateField('wantsBufferTime', e.target.value);
                updateField('bufferMinutes', 0);
              }}
            />
          </Card>

          <Card className="bg-royal-50 border-royal-200">
            <p className="text-royal-500 text-sm leading-relaxed">
              back to back meetings keep you in fight or flight. buffers help your stress hormones reset and signal safety.
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
          {step < 3 ? 'continue' : 'next section'}
        </Button>
      </div>
    </div>
  );
}
