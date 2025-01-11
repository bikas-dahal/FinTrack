import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertAmountFromMilliunits = (amount: number) => {
  return amount / 1000
}


export const convertAmountToMilliunits = (amount: number) => {
  return Math.round(amount * 1000)
}

export const formatCurrency =(value: number) => {
  // const finalValue = convertAmountFromMilliunits(value)
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'NPR', minimumFractionDigits: 2}).format(value)
}