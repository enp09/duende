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
   * Build prompt for advocacy message (to others)
   */
  private buildAdvocacyPrompt(context: MessageContext): string {
    const { userName, violationType, violationDescription, suggestedAction, recipientName, meetingTitle } = context;

    return `You are Duende, an AI assistant that advocates for someone's humanity by managing their calendar. You need to write a short, warm email on behalf of ${userName}.

Context:
- Issue: ${violationDescription}
- Suggested action: ${suggestedAction}
${recipientName ? `- Recipient: ${recipientName}` : ''}
${meetingTitle ? `- Meeting: "${meetingTitle}"` : ''}

Write a brief, friendly email (2-3 sentences max) that:
1. Starts with "hi [name], duende here for ${userName}"
2. Explains the situation simply (they're overbooked / need to walk / need lunch)
3. Makes a specific, kind request
4. Frames it as beneficial for both people ("they'll be more present" / "better conversation" / "more focused")
5. Uses lowercase, conversational tone
6. Is warm but not apologetic

Do NOT:
- Apologize or be overly deferential
- Use corporate language
- Be longer than 3 sentences
- Include greetings or signatures

Just write the email body.`;
  }

  /**
   * Build prompt for threshold alert (to user)
   */
  private buildAlertPrompt(context: MessageContext): string {
    const { userName, violationType, violationDescription, suggestedAction } = context;

    return `You are Duende, an AI assistant helping ${userName} protect their humanity. Write a brief alert about a calendar threshold being crossed.

Issue: ${violationDescription}
Suggested fix: ${suggestedAction}

Write a SHORT, direct alert (1-2 sentences) that:
1. States the problem clearly
2. Asks if they want Duende to help
3. Uses lowercase, friendly tone
4. Is calm, not alarming
5. Ends with a simple question like "want me to suggest moving something?"

Do NOT:
- Be long-winded
- Use corporate language
- Include greetings
- Be alarmist

Just write the alert message.`;
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
