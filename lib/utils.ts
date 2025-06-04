import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
};

// Define the types for block content and children
type Block = {
  _type: string;
  children?: Array<{ text: string }>;
};

type BlockContent = Block[] | null;

// Helper function to extract plain text from block content
export const extractPlainText = (blocks: BlockContent): string | null => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks
    .map((block) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        return block.children.map((child) => child.text).join("");
      }
      return "";
    })
    .join(" ");
};

/**
 * Count the number of items in an array or a number.
 *
 * @param {Array<any>|number} arr - The array or number to count.
 * @param {string} [singular=item] - The singular form of the noun.
 * @param {string} [plural] - The plural form of the noun.
 * @returns {string} - The count and the pluralized noun.
 */
export function count(
	arr: Array<any> | number,
	singular: string = 'item',
	plural?: string,
): string {
	const num = typeof arr === 'number' ? arr : arr?.length || 0
	return `${num || 0} ${num === 1 ? singular : plural || singular + 's'}`
}
