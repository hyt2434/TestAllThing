import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names and applies Tailwind's merge strategy
 * @param {...(string|null|undefined|boolean)} inputs - The class names to combine
 * @returns {string} - The combined and merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}