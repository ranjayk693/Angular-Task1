export interface Employee {
  id: number;
  name: string;
  email: string;
  contact: string;
  gender: string;
  skills: Skill[];
}

export interface Skill {
  skill: string;
  experience: string;
}
