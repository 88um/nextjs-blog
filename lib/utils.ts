import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generatePathname(title: string) {
  
  title = title.trim();

  const pathname = title
    .replace(/[^\w\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .toLowerCase();

  return pathname;
}


export function parseTags(tagString: string): string[] {
  tagString = tagString.trim();

  if (tagString === "") {
      return [];
  }

  const validTagPattern = /^[a-zA-Z0-9#]+$/;

  const tags = tagString.toLowerCase().split(/\s*#\s*/);
  if (tags[0] === "") {
      tags.shift();
  }

  const filteredTags = tags.filter(tag => tag !== "");

  for (const tag of filteredTags) {
    if (!validTagPattern.test(tag)) {
      throw new Error(`Invalid tag: ${tag}. Tags can only contain alphanumeric characters and #.`);
    }
  }

  return filteredTags;
}

export function formatDate(date : Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  const parts = formattedDate.split(' ');

  const day = parts[0].replace(/\d+/g, (match) => {
    const num = parseInt(match);
    if (num >= 11 && num <= 13) {
      return match + 'th';
    }
    switch (num % 10) {
      case 1:
        return match + 'st';
      case 2:
        return match + 'nd';
      case 3:
        return match + 'rd';
      default:
        return match + 'th';
    }
  });

  return `${day} ${parts[1]} ${parts[2]}`;
}


