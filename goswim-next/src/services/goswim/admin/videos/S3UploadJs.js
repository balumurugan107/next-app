//import { uploadFile } from 'react-s3';
import SnackbarUtils from 'src/helpers/snackbar';
import { Buffer } from 'buffer';
export default class UploadVideoToS3Service {
  //  count = 0;
  //  intervalHandler = null;
  static instance;
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new UploadVideoToS3Service();
    return this.instance;
  }

  createS3Config = (millis, innerFolder, customThumbnail) => {
    const dir = `${process.env.NEXT_PUBLIC_DIRECTORY}/${millis}`;
    const bucket = `${process.env.NEXT_PUBLIC_S3_BUCKET}`;
    const region = `${process.env.NEXT_PUBLIC_REGION}`;
    const accessKey = `${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
    const secretKey = `${process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY}`;
    const dirName = innerFolder && innerFolder.length > 0 ? `${dir}/${innerFolder}` : dir;

    const s3Config = {
      bucketName: bucket,
      dirName: customThumbnail ? innerFolder : dirName,
      region: region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey
    };

    return s3Config;
  };

  createS3Profile = memberId => {
    const bucket = `${process.env.NEXT_PUBLIC_S3_BUCKET}`;
    const region = `${process.env.NEXT_PUBLIC_REGION}`;
    const accessKey = `${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
    const secretKey = `${process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY}`;
    const dirName = `goswim/profile/${memberId}`;

    const s3Config = {
      bucketName: bucket,
      dirName: dirName,
      region: region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey
    };

    return s3Config;
  };

  uploadProfileFile = async (file, memberId) => {
    /* Import s3 config object and call the constrcutor */
    const config = this.createS3Profile(memberId);
    try {
      const res = await uploadFile(file, config);
      return res;
    } catch (exception) {
      throw exception;
      /* handle the exception */
    }
  };

  createS3Team = timestamp => {
    const bucket = `${process.env.NEXT_PUBLIC_S3_BUCKET}`;
    const region = `${process.env.NEXT_PUBLIC_REGION}`;
    const accessKey = `${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
    const secretKey = `${process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY}`;
    const dirName = `goswim/team/${timestamp}`;

    const s3Config = {
      bucketName: bucket,
      dirName: dirName,
      region: region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey
    };

    return s3Config;
  };

  uploadTeamFile = async (file, timestamp) => {
    /* Import s3 config object and call the constrcutor */
    const config = this.createS3Team(timestamp);
    try {
      const res = await uploadFile(file, config);
      return res;
    } catch (exception) {
      throw exception;
      /* handle the exception */
    }
  };

  uploadFile = async (file, millis, innerFolder, customThumbnail = false) => {
    /* Import s3 config object and call the constrcutor */
    window.Buffer = window.Buffer || require('buffer').Buffer;
    const config = this.createS3Config(millis, innerFolder, customThumbnail);
    try {
      const res = await uploadFile(file, config);
      SnackbarUtils.success('Video Uploaded');
      return res;
    } catch (exception) {
      throw exception;
      /* handle the exception */
    }
  };
}

export const UploadVideoToS3ServiceInstance = UploadVideoToS3Service.getInstance();
