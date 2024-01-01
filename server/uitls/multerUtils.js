import multer from "multer";

const storageEngine=multer.diskStorage({
    destination:'server/files',
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`);
    }
});

export const upload=multer({
    storage:storageEngine,
})