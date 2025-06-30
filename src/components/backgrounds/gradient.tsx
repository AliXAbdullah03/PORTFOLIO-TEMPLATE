'use client';
import { cn } from '@/lib/utils';

export function GradientBackground() {
  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden',
        'bg-gradient-to-br from-background via-secondary/50 to-background',
        'animate-[gradient-xy_15s_ease_infinite]'
      )}
      style={{
        backgroundSize: '400% 400%',
      }}
    >
        <style>
            {`
            @keyframes gradient-xy {
                0%, 100% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
            }
            `}
        </style>
    </div>
  );
}
