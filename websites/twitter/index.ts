import { server } from "@retro-web/server";
import { Home } from "./routes/home";
import { Login } from "./routes/login";
import { Compose } from "./routes/compose";
import * as sharp from "sharp";
// import axios from "axios";
import { Writable, PassThrough } from "stream";
import * as QRCode from "qrcode";
import * as path from "path";

const streamToBuffer = (stream: Writable) => {
  return new Promise<Buffer>((resolve, reject) => {
    let chunks: Uint8Array[] = [];
    // We can use this variable to store the final data

    // Read file into stream.Readable

    // An error occurred with the stream
    stream.once("error", (err) => {
      // Be sure to handle this properly!
      reject(err);
    });

    // File is done being read
    stream.once("end", () => {
      // create the final data Buffer from data chunks;
      const fileBuffer = Buffer.concat(chunks);
      resolve(fileBuffer);

      // Of course, you can do anything else you need to here, like emit an event!
    });

    // Data is flushed from fileStream in chunks,
    // this callback will be executed for each chunk
    stream.on("data", (chunk) => {
      chunks.push(chunk); // push data chunk to array

      // We can perform actions on the partial data we have so far!
    });
  });
};

const app = server("twitter", [Home, Login, Compose], {
  staticFilesPath: path.join(__dirname, "/static"),
});

app.get("/qrcode/:width/:height", async (req, res) => {
  const url = req.query.url as string;
  const width = parseInt(req.params.width);
  const height = parseInt(req.params.height);
  const stream = new PassThrough();
  await QRCode.toFileStream(stream, url);
  const buffer = await streamToBuffer(stream);
  const result = await sharp(buffer)
    .resize(width, height, {
      fit: "contain",
    })
    .jpeg({
      quality: 100,
      chromaSubsampling: "4:4:4",
    })
    .toBuffer();

  res.type("jpg");
  res.send(result);
});
