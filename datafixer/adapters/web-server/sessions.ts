import { Express } from 'express';
import sessions from 'client-sessions';

export type SessionContext = {
  // Should be a large, unguessable string.
  secret: string;

  // Session duration, in milliseconds.
  duration: number;
};

export const UseSession = (ctx: SessionContext) => (app: Express) => {
  app.use(
    sessions({
      cookieName: 'session',
      secret: ctx.secret,
      duration: ctx.duration,
    })
  );
};
