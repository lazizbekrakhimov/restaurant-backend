import { Controller, Post, UploadedFile, UseInterceptors, Param, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

const ALLOWED_MIMES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

const fileFilter = (_: any, file: Express.Multer.File, cb: Function) => {
  const ext = extname(file.originalname).toLowerCase();
  const mimeOk = ALLOWED_MIMES.includes(file.mimetype);
  const extOk = ALLOWED_EXTS.includes(ext);

  if (mimeOk || extOk) {
    cb(null, true);
  } else {
    cb(new Error(`Недопустимый формат. Разрешены: ${ALLOWED_EXTS.join(', ')}`), false);
  }
};

const storage = (folder: string) =>
  diskStorage({
    destination: `./uploads/${folder}`,
    filename: (_, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
      cb(null, `${unique}${extname(file.originalname).toLowerCase()}`);
    },
  });

const makeInterceptor = (folder: string) =>
  FileInterceptor('file', {
    storage: storage(folder),
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter,
  });

const fileBody = {
  schema: {
    type: 'object',
    properties: { file: { type: 'string', format: 'binary' } },
  },
};

@ApiTags('Upload')
@ApiBearerAuth()
@Controller('upload')
export class UploadController {

  @Post('menu/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileBody)
  @UseInterceptors(makeInterceptor('products'))
  uploadMenuImage(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/products/${file.filename}` };
  }

  @Post('news/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileBody)
  @UseInterceptors(makeInterceptor('news'))
  uploadNewsImage(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/news/${file.filename}` };
  }

  @Post('gallery/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileBody)
  @UseInterceptors(makeInterceptor('galleries'))
  uploadGalleryImage(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/galleries/${file.filename}` };
  }

  @Post('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileBody)
  @UseInterceptors(makeInterceptor('avatars'))
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/avatars/${file.filename}` };
  }

  @Post(':folder')
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileBody)
  @UseInterceptors(FileInterceptor('file', { storage: storage('temp'), limits: { fileSize: 20 * 1024 * 1024 }, fileFilter }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('folder') folder: string,
  ) {
    return {
      url: `/uploads/temp/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
    };
  }
}