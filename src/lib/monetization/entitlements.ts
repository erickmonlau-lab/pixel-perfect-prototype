import type { FeatureKey, UserPlan, UserSubscription } from './types';

export const DEFAULT_FREE_SUBSCRIPTION: UserSubscription = {
  plan: 'free',
  status: 'none',
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  stripeCustomerId: null,
  stripeSubscriptionId: null,
};

let currentSubscription: UserSubscription = { ...DEFAULT_FREE_SUBSCRIPTION };

export function getUserSubscription(): UserSubscription {
  return currentSubscription;
}

export function setUserSubscription(sub: UserSubscription): void {
  currentSubscription = sub;
}

export function getUserPlan(): UserPlan {
  return currentSubscription.plan;
}

export function isPremium(plan: UserPlan = getUserPlan()): boolean {
  return plan === 'premium' || plan === 'team' || plan === 'admin';
}

export function isTeam(plan: UserPlan = getUserPlan()): boolean {
  return plan === 'team' || plan === 'admin';
}

export function hasFeature(feature: FeatureKey, plan: UserPlan = getUserPlan()): boolean {
  switch (feature) {
    case 'no_ads':
    case 'priority_processing':
      return isPremium(plan);
    case 'batch_processing':
    case 'ai_advanced':
    case 'workflows':
      return isPremium(plan);
    case 'team_workspaces':
      return isTeam(plan);
    case 'api_access':
      return plan === 'admin';
    default:
      return false;
  }
}

export function shouldShowAds(plan: UserPlan = getUserPlan()): boolean {
  return !hasFeature('no_ads', plan);
}
