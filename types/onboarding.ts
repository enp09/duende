export interface MovementPreferences {
  movementTypes: string[];
  preferredMovementTime: string;
  enjoysOutdoors: string;
  allowsWalkingMeetings: string;
}

export interface NutritionPreferences {
  wantsProtectedLunch: string;
  preferredLunchTime?: string;
  eatsAtDesk: string;
}

export interface RelationshipData {
  name: string;
  relationshipType?: string;
  desiredFrequency?: string;
  energyImpact?: string;
}

export interface StressPreferences {
  decompressMethods: string[];
  maxMeetingHoursPerDay: number;
  wantsBufferTime: string;
  bufferMinutes?: number;
}

export interface TranscendenceData {
  passionProjects: string;
  learningGoals: string;
}

export interface LocationData {
  city: string;
  timezone: string;
}

export interface OnboardingData {
  movement: MovementPreferences;
  nutrition: NutritionPreferences;
  relationships: RelationshipData[];
  stress: StressPreferences;
  transcendence: TranscendenceData;
  location: LocationData;
}

export const initialOnboardingData: OnboardingData = {
  movement: {
    movementTypes: [],
    preferredMovementTime: '',
    enjoysOutdoors: '',
    allowsWalkingMeetings: '',
  },
  nutrition: {
    wantsProtectedLunch: '',
    preferredLunchTime: '',
    eatsAtDesk: '',
  },
  relationships: [],
  stress: {
    decompressMethods: [],
    maxMeetingHoursPerDay: 6,
    wantsBufferTime: '',
    bufferMinutes: 10,
  },
  transcendence: {
    passionProjects: '',
    learningGoals: '',
  },
  location: {
    city: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
};
