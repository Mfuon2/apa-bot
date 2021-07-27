export interface SavedSession {
  userId: string;
  steps: Steps[];
}

export interface Steps {
  from: string;
  handler: any;
}
