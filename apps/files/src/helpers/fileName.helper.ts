/* eslint-disable @typescript-eslint/ban-types */
export const fileNameHelper = (file: Express.Multer.File) => {
  const fileExtension = file.originalname.split('.').pop();
  const fileName = `${Date.now()}.${fileExtension}`;

  return fileName;
};
