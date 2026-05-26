import { fetchFile } from "@ffmpeg/util";
import { argify, ffmpeg, parseFreezeDetect } from "@/lib/ffmpeg";
import type { Duration } from "@/lib/ffmpeg/types";
import { getExtension } from "@/util/file";

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
export async function detectIdleness(
	video: File,
	sensitivity = 0.0001,
	duration = 1,
) {
	const extension = getExtension(video.name);
	const input = `input.${extension}`;
	const output = `output.tmp`;

	ffmpeg.writeFile(input, await fetchFile(video));

	await ffmpeg.exec(
		argify(
			`-i ${input} -vf freezedetect=n=${sensitivity}:d=${duration},metadata=mode=print:file=${output} -f null -`,
		),
	);

	const data = (await ffmpeg.readFile(output)) as Uint8Array;
	const metadata = new TextDecoder().decode(data);

	return parseFreezeDetect(metadata);
}
