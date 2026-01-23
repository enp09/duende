import { useState } from 'react';
import { MovementPreferences } from '@/types/onboarding';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio } from '@/components/ui/Radio';

interface MovementStepProps {
  data: MovementPreferences;
  onUpdate: (data: MovementPreferences) => void;
  onNext: () => void;
  onBack: () => void;
}

export function MovementStep({ data, onUpdate, onNext, onBack }: MovementStepProps) {
  const [step, setStep] = useState(1);
  const [localData, setLocalData] = useState(data);

  const updateField = (field: keyof MovementPreferences, value: any) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const toggleMovementType = (type: string) => {
    const current = localData.movementTypes;
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updateField('movementTypes', updated);
  };

  const handleNext = () => {
    if (step < 4) {
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
      {/* Question 1: Movement types */}
      {step === 1 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-800">
              what kinds of movement do you enjoy?
            </h2>
            <p className="text-royal-600">you can pick multiple</p>
          </div>

          <Card className="space-y-4">
            <Checkbox
              label="walking"
              checked={localData.movementTypes.includes('walking')}
              onChange={() => toggleMovementType('walking')}
            />
            <Checkbox
              label="yoga"
              checked={localData.movementTypes.includes('yoga')}
              onChange={() => toggleMovementType('yoga')}
            />
            <Checkbox
              label="gym / strength training"
              checked={localData.movementTypes.includes('gym')}
              onChange={() => toggleMovementType('gym')}
            />
            <Checkbox
              label="dancing"
              checked={localData.movementTypes.includes('dancing')}
              onChange={() => toggleMovementType('dancing')}
            />
            <Checkbox
              label="stretching"
              checked={localData.movementTypes.includes('stretching')}
              onChange={() => toggleMovementType('stretching')}
            />
            <Checkbox
              label="swimming"
              checked={localData.movementTypes.includes('swimming')}
              onChange={() => toggleMovementType('swimming')}
            />
            <Checkbox
              label="none right now"
              checked={localData.movementTypes.includes('none')}
              onChange={() => toggleMovementType('none')}
            />
          </Card>

          <Card className="bg-royal-50 border-royal-200">
            <p className="text-royal-700 text-sm leading-relaxed">
              your body and mind are one system. movement is how your brain processes emotions and stress. we'll help you find natural moments to move.
            </p>
          </Card>
        </>
      )}

      {/* Question 2: Preferred time */}
      {step === 2 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-800">
              when do you usually feel best moving?
            </h2>
          </div>

          <Card className="space-y-4">
            <Radio
              label="morning"
              name="movementTime"
              value="morning"
              checked={localData.preferredMovementTime === 'morning'}
              onChange={(e) => updateField('preferredMovementTime', e.target.value)}
            />
            <Radio
              label="midday"
              name="movementTime"
              value="midday"
              checked={localData.preferredMovementTime === 'midday'}
              onChange={(e) => updateField('preferredMovementTime', e.target.value)}
            />
            <Radio
              label="evening"
              name="movementTime"
              value="evening"
              checked={localData.preferredMovementTime === 'evening'}
              onChange={(e) => updateField('preferredMovementTime', e.target.value)}
            />
            <Radio
              label="varies - i like to be flexible"
              name="movementTime"
              value="varies"
              checked={localData.preferredMovementTime === 'varies'}
              onChange={(e) => updateField('preferredMovementTime', e.target.value)}
            />
          </Card>
        </>
      )}

      {/* Question 3: Outdoors */}
      {step === 3 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-800">
              do you like being outside?
            </h2>
          </div>

          <Card className="space-y-4">
            <Radio
              label="yes, i love outdoor movement"
              name="outdoors"
              value="yes"
              checked={localData.enjoysOutdoors === 'yes'}
              onChange={(e) => updateField('enjoysOutdoors', e.target.value)}
            />
            <Radio
              label="depends on the weather"
              name="outdoors"
              value="depends"
              checked={localData.enjoysOutdoors === 'depends'}
              onChange={(e) => updateField('enjoysOutdoors', e.target.value)}
            />
            <Radio
              label="i prefer indoors"
              name="outdoors"
              value="no"
              checked={localData.enjoysOutdoors === 'no'}
              onChange={(e) => updateField('enjoysOutdoors', e.target.value)}
            />
          </Card>

          <Card className="bg-royal-50 border-royal-200">
            <p className="text-royal-700 text-sm leading-relaxed">
              good to know. duende will watch the weather and suggest outdoor
              moments when it's nice.
            </p>
          </Card>
        </>
      )}

      {/* Question 4: Walking meetings */}
      {step === 4 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-800">
              how do you feel about walking meetings?
            </h2>
          </div>

          <Card className="space-y-4">
            <Radio
              label="love them"
              name="walkingMeetings"
              value="love"
              checked={localData.allowsWalkingMeetings === 'love'}
              onChange={(e) => updateField('allowsWalkingMeetings', e.target.value)}
            />
            <Radio
              label="open to it for 1:1s"
              name="walkingMeetings"
              value="open"
              checked={localData.allowsWalkingMeetings === 'open'}
              onChange={(e) => updateField('allowsWalkingMeetings', e.target.value)}
            />
            <Radio
              label="prefer video/in-person"
              name="walkingMeetings"
              value="prefer-not"
              checked={localData.allowsWalkingMeetings === 'prefer-not'}
              onChange={(e) => updateField('allowsWalkingMeetings', e.target.value)}
            />
            <Radio
              label="never"
              name="walkingMeetings"
              value="never"
              checked={localData.allowsWalkingMeetings === 'never'}
              onChange={(e) => updateField('allowsWalkingMeetings', e.target.value)}
            />
          </Card>

          <Card className="bg-royal-50 border-royal-200">
            <p className="text-royal-700 text-sm leading-relaxed">
              walking side by side makes hard conversations easier. less eye contact pressure, more blood flow to the brain.
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
          {step < 4 ? 'continue' : 'next section'}
        </Button>
      </div>
    </div>
  );
}
