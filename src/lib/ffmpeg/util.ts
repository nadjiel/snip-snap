import type { Duration } from "./types";

/** The prefix of the `freezedetect` start timestamps. */
const FREEZE_DETECT_START = "lavfi.freezedetect.freeze_start";

/** The prefix of the `freezedetect` end timestamps. */
const FREEZE_DETECT_END = "lavfi.freezedetect.freeze_end";

/**
 * Transforms a `string` with arguments into an `ffmpeg` friendly arg array.
 */
export function argify(args: string) {
  return args.split(" ");
}

/**
 * Takes a `freezedetect` output got with the `metadata` filter
 * and organizes it in an array of {@link Duration `Durations`}.
 * 
 * @param metadata The metadata from the `freezedetect` filter.
 * @returns An array of `Durations`.
 */
export function parseFreezeDetect(metadata: string): Duration[] {
  // Cleans up metadata input
  const timestamps = metadata
    .split("\n")
    .map(line => line.trim())
    .filter(line => (
      line.startsWith(FREEZE_DETECT_START) ||
      line.startsWith(FREEZE_DETECT_END)
    ));
  
  const result: Duration[] = [];

  let duration: Partial<Duration> = {};

  // Accumulates durations accross start and end timestamps
  for(const timestamp of timestamps) {
    if(
      timestamp.startsWith(FREEZE_DETECT_START)
      && duration.start === undefined
    ) {
      duration.start = parseFloat(timestamp.split("=")[1]);
    } else if(
      timestamp.startsWith(FREEZE_DETECT_END)
      && duration.start !== undefined
    ) {
      duration.end = parseFloat(timestamp.split("=")[1]);

      result.push(duration as Duration);

      duration = {};
    }
  }

  return result;
}
