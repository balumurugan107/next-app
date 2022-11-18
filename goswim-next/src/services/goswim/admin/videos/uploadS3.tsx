import ReactS3Client from 'react-aws-s3-typescript';
import { S3Config } from 'src/store/goswim/admin/video';

/* AWS S3 config options */
/* Highly recommended to declare the config object in an external file import it when needed */

 


export default class UploadVideoToS3Service {
  private static instance: UploadVideoToS3Service;
  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new UploadVideoToS3Service();
    return this.instance;
  }

   createS3Config =  (millis: number, innerFolder: string | null) => {
    // const dir = `${config.S3_DIRECTORY}/${millis}`
    // const bucket = `${config.S3_BUCKET}`
    // const region = `${config.S3_REGION}`
    // const accessKey = `${config.S3_ACCESS_KEY}`
    // const secretKey = `${config.S3_SECRET_ACCESS_KEY}`

    const dir = `videos/${millis}`
    const bucket = `goswimtv-staging`
    const region = `us-east-1`
    const accessKey = `AKIAJM3OUCTTRGTWMWWA`
    const secretKey = `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`
    const s3Config: S3Config = {
      bucketName: bucket,
      dirName: innerFolder && innerFolder.length>0 ? `${dir}/${innerFolder}` : dir,
      region: region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    }
    return s3Config
  };

 uploadFile = async (file: File, millis: number, innerFolder: string| null) => {
  /* Import s3 config object and call the constrcutor */
  const s3 = new ReactS3Client(this.createS3Config(millis, innerFolder));

  /* You can use the default directory defined in s3Config object
  * Or you can a define custom directory to upload when calling the
  * constructor using js/ts object destructuring.
  * 
  * const s3 = new ReactS3Client({
  *      ...s3Config,
  *      dirName: 'custom-directory'
  * });
  * 
  */

  //const filename = 'filename-to-be-uploaded';     /* Optional */

  /* If you do not specify a file name, file will be uploaded using uuid generated 
  * by short-UUID (https://www.npmjs.com/package/short-uuid)
  */

  try {
      const res = await s3.uploadFile(file/*, filename*/);
      return res
      /*
      * {
      *   Response: {
      *     bucket: "bucket-name",
      *     key: "directory-name/filename-to-be-uploaded",
      *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
      *   }
      * }
      */
  } catch (exception) {
      throw exception;
    
      /* handle the exception */
  }}

  
/* End of uploadFile.ts */
}

export const UploadVideoToS3ServiceInstance = UploadVideoToS3Service.getInstance();