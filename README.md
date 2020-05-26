# Medicare (SIMRS Open Source untuk seluruh Faskes)

Bismillahirrahmanirrahim,
## Pengenalan
SIMRST adalah singkatan dari Sistem Informasi Rumah Sakit Terintegrasi, yang mendandakan bahwa sistem ini mencakup fungsi umum yang terdapat pada rumah sakit seperti Rawat Jalan, IGD, Rawat Inap, Apotik, Farmasi, Amprahan, dan Manajemen. Sistem ini menggunakan 1 database yang saling menghubungkan fungsi tersebut dengan otomatisasi sehingga memungkinkan rumah sakit untuk menjalankan sistem ini secar paperless maupun hybrid dengan dokumen fisiknya.

Sistem ini dibangun dengan menggunakan spesifikasi sebagai berikut:

|Teknologi|Keterangan|
|--|--|
|Bahasa|Javascript 1.6|
|Server|Deno 1.0|
|Paradigma|Functional|
|Backend|Servest 0.6.0|
|Database|MongoDB 3.3.3|
|Frontend|Mithril JS 2.0.4|
|CSS|Bulma 0.7.5|

## Persiapan Pra-install
1. Paham tentang [MongoDB](https://docs.mongodb.com/) dan [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Paham tentang paradigma Functional Javascript, [MithrilJS](https://mithril.js.org/), [Lodash](https://lodash.com/docs/4.17.15), [Bulma](https://bulma.io/), dan [DexieJS](https://dexie.org/)
3. Paham tentang ragam prosedur operasional Rumah Sakit Umum

## Cara Install
### Bagian App
1. `clone https://github.com/rikyperdana/deno-simrs`
2. Pada ./public/management.js ganti `state.login.bidang !== 5` dengan `false`
   untuk membuka akses sementara ke menu admin manajemen. Segera ganti kembali
   nanti demi keamanan.

### Bagian DB
2. Login MongoDB Atlas, create Free cluster, klik create cluster
3. Pada halaman MongoDB Atlas, bagian Cluster, klik Connect
4. Klik Connect your Application
5. Pilih MongoDB version 2.2.12 or later
6. Klik Copy pada Connection String Only
7. Ketikkan MONGO="isikan dengan connection string"
8. Ganti <password> dengan password akun sendiri
9. Pada halaman MongoDB Atlas Cluster, create database "simrs" (atau nama lainnya).
   Sesuaikan nama db tersebut ke client.db(namaDBnya) pada file index.js
10. Masih pada halaman Cluster, tambahkan dibawah db tersebut 5 collection
    goods, patients, references, users, queue

Bila tidak ingin menggunakan Atlas, silahkan ganti nilai variabel MONGO=""
dengan alamat server database local Anda

## Cara Menjalankan
`deno run -A --unstable server.js` lalu akses http://localhost:3100

## Deskripsi Menu & Sub-menu

### Manajemen
#### Pengguna
Adalah menu yang dapat digunakan oleh admin untuk mendaftarkan users yang akan nantinya akan menggunakan sistem. Klik tambah akun dan isikan informasi seperti nama lengkap, alamat gmail, dan peranannya. Berikutnya sistem akan mengenali user berdasarkan alamat gmail yang digunakan untuk login dan memberikan hak akses sesuai dengan peranan yang ditetapkan oleh admin.
#### Referensi
Adalah menu yang dapat digunakan oleh admin untuk mendaftarkan tarif tindakan, laboratorium, dan radiologi ke dalam sistem dengan menggunakan file .csv seperti pada file [contoh](https://drive.google.com/open?id=1jtkgvq5SgWsljqtk0ZxkPW4fV-eZlAy5EjkzU41flSQ). Silahkan hapus seluruh baris kecuali header pertama dan ganti isinya sesuai dengan tarif pada faskes Anda. Setelah import berhasil, silahkan refresh browser.

### Pendaftaran

## Struktur Kode
## Dependensi
## Permasalahan
## Pengembangan
