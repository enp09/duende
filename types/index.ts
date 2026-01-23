// Core types based on duende product spec

export type DefaultSetting = 'movement' | 'nutrition' | 'relationships' | 'stress' | 'transcendence';

export type IntentionStatus = 'pending' | 'scheduled' | 'completed' | 'dismissed';

export type SuggestionType =
  | 'shorten'
  | 'async'
  | 'reschedule'
  | 'batch'
  | 'buffer'
  | 'walking'
  | 'protect_lunch'
  | 'movement'
  | 'relationship_nudge';

export type SuggestionStatus = 'pending' | 'accepted' | 'dismissed' | 'expired';

export type ConversationRole = 'user' | 'assistant' | 'system';
