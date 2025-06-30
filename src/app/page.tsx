import { ProfileSection } from '@/components/profile-section';
import { ProjectsSection } from '@/components/projects-section';
import { DynamicBackground } from '@/components/dynamic-background';
import { profileData, getProjects } from '@/lib/data';

export default async function Home() {
  const projectsData = await getProjects();

  const pageContent = `
    Profile: ${profileData.name}. ${profileData.bio}. Skills: ${profileData.skills.join(', ')}.
    Projects: ${projectsData.map(p => `${p.title}: ${p.description}`).join('. ')}
  `;

  return (
    <>
      <DynamicBackground pageContent={pageContent} />
      <main className="container mx-auto px-4 md:px-6 z-10 flex-grow">
        <div className="space-y-16 md:space-y-24 py-12 md:py-16">
          <ProfileSection />
          <ProjectsSection projects={projectsData} />
        </div>
      </main>
      <footer className="container mx-auto px-4 md:px-6 py-6 text-center text-muted-foreground z-10">
        <p>&copy; {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
      </footer>
    </>
  );
}
