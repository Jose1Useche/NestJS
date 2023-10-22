import { diskStorage } from "multer";

export const storage = diskStorage({
    destination: 'tmp', //{__dirname}/../tmp acá podemos usar una ENV en caso de enviar el file a la nube
    
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.').pop();
        const filename = `${Date.now()}.${extension}`;
        cb(null, filename);
    }
});