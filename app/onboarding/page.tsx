'use client';

import { useState } from 'react';
import { OnboardingData, initialOnboardingData } from '@/types/onboarding';
import { ProgressBar } from '@/components/ui/ProgressBar';

// Import steps
import { WelcomeStep } from '@/components/onboarding/WelcomeStep';
import { MovementStep } from '@/components/onboarding/MovementStep';
import { NutritionStep } from '@/components/onboarding/NutritionStep';
import { RelationshipsStep } from '@/components/onboarding/RelationshipsStep';
import { StressStep } from '@/components/onboarding/StressStep';
import { TranscendenceStep } from '@/components/onboarding/TranscendenceStep';
import { LocationStep } from '@/components/onboarding/LocationStep';
import { CompletionStep } from '@/components/onboarding/CompletionStep';

const TOTAL_STEPS = 8;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialOnboardingData);

  const updateData = (section: keyof OnboardingData, value: any) => {
    setData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return (
          <MovementStep
            data={data.movement}
            onUpdate={(value) => updateData('movement', value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <NutritionStep
            data={data.nutrition}
            onUpdate={(value) => updateData('nutrition', value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <RelationshipsStep
            data={data.relationships}
            onUpdate={(value) => updateData('relationships', value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <StressStep
            data={data.stress}
            onUpdate={(value) => updateData('stress', value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <TranscendenceStep
            data={data.transcendence}
            onUpdate={(value) => updateData('transcendence', value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <LocationStep
            data={data.location}
            onUpdate={(value) => updateData('location', value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 8:
        return <CompletionStep data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cloud-300 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar (hidden on welcome and completion) */}
        {currentStep > 1 && currentStep < TOTAL_STEPS && (
          <div className="mb-8">
            <ProgressBar current={currentStep - 1} total={TOTAL_STEPS - 2} />
          </div>
        )}

        {/* Current step */}
        {renderStep()}
      </div>
    </div>
  );
}
