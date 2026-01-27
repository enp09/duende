import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId, answers, protectionBlocks } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { settings: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate week start date (Monday of current week)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const weekStartDate = new Date(now.setDate(diff));
    weekStartDate.setHours(0, 0, 0, 0);

    // Save domain answers to UserSettings or create if doesn't exist
    if (answers) {
      const settingsData = {
        movementTypes: answers.movement ? [answers.movement] : [],
        wantsProtectedLunch: !!answers.nutrition,
        decompressMethods: answers.stress ? [answers.stress] : [],
        passionProjects: answers.transcendence ? [answers.transcendence] : [],
      };

      if (user.settings) {
        await prisma.userSettings.update({
          where: { userId },
          data: settingsData,
        });
      } else {
        await prisma.userSettings.create({
          data: {
            ...settingsData,
            userId,
          },
        });
      }

      // Save weekly intentions
      if (answers.intentions) {
        await prisma.intention.create({
          data: {
            userId,
            defaultSetting: 'intentions',
            description: answers.intentions,
            weekStartDate,
            status: 'pending',
          },
        });
      }
    }

    // Save protection blocks as calendar events (if provided)
    let savedBlocks = 0;
    if (protectionBlocks && Array.isArray(protectionBlocks)) {
      // First, delete existing duende-created blocks for this week
      await prisma.calendarEvent.deleteMany({
        where: {
          userId,
          blockedByDuende: true,
          startTime: {
            gte: weekStartDate,
          },
        },
      });

      // Create new protection blocks
      const blockPromises = protectionBlocks.map((block: any) => {
        // Convert day name and time to DateTime
        const dayMap: { [key: string]: number } = {
          Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
          Thursday: 4, Friday: 5, Saturday: 6,
        };

        const dayOffset = dayMap[block.day] - 1; // -1 because weekStartDate is Monday
        const blockDate = new Date(weekStartDate);
        blockDate.setDate(blockDate.getDate() + dayOffset);

        const [startHour, startMin] = block.startTime.split(':').map(Number);
        const [endHour, endMin] = block.endTime.split(':').map(Number);

        const startTime = new Date(blockDate);
        startTime.setHours(startHour, startMin, 0, 0);

        const endTime = new Date(blockDate);
        endTime.setHours(endHour, endMin, 0, 0);

        return prisma.calendarEvent.create({
          data: {
            userId,
            googleEventId: `duende-${block.id}-${Date.now()}`,
            calendarId: 'primary',
            title: block.title,
            startTime,
            endTime,
            isAllDay: false,
            blockedByDuende: true,
            isProtected: true,
          },
        });
      });

      const created = await Promise.all(blockPromises);
      savedBlocks = created.length;
    }

    return NextResponse.json({
      success: true,
      message: 'Planning data saved successfully',
      savedBlocks,
    });
  } catch (error: any) {
    console.error('Error saving planning data:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save planning data' },
      { status: 500 }
    );
  }
}
