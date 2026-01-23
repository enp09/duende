import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // For MVP, we'll create a user with a temporary email
    // Later this will be replaced with actual authentication
    const tempEmail = `user_${Date.now()}@duende.app`;

    // Create user with settings and relationships in a transaction
    const user = await prisma.user.create({
      data: {
        email: tempEmail,
        city: data.location.city,
        timezone: data.location.timezone,
        onboardingCompleted: true,
        onboardedAt: new Date(),
        settings: {
          create: {
            // Movement
            movementTypes: data.movement.movementTypes,
            preferredMovementTime: data.movement.preferredMovementTime,
            enjoysOutdoors: data.movement.enjoysOutdoors === 'yes',
            allowsWalkingMeetings: data.movement.allowsWalkingMeetings === 'love' || data.movement.allowsWalkingMeetings === 'open',

            // Nutrition
            wantsProtectedLunch: data.nutrition.wantsProtectedLunch === 'yes' || data.nutrition.wantsProtectedLunch === 'flexible',
            preferredLunchTime: data.nutrition.preferredLunchTime,
            eatsAtDesk: data.nutrition.eatsAtDesk === 'yes',

            // Stress
            decompressMethods: data.stress.decompressMethods,
            maxMeetingHoursPerDay: data.stress.maxMeetingHoursPerDay,
            wantsBufferTime: data.stress.wantsBufferTime !== 'no',
            bufferMinutes: data.stress.bufferMinutes,

            // Transcendence
            passionProjects: data.transcendence.passionProjects ? [data.transcendence.passionProjects] : [],
            learningGoals: data.transcendence.learningGoals ? [data.transcendence.learningGoals] : [],
          },
        },
        relationships: {
          create: data.relationships.map((rel: any) => ({
            name: rel.name,
            relationshipType: rel.relationshipType || 'friend',
            isCloseConnection: true,
            desiredFrequency: rel.desiredFrequency,
            energyImpact: rel.energyImpact,
          })),
        },
      },
      include: {
        settings: true,
        relationships: true,
      },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      message: 'onboarding completed successfully',
    });
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    return NextResponse.json(
      { success: false, error: 'failed to save onboarding data' },
      { status: 500 }
    );
  }
}
