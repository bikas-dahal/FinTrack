// schemas/types.ts
import { Session } from '@auth/core/types';

export interface AdditionalContext {
  user: Session['user'];
}

// You might want to extend ContextVariables from Hono
declare module 'hono' {
  interface ContextVariables extends AdditionalContext {}
}