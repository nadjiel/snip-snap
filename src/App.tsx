import { useState, useEffect } from "react";
import { FFmpeg/* , fetchFile */ } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

const baseUrl = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";

const ffmpeg = new FFmpeg();

export default function App() {
  const [ready, setReady] = useState<boolean>(null);
  const [log, setLog] = useState("");

  useEffect(() => {
    ffmpeg.on("log", ({ message }) => {
      setLog(message);
      console.log(message);
    });
  }, []);

  const load = async () => {
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseUrl}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseUrl}/ffmpeg-core.wasm`, "application/wasm"),
    });

    setReady(true);
  }

  return (
    <div>
      {
        ready === null
          ? <p>Click to load!</p>
          : ready
          ? <p>FFMpeg loaded!</p>
          : <p>Loading...</p>
      }
      <p>{log}</p>
      <button onClick={load}>Load FFMpeg</button>
    </div>
  )
}
