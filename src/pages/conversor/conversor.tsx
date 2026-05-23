import { useState, useEffect } from "react";
import { ffmpeg, load, configLogging } from "@/lib/ffmpeg";
import { detectIdleness, convertFormat } from "@/feat/video";

configLogging(true);

export default function ConversorPage() {
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
      {
        ready
          ? <p>FFMpeg loaded!</p>
          : <p>Loading...</p>
      }
      <p>{log}</p>
      <button onClick={() => convertFormat(video).then(setGifURL)}>Convert video!</button>
      <button onClick={() => detectIdleness(video).then(console.log)}>Detect idleness!</button>
      <input type="file" onChange={e => setVideo(e.target.files.item(0))} />
      {
        video && (
          <video
            controls
            width={720}
            src={URL.createObjectURL(video)}
          ></video>
        )
      }
      <br />
      { gifURL && (
        <img
          src={gifURL}
          width={720}
        />
      ) }
    </div>
  )
}
