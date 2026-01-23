import { NextRequest, NextResponse } from 'next/server';
import { getGoogleAuthUrl } from '@/lib/google';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'user id required' },
        { status: 400 }
      );
    }

    // Store userId in state parameter to retrieve after OAuth
    const authUrl = getGoogleAuthUrl();
    const urlWithState = `${authUrl}&state=${encodeURIComponent(userId)}`;

    return NextResponse.json({
      success: true,
      authUrl: urlWithState,
    });
  } catch (error) {
    console.error('Error generating Google auth URL:', error);
    return NextResponse.json(
      { success: false, error: 'failed to generate auth url' },
      { status: 500 }
    );
  }
}
