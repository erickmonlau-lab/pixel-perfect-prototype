export type TeamRole = 'owner' | 'admin' | 'member';

export interface TeamMember {
  id: string;
  email: string;
  name?: string;
  role: TeamRole;
  joinedAt: string;
}

export interface TeamWorkspace {
  id: string;
  name: string;
  ownerId: string;
  seatCount: number;
  members: TeamMember[];
  createdAt: string;
  stripeSubscriptionId?: string;
}

export interface TeamInvite {
  id: string;
  email: string;
  role: TeamRole;
  workspaceId: string;
  expiresAt: string;
}
