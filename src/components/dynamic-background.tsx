'use client';
import { useState, useEffect } from 'react';
import { getBackgroundAnimation } from '@/app/actions';
import { StarsBackground } from './backgrounds/stars';
import { ParticlesBackground } from './backgrounds/particles';
import { GradientBackground } from './backgrounds/gradient';

type AnimationType = 'stars' | 'particles' | 'gradient' | null;

export function DynamicBackground({ pageContent }: { pageContent: string }) {
  const [animation, setAnimation] = useState<AnimationType>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      async function fetchAnimation() {
        const animName = await getBackgroundAnimation(pageContent);
        // Ensure the returned name is one of the valid types
        if (['stars', 'particles', 'gradient'].includes(animName)) {
            setAnimation(animName as AnimationType);
        } else {
            setAnimation('stars'); // Fallback
        }
      }
      fetchAnimation();
    }
  }, [pageContent, isMounted]);

  const renderBackground = () => {
    switch (animation) {
      case 'stars':
        return <StarsBackground />;
      case 'particles':
        return <ParticlesBackground />;
      case 'gradient':
        return <GradientBackground />;
      default:
        // Render a static background during loading or as a fallback
        return <div className="absolute inset-0 bg-background transition-opacity duration-1000 opacity-100" />;
    }
  };

  return (
    <div className="fixed inset-0 -z-10 bg-background">
        {renderBackground()}
    </div>
  );
}
