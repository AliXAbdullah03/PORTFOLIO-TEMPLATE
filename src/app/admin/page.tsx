import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProjects } from '@/lib/data';
import { FolderKanban, Star } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const projects = await getProjects();
  const featuredProject = projects[0];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back! Here's a summary of your portfolio.</p>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              projects are currently showcased
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Featured Skills
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredProject?.tags[0] ?? 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              is a primary skill in your top project
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-headline font-semibold mb-4">Quick Actions</h2>
        <div className="text-muted-foreground">
            <p>You can manage your projects from the <Link href="/admin/projects" className="text-primary hover:underline">Projects</Link> tab in the sidebar.</p>
            <p className="mt-2">Editing profile data and skills still requires code changes in `src/lib/data.ts`.</p>
        </div>
      </div>
    </div>
  );
}
