import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "server/data/uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

export { upload };
