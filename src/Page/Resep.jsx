import React, { useEffect, useState } from 'react';

export default function Resep() {
  const [resep, setResep] = useState([]);
  const [filteredResep, setFilteredResep] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('resep.json')
      .then(response => response.json())
      .then(data => {
        setResep(data);
        setFilteredResep(data); 
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error);
      });
  }, []);

 
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = resep.filter((item) => 
      item.nama.toLowerCase().includes(term)
    );
    setFilteredResep(filtered);
    setCurrentPage(1); 
  };

  const handleSort = () => {
    const sorted = [...filteredResep].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.nama.localeCompare(b.nama);
      } else {
        return b.nama.localeCompare(a.nama);
      }
    });
    setFilteredResep(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResep.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredResep.length / itemsPerPage);

  return (
    <div className="Container">
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Cari resep..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>
          Urutkan {sortOrder === 'asc' ? '⬇️' : '⬆️'}
        </button>
      </div>

      {currentItems.map((item, index) => (
        <div className="Box" key={index}>
          <img src={item.image} alt={item.nama} className="RecipeImage" />
          
          <h2>{item.nama}</h2>

          <h3>Asal:</h3>
          <p>{item.Asal}</p>

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

      
      <div className="Pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={currentPage === idx + 1 ? 'active' : ''}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
