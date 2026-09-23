export type UserPlan = 'free' | 'premium' | 'team' | 'admin';

export type FeatureKey =
  | 'batch_processing'
  | 'no_ads'
  | 'ai_advanced'
  | 'workflows'
  | 'priority_processing'
  | 'team_workspaces'
  | 'api_access';

export interface UserSubscription {
  plan: UserPlan;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'none';
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
}

export interface UserProfile {
  id: string;
  email?: string;
  subscription: UserSubscription;
}

export interface PlanFeatureItem {
  key?: FeatureKey;
  label: Record<'es' | 'ca' | 'en', string>;
  included: boolean;
  isComingSoon?: boolean;
}

export interface PlanDefinition {
  id: UserPlan;
  name: Record<'es' | 'ca' | 'en', string>;
  tagline: Record<'es' | 'ca' | 'en', string>;
  badge?: Record<'es' | 'ca' | 'en', string>;
  isPopular?: boolean;
  status: 'active' | 'coming_soon';
  features: PlanFeatureItem[];
}
