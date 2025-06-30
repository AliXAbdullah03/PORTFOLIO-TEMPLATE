import { Github, Linkedin, Mail, Instagram, type Icon } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  hint: string;
  url: string;
  tags: string[];
}

export interface Profile {
  name: string;
  bio: string;
  contact: {
    email: string;
  };
  skills: string[];
  socials: {
    name: string;
    url: string;
    icon: Icon;
  }[];
}

export const profileData: Profile = {
  name: "Ali Abdullah",
  bio: "A pioneering AI Engineer passionate about building intelligent systems that solve real-world problems. I specialize in large language models and generative AI.",
  contact: {
    email: "ali.abdullah@example.com",
  },
  skills: ["Python", "PyTorch", "TensorFlow", "Genkit", "Next.js", "LangChain", "LLMs", "Generative AI", "TypeScript", "TailwindCSS"],
  socials: [
    { name: "GitHub", url: "https://github.com", icon: Github },
    { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
    { name: "Instagram", url: "https://instagram.com", icon: Instagram },
  ],
};

const projectsFilePath = path.join(process.cwd(), 'src/lib/data/projects.json');

async function readProjects(): Promise<Project[]> {
  try {
    const fileContent = await fs.readFile(projectsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2));
}

export async function getProjects(): Promise<Project[]> {
  return await readProjects();
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await readProjects();
  return projects.find(p => p.id === id);
}

export async function saveProject(projectData: Omit<Project, 'id'> & { id?: string }): Promise<Project> {
  const projects = await readProjects();
  if (projectData.id) {
    // Update existing project
    const index = projects.findIndex(p => p.id === projectData.id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...projectData };
      await writeProjects(projects);
      return projects[index];
    }
    throw new Error('Project not found');
  } else {
    // Create new project
    const newProject: Project = { ...projectData, id: randomUUID() };
    projects.push(newProject);
    await writeProjects(projects);
    return newProject;
  }
}

export async function deleteProjectById(id: string): Promise<void> {
  const projects = await readProjects();
  const updatedProjects = projects.filter(p => p.id !== id);
  await writeProjects(updatedProjects);
}
