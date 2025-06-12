import { HealthCenter } from "./health_centers";
import { User } from "./users";

export interface Survey {
  id: number;
  userId: number;
  user: User;
  healthCenterId: number;
  healthCenter: HealthCenter;
  nama_lengkap_responden: string;
  kelurahan: string;
  rt: string;
  rw: string;
  jumlah_anggota_keluarga: number;
  jumlah_penampungan_air: number;
  jumlah_jentik: number;
  jenis_penampungan_dirumah: string;
  jenis_penampungan_diluar: string;
  kuras_penampungan_air: string;
  terkena_dbd: string;
  bukti_gambar: string;
  catatan: Text;
  createdAt: Date;
  updatedAt: Date;
}
