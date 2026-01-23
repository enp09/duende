import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-serif text-sage-800">
          duende
        </h1>
        <p className="text-xl text-sage-600 leading-relaxed max-w-lg mx-auto">
          the caring membrane between humans and their time
        </p>
      </div>

      {/* Main content */}
      <Card className="space-y-6">
        <p className="text-lg text-sage-700 leading-relaxed">
          duende is a caring membrane between you, your calendar, and other people.
        </p>

        <p className="text-sage-700 leading-relaxed">
          we're here to protect your humanity. movement, nourishment, connection, calm, growth.
        </p>

        <div className="space-y-2 text-sage-700">
          <p>only suggestions.</p>
          <p>you always decide.</p>
          <p>kindness as the default.</p>
        </div>
      </Card>

      {/* Transparency statement */}
      <Card className="bg-terracotta-50 border-terracotta-200">
        <p className="text-sage-800 italic leading-relaxed">
          "duende optimizes for your humanity. movement, nourishment, connection, calm, growth."
        </p>
      </Card>

      {/* CTA */}
      <div className="flex justify-center pt-4">
        <Button onClick={onNext} size="lg">
          start conversation
        </Button>
      </div>
    </div>
  );
}
