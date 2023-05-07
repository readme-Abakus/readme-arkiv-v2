import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import * as path from "path";
import sharp from "sharp";
import * as os from "os";
import * as fs from "fs-extra";
import pdf2jpg from "pdf2jpg";
import fetch from "node-fetch";
import { RuntimeOptions } from "firebase-functions";

admin.initializeApp();

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 180,
  memory: "512MB",
};

const THUMB_MAX_WIDTH = 620;

const VERCEL_REBUILD_URL =
  "https://api.vercel.com/v1/integrations/deploy/prj_EMutmNh2b9jV8LM7p843xbrKastq/yZPSj6goDw";

exports.handlePDFUpload = functions
  .region("europe-west1")
  .runWith(runtimeOpts)
  .storage.object()
  .onFinalize(async (object) => {
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name as string; // File path in the bucket.
    // Get the file name.
    const fileName = path.basename(filePath);
    // Exit if the image is already a thumbnail.
    if (!filePath.match(/pdf\/\d{4}\/.+\.pdf/g)) {
      return console.log("Object is not a pdf.");
    }

    const bucket = admin.storage().bucket(fileBucket);
    const workingDir = path.join(os.tmpdir(), "thumbs");
    const tempFilePath = path.join(workingDir, fileName);
    const tempPNGFilePath = path
      .join(workingDir, fileName)
      .replace(".pdf", ".png");

    await fs.ensureDir(workingDir);

    await bucket
      .file(filePath)
      .download({ destination: tempFilePath, validation: false });
    console.log("PDF downloaded locally to", tempFilePath);

    await fs.ensureFile(tempFilePath);

    await pdf2jpg(tempFilePath, { page: 1 }).then(
      (buffer: string | NodeJS.ArrayBufferView) =>
        fs.writeFileSync(tempPNGFilePath, buffer)
    );

    const metadata = {
      contentType: "image/jpeg",
    };
    const thumbFilePath = path
      .join(path.dirname(filePath), fileName)
      .replace(".pdf", ".jpg")
      .replace("pdf", "images");

    const thumbnailUploadStream = bucket
      .file(thumbFilePath)
      .createWriteStream({ metadata });

    // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
    const pipeline = sharp();
    pipeline
      .resize(THUMB_MAX_WIDTH)
      .toFormat("jpeg")
      .pipe(thumbnailUploadStream);

    fs.createReadStream(tempPNGFilePath).pipe(pipeline);

    await new Promise((resolve, reject) =>
      thumbnailUploadStream.on("finish", resolve).on("error", reject)
    );

    if (process.env.NODE_ENV === "production") {
      await fetch(VERCEL_REBUILD_URL, { method: "POST" });
      console.log("Pinging Vercel for rebuild.");
    } else {
      console.log(
        `In env ${process.env.NODE_ENV}, not pinging Vercel for rebuild.`
      );
    }

    return fs.remove(workingDir);
  });

exports.handlePdfDelete = functions.storage
  .object()
  .onDelete(async (object) => {
    const filePath = object.name as string;
    if (!filePath.match(/pdf\/\d{4}\/.+\.pdf/g)) {
      return console.log("Object is not a pdf.");
    }

    if (process.env.NODE_ENV === "production") {
      await fetch(VERCEL_REBUILD_URL, { method: "POST" });
      console.log("Pinging Vercel for rebuild.");
    } else {
      console.log(
        `In env ${process.env.NODE_ENV}, not pinging Vercel for rebuild.`
      );
    }
  });

exports.handleSettingsChange = functions.firestore
  .document("settings/{docID}")
  .onWrite(async () => {
    if (process.env.NODE_ENV === "production") {
      await fetch(
        "https://api.vercel.com/v1/integrations/deploy/prj_EMutmNh2b9jV8LM7p843xbrKastq/YmXMYVqB6P",
        { method: "POST" }
      );
      console.log("Pinging Vercel for rebuild.");
    } else {
      console.log(
        `In env ${process.env.NODE_ENV}, not pinging Vercel for rebuild.`
      );
    }
  });
