// Central TypeScript Type Definitions for Portfolio System

export type ThemeMode = 'dark' | 'system';

export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'glass'
  | 'gradient'
  | 'danger'
  | 'outline'
  | 'icon'
  | 'loading';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  iconName: string;
  action?: () => void;
}

export type ProjectCategory = 'All' | 'Backend' | 'Full Stack' | 'Deep Learning' | 'Other';

export interface Project {
  id: number | string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  architectureDetails?: string;
  technologies: string[];
  category: ProjectCategory;
  featured: boolean;
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  displayOrder?: number;
}

export interface Skill {
  id: number | string;
  name: string;
  category: 'Backend' | 'Frontend' | 'Languages' | 'Database' | 'Cloud & Tools';
  proficiencyPercentage: number;
  iconName?: string;
  featured?: boolean;
}

export interface Experience {
  id: number | string;
  company: string;
  role: string;
  type?: string;
  location?: string;
  period: string;
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  highlights: string[];
  responsibilities: string[];
  technologies: string[];
  challenges?: string;
  solutions?: string;
  keyLearnings?: string;
  architectureHighlights?: string;
  logoPlaceholder?: string;
}

export interface Certificate {
  id: number | string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  certificateCode?: string;
  imageUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T = any> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}
