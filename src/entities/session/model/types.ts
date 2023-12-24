export type SessionSliceState =
  | {
      accessToken: string;
      isAuthorized: true;
      role: Role;
      firstName: string;
      lastName: string;
    }
  | {
      accessToken?: string;
      isAuthorized: false;
      role?: Role;
      firstName?: string;
      lastName?: string;
    };

export type Session =
  | {
      accessToken: string;
      isAuthorized: true;
      role: Role;
      firstName: string;
      lastName: string;
    }
  | {
      accessToken?: string;
      isAuthorized: false;
      role?: Role;
      firstName?: string;
      lastName?: string;
    };

export type SessionUserId = string;

export type Role = "moderator" | "user";
