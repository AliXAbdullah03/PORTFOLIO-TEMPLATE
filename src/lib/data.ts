import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import type { Icon } from 'lucide-react';

export interface Project {
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
  skills: ["Python", "PyTorch", "TensorFlow", "Genkit", "Next.js", "LangChain", "LLMs", "Generative AI"],
  socials: [
    { name: "GitHub", url: "https://github.com", icon: Github },
    { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
    { name: "Instagram", url: "https://instagram.com", icon: Instagram },
  ],
};

export const projectsData: Project[] = [
  {
    title: "AI-Powered Content Generation",
    description: "Developed a system that uses LLMs to generate high-quality marketing copy and articles. Integrated with a custom CMS for seamless content creation and management.",
    image: "https://placehold.co/1280x720.png",
    hint: "robot writing",
    url: "#",
    tags: ["Generative AI", "LLM", "Content Creation"],
  },
  {
    title: "Intelligent Chatbot Assistant",
    description: "Built a conversational AI chatbot for customer support, capable of understanding context and providing accurate, human-like responses. Reduced support ticket volume by 40%.",
    image: "https://placehold.co/1280x720.png",
    hint: "chatbot conversation",
    url: "#",
    tags: ["Conversational AI", "NLP", "Firebase"],
  },
  {
    title: "Image Recognition for Retail",
    description: "An AI model that identifies products on shelves to automate inventory management. Achieved 98% accuracy in identifying and counting items from images.",
    image: "https://placehold.co/1280x720.png",
    hint: "retail analytics",
    url: "#",
    tags: ["Computer Vision", "PyTorch", "Retail Tech"],
  },
  {
    title: "Generative Art Platform",
    description: "A web platform where users can generate unique pieces of art by providing text prompts. Utilizes diffusion models to create visually stunning images from descriptions.",
    image: "https://placehold.co/1280x720.png",
    hint: "abstract art",
    url: "#",
    tags: ["Generative AI", "Diffusion Models", "Next.js"],
  },
];
