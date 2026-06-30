export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Project {
  name: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface Honor {
  type: 'patent' | 'publication' | 'award';
  title: string;
  description: string;
  year: string;
}

export interface AvatarInfo {
  image?: string;
  initials?: string;
  alt?: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  tagline: string;
  experience: string;
  location: string;
  salary: string;
  wechat: string;
  phone: string;
  email: string;
  github: string;
  intro: string;
  coreTech: string[];
  skillCategories: SkillCategory[];
  projects: Project[];
  honors: Honor[];
}

export interface CardData extends ProfileInfo {
  avatar: AvatarInfo;
  profile: ProfileInfo;
}
