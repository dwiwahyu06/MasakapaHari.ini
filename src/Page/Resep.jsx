import React, { useEffect, useState } from 'react';

export default function Resep() {
  const [resep, setResep] = useState([]);

  useEffect(() => {
    fetch('resep.json')
      .then(response => response.json())
      .then(data => setResep(data))
      .catch(error => {
        console.error('Gagal mengambil data:', error);
      });
  }, []);

  return (
    <div className="Container">
      {resep.map((item, index) => (
        <div className="Box" key={index}>
          {/* Tambahkan elemen gambar */}
          <img src={item.image} alt={item.nama} className="RecipeImage" />
          
          <h2>{item.nama}</h2>

          <h3>Bahan-bahan:</h3>
          <ul>
            {item.bahan.map((bahan, idx) => (
              <li key={idx}>{bahan}</li>
            ))}
          </ul>

          <h3>Langkah-langkah:</h3>
          <ol>
            {item.langkah.map((langkah, idx) => (
              <li key={idx}>{langkah}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
