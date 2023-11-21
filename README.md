// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.String
  access_token      String? @db.String
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.String
  session_state     String?

  // Specify onDelete action for the user relation.
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  name          String
  email         String    @unique
  emailVerified DateTime?
  image         String?
  bio           String?   @default("0")
  coverImage    String?   @default("https://www.linearity.io/blog/content/images/2022/03/611b830385d20348a9809a8e_Cover-Album-Covers--1-.png")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  searches String[] @default([]) @map("searches")
  tags     String[] @default([]) @map("tags")

  followers follow[] @relation("Followers")
  following follow[] @relation("Following")

  comments      Comments[]
  accounts      Account[]
  userNotes     UserNote[]
  UserNoteLikes UserNoteLike[]
}

model Note {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  type     String   @default("Free")
  title    String
  desc     String
  content  String?
  images   String[] @default([]) @map("images")
  files    String[] @default([]) @map("files")
  tags     String[] @default([]) @map("tags")
  price    Int      @default(0)
  approved Approved @default(PENDING)

  likes String[] @default([]) @map("likes") @db.ObjectId

  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  comments      Comments[]
  userNotes     UserNote[]
  UserNoteLikes UserNoteLike[]
}

model UserNote {
  id     String @id @default(auto()) @map("_id") @db.ObjectId
  userId String @db.ObjectId
  noteId String @db.ObjectId

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id])
  note Note @relation(fields: [noteId], references: [id])
}

model Comments {
  id      String @id @default(auto()) @map("_id") @db.ObjectId
  comment String
  userId  String @db.ObjectId
  noteId  String @db.ObjectId

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id])
  note Note @relation(fields: [noteId], references: [id])
}

model UserNoteLike {
  id     String  @id @default(auto()) @map("_id") @db.ObjectId
  userId String  @db.ObjectId
  noteId String  @db.ObjectId
  liked  Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id])
  note Note @relation(fields: [noteId], references: [id])
}

model follow {
  id        String @id @default(auto()) @map("_id") @db.ObjectId
  follower  String @db.ObjectId
  following String @db.ObjectId

  followerUser  User @relation(name: "Followers", fields: [follower], references: [id])
  followingUser User @relation(name: "Following", fields: [following], references: [id])
}

enum Role {
  USER
  ADMIN
}

enum Approved {
  APPROVED
  PENDING
}

