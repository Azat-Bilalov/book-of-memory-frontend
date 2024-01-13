export type SessionSliceState =
  | {
      accessToken: string;
      isAuthorized: true;
      role: Role;
      firstName: string;
      lastName: string;
      userId: SessionUserId;
    }
  | {
      accessToken?: string;
      isAuthorized: false;
      role?: Role;
      firstName?: string;
      lastName?: string;
      userId?: SessionUserId;
    };

export type Session =
  | {
      accessToken: string;
      isAuthorized: true;
      role: Role;
      firstName: string;
      lastName: string;
      userId: SessionUserId;
    }
  | {
      accessToken?: string;
      isAuthorized: false;
      role?: Role;
      firstName?: string;
      lastName?: string;
      userId?: SessionUserId;
    };

export type SessionUserId = string;

export type Role = "moderator" | "user";
