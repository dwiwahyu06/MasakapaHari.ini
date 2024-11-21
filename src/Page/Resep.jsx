// Resep.jsx

export default function Resep() {
  const resep = [
    {
      image: "Kimchi.jpg",
      nama: "Kimchi",
      bahan: [
        " 3 sdm garam",
        " 1 wortel potong tipis memanjang",
        " 6 cangkir air",
        " 900 gram sawi putih, potong kotak sedang",
        " 6 tangkai daun bawang, potong dan sayat tipis",
        " 1/2 sdm jahe segar, cincang",
        " 3 sdm saus ikan/udang korea, namun jangan menggunakan bahan ini jika anda ingin membuat kimchi vegetarian",
        " 1/4 cangkir cabai kering korea halus (atau cabai halus lainnya)",
        " 1 cangkir lobak korea, cincang kasar",
        " 1 sdm gula"
      ],
      langkah: [
        " Sebelum membuat, cucilah semua bahan mulai dari sawi, wortel, dan sayuran lainnya agar terhindar dari kuman",
        " Larutkan garam ke dalam air pada wadah yang bersih",
        " Masukan sawi putih ke dalam air garam tersebut, tekan, dan tutup sawi hingga 12 jam. Lalu diamkan",
        " Setelah 12 jam, keringkan sawi dan sisihkan airnya. Setelah itu campurkan bahan lainnya seperti wortel dan lobak. Tambahkan sedikit garam",
        " Langkah selanjutnya, haluskan, dan campurkan bumbu kimchinya seperti jahe, saus ikan, bubuk cabai",
        " Setelah bumbu jadi, campurkan bumbu pada kimchi secara merata",
        " Masukkan kembali bahan kimchi ke wadah besar tertutup, masukkan sedikit air garam yang sudah disisihkan sebelumnya",
        " Setelah semua masuk ke dalam wadah, tutup rapat, dan diamkan selama sehari atau lebih. Hal ini sesuai selera untuk tingkat keasamannya",
        " Saat tingkat keasaman sudah sesuai, kimchi sudah bisa dinikmati"
      ]
    }
  ];

  return (
    <div className="Container">
      <div className="Box">
        <img src={resep[0].image} alt="Resep" className="Gambar-Resep" />
        <h2>{resep[0].nama}</h2>

        <h3>Bahan-bahan:</h3>
        <ul>
          {resep[0].bahan.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Langkah-langkah:</h3>
        <ol>
          {resep[0].langkah.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
