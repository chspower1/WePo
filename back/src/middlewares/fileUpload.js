import util from "util";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage"
import MongoClient from "mongodb"

const storage = new GridFsStorage({
  url: process.env.mongoURL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-bezkoder-${file.originalname}`
    };
  }
});

const uploadFilesPrep = multer({ storage: storage }).single("file");
const upload = util.promisify(uploadFilesPrep);


const mongoClient = new MongoClient.MongoClient(process.env.mongoURL);
const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    return res.send({
      message: "File has been uploaded.",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};

export { uploadFiles }