import { Controller, Post, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

const storage = (folder: string) =>
  diskStorage({
    destination: `./uploads/${folder}`,
    filename: (_, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
      cb(null, `${unique}${extname(file.originalname)}`);
    },
  });

@ApiTags('Upload')
@ApiBearerAuth()
@Controller('upload')
export class UploadController {

  @Post(':folder')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage('temp'),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg)$/)) {
          return cb(new Error('Only image files allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('folder') folder: string,
  ) {
    return {
      url: `/uploads/${folder}/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
    };
  }

  @Post('menu/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file', { storage: storage('products'), limits: { fileSize: 5 * 1024 * 1024 } }))
  uploadMenuImage(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/products/${file.filename}` };
  }

  @Post('news/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file', { storage: storage('news'), limits: { fileSize: 5 * 1024 * 1024 } }))
  uploadNewsImage(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/news/${file.filename}` };
  }

  @Post('gallery/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(FileInterceptor('file', { storage: storage('galleries'), limits: { fileSize: 5 * 1024 * 1024 } }))
  uploadGalleryImage(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/galleries/${file.filename}` };
  }
}
