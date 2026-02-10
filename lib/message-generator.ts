import Anthropic from '@anthropic-ai/sdk';

interface MessageContext {
  userName: string;
  violationType: string;
  violationDescription: string;
  suggestedAction: string;
  recipientName?: string;
  recipientEmail?: string;
  meetingTitle?: string;
  currentTime?: string;
  newTime?: string;
}

export class MessageGenerator {
  private anthropic: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }
    this.anthropic = new Anthropic({ apiKey });
  }

  /**
   * Generate an advocacy message to send to someone on user's behalf
   */
  async generateAdvocacyMessage(context: MessageContext): Promise<string> {
    const prompt = this.buildAdvocacyPrompt(context);

    const message = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      temperature: 0.7,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const textContent = message.content.find(block => block.type === 'text');
    return textContent && 'text' in textContent ? textContent.text : '';
  }

  /**
   * Generate a threshold alert message to send to the user
   */
  async generateThresholdAlert(context: MessageContext): Promise<string> {
    const prompt = this.buildAlertPrompt(context);

    const message = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      temperature: 0.7,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const textContent = message.content.find(block => block.type === 'text');
    return textContent && 'text' in textContent ? textContent.text : '';
  }

  /**
   * Build prompt for education message (teaching about wellbeing)
   */
  private buildAdvocacyPrompt(context: MessageContext): string {
    const { userName, violationType, violationDescription, suggestedAction, recipientName, meetingTitle } = context;

    return `You are Duende, a wellbeing educator that helps people understand the importance of protecting their time and health. You're writing an educational message to ${userName} about why a calendar pattern matters for their wellbeing.

Context:
- Pattern: ${violationDescription}
- Why it matters: ${suggestedAction}
${meetingTitle ? `- Related to: "${meetingTitle}"` : ''}

Write a brief, warm, and encouraging message (2-3 sentences max) that:
1. Acknowledges the pattern they're experiencing
2. Gently explains the wellbeing impact (better focus, energy, relationships, decision-making)
3. Encourages them to prioritize their own needs without guilt
4. Uses lowercase, conversational tone
5. Is supportive and educational, not prescriptive

Do NOT:
- Take ownership or responsibility for the decision
- Apologize or be deferential
- Use corporate language
- Tell them what to do
- Include greetings or signatures

Focus on teaching them WHY their wellbeing matters. Just write the message body.`;
  }

  /**
   * Build prompt for wellbeing alert (to user)
   */
  private buildAlertPrompt(context: MessageContext): string {
    const { userName, violationType, violationDescription, suggestedAction } = context;

    return `You are Duende, a wellbeing guide that teaches people about healthy calendar practices. Write a brief, educational alert about a wellbeing pattern.

Pattern: ${violationDescription}
Why it matters: ${suggestedAction}

Write a SHORT, encouraging message (1-2 sentences) that:
1. Describes the pattern you're noticing
2. Explains the wellbeing benefit of addressing it (better energy, focus, relationships, health)
3. Encourages them to consider their own needs
4. Uses lowercase, friendly, non-judgmental tone
5. Is educational and supportive, not alarming

Do NOT:
- Tell them what to do
- Be long-winded
- Use corporate language
- Include greetings
- Suggest the AI will take action

Focus on teaching and encouraging. Just write the message.`;
  }
}

/**
 * Generate advocacy message for a specific violation
 */
export async function generateMessageForViolation(
  userName: string,
  violation: {
    type: string;
    description: string;
    suggestedAction?: string;
  },
  recipient?: {
    name: string;
    email: string;
  }
): Promise<{advocacy: string; alert: string}> {
  const generator = new MessageGenerator();

  const context: MessageContext = {
    userName,
    violationType: violation.type,
    violationDescription: violation.description,
    suggestedAction: violation.suggestedAction || '',
    recipientName: recipient?.name,
    recipientEmail: recipient?.email,
  };

  const [advocacy, alert] = await Promise.all([
    generator.generateAdvocacyMessage(context),
    generator.generateThresholdAlert(context),
  ]);

  return { advocacy, alert };
}
