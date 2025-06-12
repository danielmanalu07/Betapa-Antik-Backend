-- CreateTable
CREATE TABLE `Survey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `healthCenterId` INTEGER NOT NULL,
    `nama_lengkap_responden` VARCHAR(191) NOT NULL,
    `kelurahan` VARCHAR(191) NOT NULL,
    `rt` VARCHAR(191) NOT NULL,
    `rw` VARCHAR(191) NOT NULL,
    `jumlah_anggota_keluarga` INTEGER NOT NULL,
    `jumlah_penampungan_air` INTEGER NOT NULL,
    `jumlah_jentik` INTEGER NOT NULL,
    `jenis_penampungan_dirumah` VARCHAR(191) NOT NULL,
    `jenis_penampungan_diluar` VARCHAR(191) NOT NULL,
    `kuras_penampungan_air` VARCHAR(191) NOT NULL,
    `terkena_dbd` VARCHAR(191) NOT NULL,
    `bukti_gambar` VARCHAR(191) NOT NULL,
    `catatan` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Survey` ADD CONSTRAINT `Survey_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Survey` ADD CONSTRAINT `Survey_healthCenterId_fkey` FOREIGN KEY (`healthCenterId`) REFERENCES `HealthCenter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
