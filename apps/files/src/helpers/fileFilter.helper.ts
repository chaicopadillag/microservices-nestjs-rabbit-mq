/* eslint-disable @typescript-eslint/ban-types */
export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback('No file provided', false);

  const fileTypes = /\.(xls|xlsx)$/g;
  const mimeType = fileTypes.test(file.originalname);

  if (!mimeType) {
    return callback(null, false);
  }
  return callback(null, true);
};
