import { Router } from "express";
import multer, { diskStorage } from "multer";
import { extname } from "path";

const router = Router();

// Configure Multer for file storage
const storage = diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
  }
});

const upload = multer({ storage });

// File upload endpoint
router.post("/", upload.single("file"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

export default router;
