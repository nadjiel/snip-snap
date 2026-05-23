import { useState, useEffect } from "react";
import { fetchFile } from "@ffmpeg/util";
import { ffmpeg, load } from "@/lib/ffmpeg";

export default function ConversorPage() {
  const [ready, setReady] = useState(false);
  const [log, setLog] = useState("");
  const [video, setVideo] = useState<File>(null);
  const [gifURL, setGifURL] = useState("");

  useEffect(() => {
    ffmpeg.on("log", ({ message }) => {
      setLog(message);
      console.log(message);
    });

    load().then(() => setReady(true));
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
