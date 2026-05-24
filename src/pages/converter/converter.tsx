import { useState, useEffect } from "react";
import { Button } from "@/comps/ui/button";
import { Input } from "@/comps/ui/input";
import { ffmpeg, load, configLogging } from "@/lib/ffmpeg";
import { detectIdleness, convertFormat } from "@/feat/video";

configLogging(true);

export default function ConverterPage() {
  const [ready, setReady] = useState(false);
  const [log, setLog] = useState("");
  const [video, setVideo] = useState<File>(null);
  const [gifURL, setGifURL] = useState("");

  useEffect(() => {
    ffmpeg.on("log", ({ message }) => {
      setLog(message);
    });

    load().then(() => setReady(true));
  }, []);

  return (
    <div>
      <h1>Video Converter</h1>
      {
        ready
          ? <p>FFMpeg loaded!</p>
          : <p>Loading...</p>
      }
      <div>
        <Input type="file" onChange={e => setVideo(e.target.files.item(0))} />
        <video
          controls
          width={720}
          src={video && URL.createObjectURL(video)}
        ></video>
      </div>
      <p>{log}</p>
      <div>
        <Button onClick={() => convertFormat(video).then(setGifURL)}>Convert video!</Button>
        <Button onClick={() => detectIdleness(video).then(console.log)}>Detect idleness!</Button>
      </div>
      <div>
        <h2>Result</h2>
        { gifURL && (
          <img
            src={gifURL}
            width={720}
          />
        ) }
      </div>
    </div>
  )
}
