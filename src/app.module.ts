import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MenuModule } from './menu/menu.module';
import { CategoriesModule } from './categories/categories.module';
import { NewsModule } from './news/news.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ContactsModule } from './contacts/contacts.module';
import { GalleryModule } from './gallery/gallery.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DB_URL'),
        database: config.get('DB_DATABASE', 'restaurant'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    MenuModule,
    CategoriesModule,
    NewsModule,
    ReservationsModule,
    ContactsModule,
    GalleryModule,
    UploadModule,
  ],
})
export class AppModule {}