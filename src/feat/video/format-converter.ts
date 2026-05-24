import { fetchFile } from "@ffmpeg/util";
import { argify, ffmpeg } from "@/lib/ffmpeg";

export async function convertFormat(video: File) {
	ffmpeg.writeFile(video.name, await fetchFile(video));

	await ffmpeg.exec(argify(`-i ${video.name} -f gif output.gif`));

	const data = (await ffmpeg.readFile("output.gif")) as Uint8Array;

	return URL.createObjectURL(new Blob([data.buffer], { type: "image/gif" }));
}
