import { useEffect, useState } from "react";
import { Button } from "@/comps/ui/button";
import { Input } from "@/comps/ui/input";
import { convertFormat, detectIdleness } from "@/feat/video";
import { configLogging, ffmpeg, load } from "@/lib/ffmpeg";

configLogging(true);

export default function ConverterPage() {
	const [ready, setReady] = useState(false);
	const [log, setLog] = useState("");
	const [video, setVideo] = useState<File | null>(null);
	const [gifURL, setGifURL] = useState("");

	useEffect(() => {
		ffmpeg.on("log", ({ message }) => {
			setLog(message);
		});

		load().then(() => setReady(true));
	}, []);

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h1 className="font-bold text-4xl text-center mb-4">Video Converter</h1>
			<p className="mb-4">Upload a video and select an output format.</p>
			<p className="text-center mb-2">
				{ready ? "Ready to convert!" : "Loading tool..."}
			</p>
			<div className="max-w-lg mx-auto">
				<Input
					type="file"
					onChange={(e) => setVideo(e.target.files?.item(0) ?? null)}
					className="min-h-16 mb-2"
				/>
				<video
					controls
					width={512}
					height={288}
					src={video ? URL.createObjectURL(video) : undefined}
					className="mb-2"
				>
					<track kind="captions"></track>
				</video>
			</div>
			<p>{log}</p>
			<div className="flex justify-center">
				<Button
					disabled={!video}
					onClick={() => video && convertFormat(video, "gif").then(setGifURL)}
				>
					Convert video!
				</Button>
				<Button
					disabled={!video}
					onClick={() => video && detectIdleness(video).then(console.log)}
				>
					Detect idleness!
				</Button>
			</div>
			<div className="max-w-lg mx-auto">
				<h2 className="text-2xl font-bold mb-2">Result</h2>
				{gifURL ? (
					<img
						src={gifURL}
						alt="GIF generated from the provided video"
						width={512}
						height={288}
					/>
				) : (
					<p>Process the video to see the result here.</p>
				)}
			</div>
		</div>
	);
}
