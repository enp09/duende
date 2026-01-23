import { useState } from 'react';
import { TranscendenceData } from '@/types/onboarding';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';

interface TranscendenceStepProps {
  data: TranscendenceData;
  onUpdate: (data: TranscendenceData) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TranscendenceStep({ data, onUpdate, onNext, onBack }: TranscendenceStepProps) {
  const [step, setStep] = useState(1);
  const [localData, setLocalData] = useState(data);

  const updateField = (field: keyof TranscendenceData, value: string) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onUpdate(updated);
  };

  const handleNext = () => {
    if (step < 2) {
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
      {/* Question 1: Passion projects */}
      {step === 1 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-500">
              what are you working on outside of work obligations?
            </h2>
            <p className="text-royal-600">
              passion projects, hobbies, creative pursuits, things that make you
              feel most alive
            </p>
          </div>

          <Card>
            <Textarea
              placeholder="write freely here..."
              value={localData.passionProjects}
              onChange={(e) => updateField('passionProjects', e.target.value)}
              rows={6}
            />
          </Card>

          <Card className="bg-royal-50 border-royal-200">
            <p className="text-royal-500 text-sm leading-relaxed">
              growth happens at the edge of comfort. a calendar that's 100%
              maintenance is slowly numbing. we'll help you protect time for
              becoming, not just maintaining.
            </p>
          </Card>
        </>
      )}

      {/* Question 2: Learning goals */}
      {step === 2 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-500">
              what do you want to learn this year?
            </h2>
          </div>

          <Card>
            <Textarea
              placeholder="what knowledge or skills are calling to you?"
              value={localData.learningGoals}
              onChange={(e) => updateField('learningGoals', e.target.value)}
              rows={6}
            />
          </Card>

          <Card className="bg-royal-50 border-royal-200">
            <p className="text-royal-500 text-sm leading-relaxed">
              humans are the only species that must grow to feel alive. comfort alone leaves us numb. this life is lived once. protecting time for becoming is essential.
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
          {step < 2 ? 'continue' : 'next section'}
        </Button>
      </div>
    </div>
  );
}
