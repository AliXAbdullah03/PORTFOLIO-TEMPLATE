import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getProjects } from '@/lib/data';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { DeleteProjectButton } from '@/components/delete-project-button';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h1 className="text-3xl font-headline font-bold">Projects</h1>
         <Button asChild>
           <Link href="/admin/projects/new">
             <PlusCircle className="mr-2 h-4 w-4" /> Add Project
           </Link>
         </Button>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>
            A list of all the projects currently on your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                      {project.tags.length > 3 && <Badge variant="outline">+{project.tags.length - 3}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                           <Link href={`/admin/projects/edit/${project.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <Link href={project.url} target="_blank">View on site</Link>
                        </DropdownMenuItem>
                        <DeleteProjectButton projectId={project.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
