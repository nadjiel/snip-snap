import type { Duration } from "./types";

/**
 * Transforms a `string` with arguments into an `ffmpeg` friendly arg array.
 */
export function argify(args: string) {
  return args.split(" ");
}

export function parseFreezeDetect(metadata: string): Duration[] {
  const lines = metadata.split("\n");

  const results = [];

  let currentStart = null;

  for (const line of lines) {
    // Trim to handle potential whitespace issues
    const cleanLine = line.trim();

    if (cleanLine.startsWith('lavfi.freezedetect.freeze_start=')) {
      currentStart = parseFloat(cleanLine.split('=')[1]);
    } 
    else if (cleanLine.startsWith('lavfi.freezedetect.freeze_end=')) {
      const end = parseFloat(cleanLine.split('=')[1]);
      
      if (currentStart !== null) {
        results.push({ start: currentStart, end: end });
        currentStart = null; // Reset for the next pair
      }
    }
  }

  return results;
}
