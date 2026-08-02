import { Project, Service } from '@/data/portfolioData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiSelectedWork {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags?: string[] | null;
  featured_image: string | null;
  project_url: string | null;
  published: boolean;
  sort_order: number;
}

export interface ApiHomepageSelectedWork {
  id: number;
  title: string;
  subtitle: string;
  featured_image: string | null;
}

export interface HomepageCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface ApiService {
  id: number;
  title: string;
  description: string;
  list_sub_services: string[];
  published: boolean;
  sort_order: number;
}

export async function fetchHomepageSelectedWorks(): Promise<HomepageCard[]> {
  const response = await fetch(`${API_BASE_URL}/api/selected-works/homepage`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch homepage selected works: ${response.statusText}`);
  }

  const json: { data: ApiHomepageSelectedWork[] } = await response.json();

  return json.data.map((item) => ({
    id: `hp-card-${item.id}`,
    title: item.title,
    subtitle: item.subtitle,
    image: item.featured_image || '/assets/hero_card_5.webp',
  }));
}

export async function fetchSelectedWorks(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/api/selected-works`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch selected works: ${response.statusText}`);
  }

  const json: { data: ApiSelectedWork[] } = await response.json();

  return json.data.map((item) => ({
    id: String(item.id),
    title: item.title,
    category: item.subtitle,
    tagline: item.subtitle,
    description: item.description,
    longDescription: item.description,
    tags: Array.isArray(item.tags) ? item.tags : [],
    year: '',
    featured: true,
    image: item.featured_image || '/assets/hero_card_5.webp',
    demoUrl: item.project_url || undefined,
  }));
}

export async function fetchServices(): Promise<Service[]> {
  const response = await fetch(`${API_BASE_URL}/api/services`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch services: ${response.statusText}`);
  }

  const json: { data: ApiService[] } = await response.json();

  return json.data.map((item, index) => ({
    id: String(item.id),
    number: String(index + 1).padStart(2, '0'),
    title: item.title,
    description: item.description,
    features: item.list_sub_services || [],
    iconName: 'Code2',
  }));
}
