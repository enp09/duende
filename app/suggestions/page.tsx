'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Suggestion {
  id: string;
  type: string;
  title: string;
  description: string | null;
  reasoning: string | null;
  draftMessage: string | null;
  defaultSetting: string | null;
  status: string;
  createdAt: Date;
}

export default function SuggestionsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatingMessageFor, setGeneratingMessageFor] = useState<string | null>(null);
  const [sendingMessageFor, setSendingMessageFor] = useState<string | null>(null);
  const [recipientEmails, setRecipientEmails] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Wait for session to load
    if (status === 'loading') return;

    const userId = session?.user?.id;

    if (!userId) {
      setIsLoading(false);
      return;
    }

    loadSuggestions(userId);
  }, [session, status]);

  const loadSuggestions = async (userId: string) => {
    try {
      const response = await fetch(`/api/suggestions?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Error loading suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeCalendar = async () => {
    const userId = session?.user?.id;
    if (!userId) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/advocacy/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (data.success) {
        await loadSuggestions(userId);
      }
    } catch (error) {
      console.error('Error analyzing calendar:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateMessage = async (suggestionId: string) => {
    setGeneratingMessageFor(suggestionId);

    try {
      const response = await fetch('/api/advocacy/generate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestionId }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the suggestion in the list with the generated message
        setSuggestions(prev =>
          prev.map(s =>
            s.id === suggestionId
              ? { ...s, draftMessage: data.messages.advocacy }
              : s
          )
        );
      }
    } catch (error) {
      console.error('Error generating message:', error);
    } finally {
      setGeneratingMessageFor(null);
    }
  };

  const handleSendMessage = async (suggestionId: string) => {
    const recipientEmail = recipientEmails[suggestionId];

    if (!recipientEmail) {
      alert('Please enter a recipient email address');
      return;
    }

    // Basic email validation
    if (!recipientEmail.includes('@') || !recipientEmail.includes('.')) {
      alert('Please enter a valid email address');
      return;
    }

    setSendingMessageFor(suggestionId);

    try {
      const response = await fetch('/api/advocacy/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suggestionId,
          recipientEmail,
          sendAlertToUser: false,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Remove suggestion from list after successful send
        setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
        // Show success message (could be enhanced with a toast notification)
        alert('Message sent successfully!');
      } else {
        alert(`Failed to send message: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Something went wrong while sending the message');
    } finally {
      setSendingMessageFor(null);
    }
  };

  const handleAccept = async (suggestionId: string) => {
    try {
      await fetch('/api/suggestions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestionId, status: 'accepted' }),
      });

      setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    } catch (error) {
      console.error('Error accepting suggestion:', error);
    }
  };

  const handleDismiss = async (suggestionId: string) => {
    try {
      await fetch('/api/suggestions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestionId, status: 'dismissed' }),
      });

      setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    } catch (error) {
      console.error('Error dismissing suggestion:', error);
    }
  };

  const getSeverityColor = (type: string) => {
    if (type.includes('lunch') || type.includes('too_many')) return 'border-red-300 bg-red-50';
    if (type.includes('movement') || type.includes('buffer')) return 'border-orange-300 bg-orange-50';
    return 'border-blue-300 bg-blue-50';
  };

  const getSettingLabel = (setting: string | null) => {
    const labels: { [key: string]: string } = {
      movement: 'movement',
      nutrition: 'nutrition',
      relationships: 'connection',
      stress: 'buffers',
      transcendence: 'growth',
    };
    return labels[setting || ''] || 'wellbeing';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-royal-500">loading suggestions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-cloud-300 to-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo.svg" alt="duende" width={50} height={50} priority className="cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-3xl font-serif text-royal-500">duende thinks</h1>
              <p className="text-royal-600 text-sm">wellbeing insights and calendar patterns</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => router.push('/planning')}>
              planning
            </Button>
            <Button variant="ghost" onClick={() => router.push('/settings')}>
              settings
            </Button>
          </div>
        </div>

        {/* Analyze Button */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-royal-500 font-medium mb-1">check your calendar</p>
              <p className="text-sm text-royal-600">
                duende will analyze the next 7 days and share wellbeing insights
              </p>
            </div>
            <Button onClick={handleAnalyzeCalendar} disabled={isAnalyzing}>
              {isAnalyzing ? 'analyzing...' : 'analyze calendar'}
            </Button>
          </div>
        </Card>

        {/* Suggestions List */}
        {suggestions.length === 0 ? (
          <Card className="bg-orange-50 border-orange-200">
            <div className="text-center py-8">
              <p className="text-royal-500 text-lg mb-2">✓ looking good</p>
              <p className="text-royal-600 text-sm">
                your calendar looks balanced right now. click "analyze calendar" above to check again.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-royal-500">
              {suggestions.length} wellbeing {suggestions.length === 1 ? 'insight' : 'insights'}
            </h2>

            {suggestions.map((suggestion) => (
              <Card key={suggestion.id} className={getSeverityColor(suggestion.type)}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs uppercase tracking-wide text-royal-400">
                          protecting: {getSettingLabel(suggestion.defaultSetting)}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-royal-500">{suggestion.title}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-royal-600">{suggestion.description}</p>

                  {/* Suggested Action */}
                  {suggestion.reasoning && (
                    <div className="bg-white border border-royal-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-royal-500 mb-1">why this matters:</p>
                      <p className="text-sm text-royal-600">{suggestion.reasoning}</p>
                    </div>
                  )}

                  {/* AI Generated Message */}
                  {suggestion.draftMessage ? (
                    <div className="bg-white border border-orange-300 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wide text-royal-400 mb-2">
                        educational message:
                      </p>
                      <p className="text-royal-600 leading-relaxed">{suggestion.draftMessage}</p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleGenerateMessage(suggestion.id)}
                      disabled={generatingMessageFor === suggestion.id}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      {generatingMessageFor === suggestion.id
                        ? 'generating with claude...'
                        : 'share this insight'}
                    </Button>
                  )}

                  {/* Recipient Email Input */}
                  {suggestion.draftMessage && (
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wide text-royal-400">
                        recipient email:
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={recipientEmails[suggestion.id] || ''}
                        onChange={(e) =>
                          setRecipientEmails(prev => ({
                            ...prev,
                            [suggestion.id]: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-royal-200 rounded-lg text-royal-500 placeholder-royal-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {suggestion.draftMessage ? (
                      <Button
                        onClick={() => handleSendMessage(suggestion.id)}
                        size="sm"
                        className="bg-royal-500 hover:bg-royal-600"
                        disabled={sendingMessageFor === suggestion.id}
                      >
                        {sendingMessageFor === suggestion.id
                          ? 'sending...'
                          : 'send message'}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAccept(suggestion.id)}
                        size="sm"
                        className="bg-royal-500 hover:bg-royal-600"
                      >
                        approve
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDismiss(suggestion.id)}
                      size="sm"
                      variant="ghost"
                    >
                      dismiss
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
