import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatNumber(value: number) {
    const parts = value.toFixed(2).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return parts.join(",");
}

export function formatInt(value: number) {
    const parts = value.toFixed(0).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return parts.join(",");
}

export function formatMonthYear(value: string) {
    const date = new Date(value);
    return `${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
}

