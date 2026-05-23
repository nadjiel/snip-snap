import { useState, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

const baseUrl = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";

const ffmpeg = new FFmpeg();

export default function ConversorPage() {
  const [ready, setReady] = useState(false);
  const [log, setLog] = useState("");
  const [video, setVideo] = useState<File>(null);
  const [gifURL, setGifURL] = useState("");

  const load = async () => {
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseUrl}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseUrl}/ffmpeg-core.wasm`, "application/wasm"),
    });

    setReady(true);
  }

  useEffect(() => {
    ffmpeg.on("log", ({ message }) => {
      setLog(message);
      console.log(message);
    });

    load();
  }, []);

  const convert = async () => {
    ffmpeg.writeFile("input.mkv", await fetchFile(video));

    await ffmpeg.exec(["-i", "input.mkv", "-t", "2.5", "-ss", "2.0", "-f", "gif", "output.gif"]);

    const data = await ffmpeg.readFile("output.gif");

    setGifURL(URL.createObjectURL(new Blob([data.buffer], { type: "image/gif"})));
  }

  return (
    <div>
      {
        ready
          ? <p>FFMpeg loaded!</p>
          : <p>Loading...</p>
      }
      <p>{log}</p>
      <button onClick={convert}>Convert video!</button>
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
