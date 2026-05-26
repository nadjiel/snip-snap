import { fetchFile } from "@ffmpeg/util";
import mime from "mime";
import { argify, ffmpeg } from "@/lib/ffmpeg";
import { getExtension } from "@/util/file";

export async function convertFormat(video: File, format: string) {
	const extension = getExtension(video.name);
	const input = `input.${extension}`;
	const output = `output.${format}`;
	const type = mime.getType(format);

	if (type === null) throw new Error(`Unsupported format .${format}!`);

	ffmpeg.writeFile(input, await fetchFile(video));

	await ffmpeg.exec(argify(`-i ${input} -f ${format} ${output}`));

	const data = (await ffmpeg.readFile(output)) as Uint8Array<ArrayBuffer>;

	return URL.createObjectURL(new Blob([data], { type }));
}
