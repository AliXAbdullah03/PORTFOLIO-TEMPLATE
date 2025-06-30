import { profileData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function ProfileSection() {
  return (
    <section id="profile" className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary shadow-lg">
        <AvatarImage src="/profile.jpg" alt={profileData.name} />
        <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="text-center md:text-left">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">{profileData.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{profileData.bio}</p>
        
        <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
          {profileData.skills.map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center md:justify-start items-center gap-4">
          <Button asChild>
            <a href={`mailto:${profileData.contact.email}`}>
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </a>
          </Button>
          <div className="flex items-center gap-4">
            {profileData.socials.map((social) => (
              <Button key={social.name} asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Link href={social.url} target="_blank" aria-label={social.name}>
                  <social.icon className="h-5 w-5" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
