export type Session =
  | {
      accessToken: string;
      isAuthorized: true;
      role: Role;
    }
  | {
      isAuthorized: false;
      accessToken?: string;
      role?: Role;
    };

export type SessionUserId = string;

export type Role = "moderator" | "user";
