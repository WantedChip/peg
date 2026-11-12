import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

interface UseCountUpOptions {
  duration?: number;
  formatFn?: (val: number) => string;
}

export function useCountUp(targetValue: number, options: UseCountUpOptions = {}): string {
  const { duration = 0.5, formatFn = (n) => String(Math.round(n)) } = options;
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<string>(() => formatFn(targetValue));
  const currentValRef = useRef<number>(targetValue);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      currentValRef.current = targetValue;
      setDisplayValue(formatFn(targetValue));
      return;
    }

    if (currentValRef.current === targetValue) {
      return;
    }

    const state = { val: currentValRef.current };
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    tweenRef.current = gsap.to(state, {
      val: targetValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(formatFn(state.val));
      },
      onComplete: () => {
        currentValRef.current = targetValue;
        setDisplayValue(formatFn(targetValue));
      },
    });

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [targetValue, duration, formatFn, prefersReducedMotion]);

  return displayValue;
}
