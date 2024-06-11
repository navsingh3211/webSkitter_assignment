import multer from "multer";
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirnamee = dirname(__filename);
const directoryPath = join(__dirnamee, '../public/profilePics');

//if folder for storing is not exit,create it
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req,file,cb){
    if(file.fieldname === 'profilePic'){
      cb(null,directoryPath);
    }
  },
  filename: function (req,file,cb){
    cb(null,file.originalname);
  }
});

const filedFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}

const picUpload = multer({storage,filedFilter});
export default picUpload;