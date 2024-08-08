import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...className: ClassValue[]) {
  return twMerge(clsx(className))
}

export const cnInput =
  '!py-2 !px-5 !rounded-xl border-white hover:!bg-transparent focus:!bg-transparent !bg-transparent !text-lg'
