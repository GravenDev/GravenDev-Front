/* eslint-disable semi */
export default interface Tag {
  id?: number;
  icon: string;
  name: string;
  color: string | undefined;
}

export interface TagSuggestion {
  name: string;
  icon?: string;
}
