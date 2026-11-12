import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register public plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

// Global configuration
gsap.ticker.lagSmoothing(0);

// Cinematic eases
// Signature ease: crisp, refined deceleration with zero overshoot
export const SIGNATURE_EASE = 'expo.out';
// Secondary ease: smooth natural curve for softer transitions (bars, filters)
export const SECONDARY_EASE = 'power2.out';

export { gsap, ScrollTrigger, Flip };
