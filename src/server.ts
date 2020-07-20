import * as express from "express";
import { urlencoded } from "body-parser";
import websites from "./websites";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as sharp from "sharp";
import axios from "axios";
import * as QRCode from "qrcode";
import { Writable, PassThrough } from "stream";

const app = express();
const port = 3001;

app.use(cookieParser());
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "oldstuff",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

app.use(urlencoded({ extended: true }));

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

app.get("/img/:width/:height", async (req, res) => {
  const url = req.query.url as string;
  const width = parseInt(req.params.width);
  const height = parseInt(req.params.height);
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const result = await sharp(response.data as Buffer)
    .resize(width, height, {
      fit: "cover",
    })
    .jpeg({
      quality: 50,
      chromaSubsampling: "4:4:4",
    })
    .toBuffer();

  res.type("jpg");
  res.send(result);
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

websites(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
