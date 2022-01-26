import admin = require("firebase-admin");
import functions = require("firebase-functions");

import path = require("path");
import sharp = require("sharp");
import os = require("os");
import fs = require("fs-extra");
import pdf2jpg = require("pdf2jpg");
import { RuntimeOptions } from "firebase-functions";

admin.initializeApp();

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 180,
  memory: "512MB",
};

const THUMB_MAX_WIDTH = 620;

exports.handlePDFUpload = functions
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

    await pdf2jpg(tempFilePath, { page: 1 }).then((buffer: any) =>
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

    return fs.remove(workingDir);
  });
