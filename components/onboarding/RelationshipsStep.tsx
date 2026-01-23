import { useState } from 'react';
import { RelationshipData } from '@/types/onboarding';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Radio } from '@/components/ui/Radio';

interface RelationshipsStepProps {
  data: RelationshipData[];
  onUpdate: (data: RelationshipData[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function RelationshipsStep({ data, onUpdate, onNext, onBack }: RelationshipsStepProps) {
  const [step, setStep] = useState(1);
  const [relationships, setRelationships] = useState<RelationshipData[]>(data);
  const [currentName, setCurrentName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const updateRelationships = (updated: RelationshipData[]) => {
    setRelationships(updated);
    onUpdate(updated);
  };

  const addRelationship = () => {
    if (currentName.trim()) {
      const newRelationship: RelationshipData = {
        name: currentName.trim(),
      };
      updateRelationships([...relationships, newRelationship]);
      setCurrentName('');
      setEditingIndex(relationships.length);
      setStep(2);
    }
  };

  const updateRelationship = (index: number, field: keyof RelationshipData, value: string) => {
    const updated = [...relationships];
    updated[index] = { ...updated[index], [field]: value };
    updateRelationships(updated);
  };

  const removeRelationship = (index: number) => {
    const updated = relationships.filter((_, i) => i !== index);
    updateRelationships(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setStep(1);
    }
  };

  const handleNext = () => {
    if (editingIndex !== null) {
      setEditingIndex(null);
      setStep(1);
    } else {
      onNext();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Step 1: Add names */}
      {step === 1 && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-500">
              who are your closest people?
            </h2>
            <p className="text-royal-600">
              the ones who really matter to you
            </p>
          </div>

          <Card>
            <p className="text-sm text-royal-600 mb-4">
              just the people you want to make sure you stay connected with
            </p>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="enter a name"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addRelationship();
                    }
                  }}
                />
                <Button onClick={addRelationship} disabled={!currentName.trim()}>
                  add
                </Button>
              </div>

              {relationships.length > 0 && (
                <div className="space-y-2 pt-4">
                  {relationships.map((rel, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-cloud-200 rounded-lg"
                    >
                      <span className="text-royal-500">{rel.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingIndex(index);
                            setStep(2);
                          }}
                          className="text-royal-600 hover:text-royal-500 text-sm"
                        >
                          edit
                        </button>
                        <button
                          onClick={() => removeRelationship(index)}
                          className="text-orange-600 hover:text-orange-800 text-sm"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-royal-50 border-royal-200">
            <p className="text-royal-500 text-sm leading-relaxed">
              humans evolved in tribes of 50-150. your nervous system literally
              calms with people you trust. that's biology, not soft.
            </p>
          </Card>
        </>
      )}

      {/* Step 2: Edit relationship details */}
      {step === 2 && editingIndex !== null && (
        <>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-royal-500">
              tell me about {relationships[editingIndex].name}
            </h2>
          </div>

          <Card className="space-y-6">
            <div>
              <p className="text-sm text-royal-500 mb-3">relationship:</p>
              <div className="space-y-3">
                <Radio
                  label="friend"
                  name="relationshipType"
                  value="friend"
                  checked={relationships[editingIndex].relationshipType === 'friend'}
                  onChange={(e) => updateRelationship(editingIndex, 'relationshipType', e.target.value)}
                />
                <Radio
                  label="family"
                  name="relationshipType"
                  value="family"
                  checked={relationships[editingIndex].relationshipType === 'family'}
                  onChange={(e) => updateRelationship(editingIndex, 'relationshipType', e.target.value)}
                />
                <Radio
                  label="partner"
                  name="relationshipType"
                  value="partner"
                  checked={relationships[editingIndex].relationshipType === 'partner'}
                  onChange={(e) => updateRelationship(editingIndex, 'relationshipType', e.target.value)}
                />
                <Radio
                  label="close colleague"
                  name="relationshipType"
                  value="colleague"
                  checked={relationships[editingIndex].relationshipType === 'colleague'}
                  onChange={(e) => updateRelationship(editingIndex, 'relationshipType', e.target.value)}
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-royal-500 mb-3">how often do you want to connect?</p>
              <div className="space-y-3">
                <Radio
                  label="weekly"
                  name="frequency"
                  value="weekly"
                  checked={relationships[editingIndex].desiredFrequency === 'weekly'}
                  onChange={(e) => updateRelationship(editingIndex, 'desiredFrequency', e.target.value)}
                />
                <Radio
                  label="every couple weeks"
                  name="frequency"
                  value="biweekly"
                  checked={relationships[editingIndex].desiredFrequency === 'biweekly'}
                  onChange={(e) => updateRelationship(editingIndex, 'desiredFrequency', e.target.value)}
                />
                <Radio
                  label="monthly"
                  name="frequency"
                  value="monthly"
                  checked={relationships[editingIndex].desiredFrequency === 'monthly'}
                  onChange={(e) => updateRelationship(editingIndex, 'desiredFrequency', e.target.value)}
                />
                <Radio
                  label="no preference"
                  name="frequency"
                  value="none"
                  checked={relationships[editingIndex].desiredFrequency === 'none'}
                  onChange={(e) => updateRelationship(editingIndex, 'desiredFrequency', e.target.value)}
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-royal-500 mb-3">how do you feel after spending time with them?</p>
              <div className="space-y-3">
                <Radio
                  label="energized"
                  name="energy"
                  value="energized"
                  checked={relationships[editingIndex].energyImpact === 'energized'}
                  onChange={(e) => updateRelationship(editingIndex, 'energyImpact', e.target.value)}
                />
                <Radio
                  label="neutral / depends"
                  name="energy"
                  value="neutral"
                  checked={relationships[editingIndex].energyImpact === 'neutral'}
                  onChange={(e) => updateRelationship(editingIndex, 'energyImpact', e.target.value)}
                />
                <Radio
                  label="drained (but i care about them)"
                  name="energy"
                  value="drained"
                  checked={relationships[editingIndex].energyImpact === 'drained'}
                  onChange={(e) => updateRelationship(editingIndex, 'energyImpact', e.target.value)}
                />
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          back
        </Button>
        {step === 1 ? (
          <Button onClick={onNext}>
            {relationships.length > 0 ? 'next section' : 'skip for now'}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            save
          </Button>
        )}
      </div>
    </div>
  );
}
