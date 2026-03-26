# Restaurant Backend — NestJS + TypeORM + PostgreSQL

## O'rnatish

```bash
npm install
cp .env.example .env
# .env faylida DB ma'lumotlarini to'ldiring
```

## PostgreSQL database yarating

```sql
CREATE DATABASE restaurant;
```

## Ishga tushirish

```bash
npm run start:dev
```

## Swagger UI

http://localhost:3999/api

## SuperAdmin login (Swagger orqali)

- **Email:** superadmin@restaurant.com  
- **Password:** Super123!

Swagger da:
1. `POST /auth/login` → token oling
2. Yuqoridagi "Authorize" tugmasini bosing → `Bearer <token>` kiriting

## API Endpoints

| Method | URL | Auth | Tavsif |
|--------|-----|------|--------|
| POST | /auth/register | — | Ro'yxatdan o'tish |
| POST | /auth/login | — | Login |
| POST | /auth/logout | — | Logout |
| GET | /auth/me | JWT | Mening profilim |
| GET | /users | Admin | Barcha foydalanuvchilar |
| DELETE | /users/:id | Admin | Foydalanuvchini o'chirish |
| GET | /categories | — | Kategoriyalar |
| POST | /categories | Admin | Kategoriya qo'shish |
| DELETE | /categories/:id | Admin | Kategoriya o'chirish |
| GET | /menu | — | Menyu (categoryId filter) |
| POST | /menu | Admin | Taom qo'shish |
| PUT | /menu/:id | Admin | Taomni yangilash |
| DELETE | /menu/:id | Admin | Taomni o'chirish |
| GET | /news | — | Yangiliklar |
| POST | /news | Admin | Yangilik qo'shish |
| DELETE | /news/:id | Admin | Yangilikni o'chirish |
| POST | /reservations | — | Bron qilish |
| GET | /reservations | Admin | Barcha bronlar |
| PUT | /reservations/:id | Admin | Bron holatini yangilash |
| DELETE | /reservations/:id | Admin | Bronni o'chirish |
| POST | /contacts | — | Xabar yuborish |
| GET | /contacts | Admin | Barcha xabarlar |
| PATCH | /contacts/:id/read | Admin | O'qildi deb belgilash |
| DELETE | /contacts/:id | Admin | Xabarni o'chirish |
