import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import type { LogConfig } from "./types";

/**
 * The base URL recommended for loading **FFmpeg.wasm**,
 * as per its {@link https://ffmpegwasm.netlify.app/docs/getting-started/usage docs}.
 * */
const baseUrl = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";

/** Determines if realtime logs are store and/ or printed. */
const logConfig: LogConfig = {
	store: false,
	print: false,
};

/** All logs from `ffmpeg` while logging is configured to store them. */
export let logs = "";

export const ffmpeg = new FFmpeg();

ffmpeg.on("log", ({ message }) => {
	if (logConfig.store) logs += `\n${message}`;
	if (logConfig.print) console.log(message);
});

/** Loads ffmpeg with recommended URLs. */
export async function load() {
	await ffmpeg.load({
		coreURL: await toBlobURL(`${baseUrl}/ffmpeg-core.js`, "text/javascript"),
		wasmURL: await toBlobURL(`${baseUrl}/ffmpeg-core.wasm`, "application/wasm"),
	});
}

/**
 * Configures the automatic logging behavior.
 *
 * @param config A {@link LogConfig `LogConfig`} object describing the desired behavior.
 */
export function configLogging(config: boolean | LogConfig) {
	if (typeof config === "boolean") {
		logConfig.store = config;
		logConfig.print = config;
	} else {
		logConfig.store = config.store;
		logConfig.print = config.print;
	}
}
