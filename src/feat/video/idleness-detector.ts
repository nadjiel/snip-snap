import { fetchFile } from "@ffmpeg/util";
import { ffmpeg, argify, parseFreezeDetect } from "@/lib/ffmpeg";
import type { Duration } from "@/lib/ffmpeg/types";

/**
 * Detects parts of a video that are considered "idle",
 * according to the `sensitivity` and `duration` parameters
 * and returns them in a {@link Duration `Duration`} array.
 * 
 * @param video The video to analyze.
 * @param sensitivity The sensitivity value for the detection.
 * @param duration The minimum duration to consider a part as idle.
 * @returns A `string` with the found timestamps.
 */
export async function detectIdleness(video: File, sensitivity = 0.0001, duration = 1) {
  ffmpeg.writeFile(video.name, await fetchFile(video));

  await ffmpeg.exec(
    argify(`-i ${video.name} -vf freezedetect=n=${sensitivity}:d=${duration},metadata=mode=print:file=idleness.tmp -f null -`)
  );

  const data = await ffmpeg.readFile("idleness.tmp") as Uint8Array;
  const metadata = new TextDecoder().decode(data);

  return parseFreezeDetect(metadata);
}
