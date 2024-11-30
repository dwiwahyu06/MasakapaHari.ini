
import { Info, Edit, Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Resep() {
  const { 
    resep, 
    setResep, 
    filteredResep, 
    setFilteredResep,
    isLoggedIn 
  } = useAppContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ nama: '', Asal: '', bahan: [], langkah: [], image: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState(''); // Tambahan untuk sorting
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    fetch('resep.json')
      .then((response) => response.json())
      .then((data) => {
        setResep(data);
        setFilteredResep(data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data:', error);
      });
  }, [isLoggedIn]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterAndSort(term, sortOption);
  };

  const filterAndSort = (term, sort) => {
    let filtered = resep.filter((item) => item.nama.toLowerCase().includes(term));

    if (sort === 'A-Z') {
      filtered.sort((a, b) => a.nama.localeCompare(b.nama));
    } else if (sort === 'Z-A') {
      filtered.sort((a, b) => b.nama.localeCompare(a.nama));
    } else if (sort === 'Jawa') {
      filtered = filtered.filter((item) => item.Asal.toLowerCase().includes('jawa'));
    }

    setFilteredResep(filtered);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortOption(selectedSort);
    filterAndSort(searchTerm, selectedSort);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxToggle = (item) => {
    const updatedCheckedItems = new Set(checkedItems);
    if (updatedCheckedItems.has(item)) {
      updatedCheckedItems.delete(item);
    } else {
      updatedCheckedItems.add(item);
    }
    setCheckedItems(updatedCheckedItems);
  };

  const handleDeleteSelected = () => {
    const updatedResep = resep.filter((item) => !checkedItems.has(item));
    setResep(updatedResep);
    setFilteredResep(updatedResep);
    setCheckedItems(new Set());
  };

  const handleEdit = (item) => {
    setSelectedRecipe(item);
    setIsEditModalOpen(true);
  };
  const handleSaveEdit = () => {
    // Cari indeks berdasarkan ID atau properti unik
    const recipeIndex = resep.findIndex(item => item.id === selectedRecipe.id);
  
    if (recipeIndex !== -1) {
      // Salin array resep
      const updatedResep = [...resep];
      
      // Update resep pada indeks yang ditemukan
      updatedResep[recipeIndex] = {
        ...updatedResep[recipeIndex], // Gunakan data lama
        ...selectedRecipe, // Gabungkan dengan data baru
        bahan: selectedRecipe.bahan
          ? selectedRecipe.bahan.split(',').map(item => item.trim())
          : updatedResep[recipeIndex].bahan, // Hanya update jika ada perubahan
        langkah: selectedRecipe.langkah
          ? selectedRecipe.langkah.split(',').map(item => item.trim())
          : updatedResep[recipeIndex].langkah // Hanya update jika ada perubahan
      };
  
      // Perbarui state resep dan filteredResep
      setResep(updatedResep);
      setFilteredResep(updatedResep);
  
      // Opsional: Berikan pesan berhasil
      alert('Resep berhasil disimpan!');
    } else {
      alert('Resep tidak ditemukan.');
    }
  
    // Tutup modal dan reset selectedRecipe
    setIsEditModalOpen(false);
    setSelectedRecipe(null);
  };
  

  const handleAddRecipe = () => {
    setResep([newRecipe, ...resep]);
    setFilteredResep([newRecipe, ...filteredResep]);
    setNewRecipe({ nama: '', Asal: '', bahan: [], langkah: [], image: '' });
    setIsAddModalOpen(false);
  };

  const handleImageUpload = (event, recipe) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        recipe.image = reader.result;
        setNewRecipe({ ...newRecipe });
      };
      reader.readAsDataURL(file);
    }
  };

  const currentItems = filteredResep.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredResep.length / itemsPerPage);

  return (
    <>
      <h1 className="title">MasakApaHari.ini</h1>
      <div className="SearchContainer">
        <input 
          type="text" 
          placeholder="Cari resep..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
        <select value={sortOption} onChange={handleSortChange} className='sorting'>
          <option value="">Pilih Sorting</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Jawa">Asal Jawa</option>
        </select>
        <button onClick={handleDeleteSelected}>
          <Trash2 /> Hapus yang Dipilih
        </button>
      </div>
      <div className="Container">
        {currentItems.map((item, index) => (
          <div className="Box" key={index}>
            <input
              type="checkbox"
              checked={checkedItems.has(item)}
              onChange={() => handleCheckboxToggle(item)}
            />
            <img src={item.image} alt={item.nama} className="RecipeImage" />
            <div className="RecipeContent">
              <h2>{item.nama}</h2>
              <p>Asal: {item.Asal}</p>
            </div>
            <div className="IconContainer">
              <Info 
                className="Icon" 
                onClick={() => navigate(`/recipe/${index}`)} 
              />
              <Edit className="Icon" onClick={() => handleEdit(item)} />
            </div>
          </div>
        ))}

        <div className="Box AddNew" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="Icon PlusIcon" />
          <p>Tambah Resep Baru</p>
        </div>

        {isEditModalOpen && (
          <div className="Modal">
            <div className="ModalContent">
              <button 
                className="CloseButton" 
                onClick={() => setIsEditModalOpen(false)}
              >
                <X size={24} color="#666" />
              </button>
              
              <div className="ModalHeader">
                <h2>Edit Resep</h2>
              </div>

              <div className="FormGroup">
                <label>Nama Makanan</label>
                <input
                  type="text"
                  value={selectedRecipe.nama}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, nama: e.target.value })}
                  placeholder="Masukkan nama makanan"
                />
              </div>

              <div className="FormGroup">
                <label>Asal</label>
                <input
                  type="text"
                  value={selectedRecipe.Asal}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, Asal: e.target.value })}
                  placeholder="Masukkan asal makanan"
                />
              </div>

              <div className="FormGroup">
                <label>Bahan-bahan</label>
                <input
                  type="text"
                  value={Array.isArray(selectedRecipe.bahan) ? selectedRecipe.bahan.join(', ') : selectedRecipe.bahan}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, bahan: e.target.value })}
                  placeholder="Masukkan bahan-bahan (pisahkan dengan koma)"
                />
              </div>

              <div className="FormGroup">
                <label>Langkah-langkah</label>
                <input
                  type="text"
                  value={Array.isArray(selectedRecipe.langkah) ? selectedRecipe.langkah.join(', ') : selectedRecipe.langkah}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, langkah: e.target.value })}
                  placeholder="Masukkan langkah-langkah (pisahkan dengan koma)"
                />
              </div>

              <div className="ModalButtons">
                <button className="CancelButton" onClick={() => setIsEditModalOpen(false)}>
                  Batal
                </button>
                <button className="SaveButton" onClick={handleSaveEdit}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddModalOpen && (
        <div className="Modal">
          <div className="ModalContent">
            <h2>Tambah Resep Baru</h2>

             <input
              type="text"
              value={newRecipe.nama}
              onChange={(e) => setNewRecipe({ ...newRecipe, nama: e.target.value })}
              placeholder="Nama Makanan"
            />
               <input
              type="text"
              value={newRecipe.Asal}
              onChange={(e) => setNewRecipe({ ...newRecipe, Asal: e.target.value })}
              placeholder="Asal"
            />
            <input
               type="file"
              onChange={(e) => handleImageUpload(e, newRecipe)}
            />
             <input
              type="text"
              value={newRecipe.bahan}
              onChange={(e) => setNewRecipe({ ...newRecipe, bahan: e.target.value })}
              placeholder="Bahan"
            />
               <input
              type="text"
              value={newRecipe.langkah}
              onChange={(e) => setNewRecipe({ ...newRecipe, langkah: e.target.value })}
              placeholder="Langkah-Langkah"
            />
              <button onClick={handleAddRecipe}>Tambah</button>    

               <button onClick={() => setIsAddModalOpen(false)}>Back</button>   
              </div>
          </div>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
          >
            {pageNum}
          </button>
        ))}
     
      </div>
    </>
  );
}
