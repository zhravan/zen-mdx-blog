import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
// import { loadYaml } from './yaml-loader';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  roles?: string[];
  period?: string;
}

const projectsPath = path.join(process.cwd(), 'config', 'projects.yaml');

let cache: Project[] | null = null;

export function getProjects(): Project[] {
  if (cache) return cache;

  if (!fs.existsSync(projectsPath)) {
    cache = [];
    return cache;
  }

  const file = fs.readFileSync(projectsPath, 'utf8');
  const data = YAML.parse(file) as any;

  if (!Array.isArray(data)) {
    cache = [];
    return cache;
  }

  cache = data.map((p) => ({
    title: String(p.title || ''),
    description: String(p.description || ''),
    tech: Array.isArray(p.tech) ? p.tech.map(String) : [],
    link: String(p.link || ''),
    roles: Array.isArray(p.roles) ? p.roles.map(String) : undefined,
    period: p.period ? String(p.period) : undefined
  }));

  return cache;
}
