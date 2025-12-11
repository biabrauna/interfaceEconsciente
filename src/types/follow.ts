export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface Follower {
  id: string;
  name: string;
  email: string;
  pontos: number;
  biografia?: string;
}
