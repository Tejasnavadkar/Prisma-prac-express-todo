// custom.d.ts (or in a types directory)
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      email?: string;  // Add email property to the Request interface
    }
  }
}
