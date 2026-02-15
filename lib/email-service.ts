import { Resend } from 'resend';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  from?: string;
}

export class EmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not set');
    }
    this.resend = new Resend(apiKey);
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'duende <hello@duende.app>';
  }


  /**
   * Send a threshold alert to the user
   */
  async sendThresholdAlert(options: {
    to: string;
    userName: string;
    alertMessage: string;
    violationType: string;
  }): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const { to, userName, alertMessage, violationType } = options;

      const html = this.buildAlertEmailHtml(userName, alertMessage, violationType);
      const text = this.buildAlertEmailText(userName, alertMessage);

      const result = await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject: 'duende: calendar insight - your wellbeing',
        html,
        text,
      });

      return { success: true, messageId: result.data?.id };
    } catch (error: any) {
      console.error('Error sending threshold alert:', error);
      return { success: false, error: error.message };
    }
  }


  /**
   * Build HTML template for threshold alert
   */
  private buildAlertEmailHtml(
    userName: string,
    alertMessage: string,
    violationType: string
  ): string {
    const getSeverityColor = (type: string) => {
      if (type.includes('lunch') || type.includes('too_many')) return '#ef4444';
      if (type.includes('movement') || type.includes('buffer')) return '#f97316';
      return '#3b82f6';
    };

    const color = getSeverityColor(violationType);

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #2c3e50;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      border-bottom: 2px solid ${color};
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .logo {
      font-size: 24px;
      font-weight: 600;
      color: #4a5568;
    }
    .alert {
      background: #fef3f2;
      border-left: 4px solid ${color};
      padding: 16px;
      margin: 24px 0;
      border-radius: 4px;
    }
    .cta {
      margin-top: 24px;
      text-align: center;
    }
    .button {
      display: inline-block;
      background: ${color};
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
    }
    .footer {
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #718096;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">duende</div>
  </div>

  <div class="alert">
    <p><strong>hi ${userName},</strong></p>
    <p>${alertMessage}</p>
  </div>

  <div class="cta">
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/suggestions" class="button">
      view insights
    </a>
  </div>

  <div class="footer">
    <p>
      duende helps you understand patterns in your calendar and how they affect your wellbeing.
    </p>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Build plain text template for threshold alert
   */
  private buildAlertEmailText(userName: string, alertMessage: string): string {
    return `
hi ${userName},

${alertMessage}

view your insights: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/suggestions

---
duende helps you understand patterns in your calendar and how they affect your wellbeing.
    `.trim();
  }
}

/**
 * Send a threshold alert
 */
export async function sendThresholdAlert(options: {
  to: string;
  userName: string;
  alertMessage: string;
  violationType: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const emailService = new EmailService();
  return emailService.sendThresholdAlert(options);
}
