export interface BaseObj extends Record<string, unknown> {
  id: string;
}

export class BaseModel implements BaseObj {
  [x: string]: unknown;
  id: string;
}
