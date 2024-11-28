 
/* eslint-disable no-unused-vars */
import { Info, Edit, Plus, Heart, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Resep() {
  const [resep, setResep] = useState([]);
  const [filteredResep, setFilteredResep] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ nama: '', Asal: '', bahan: [], langkah: [], image: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState(''); // Tambahan untuk sorting
  const itemsPerPage = 12;

  useEffect(() => {
    fetch('resep.json')
      .then((response) => response.json())
      .then((data) => {
        setResep(data);
        setFilteredResep(data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data:', error);
      });
  }, []);

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
    const updatedResep = resep.map((item) =>
      item === selectedRecipe ? selectedRecipe : item
    );
    setResep(updatedResep);
    setFilteredResep(updatedResep);
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

  return (


    <div className="Container">
      {/* <Header /> */}
      <div className="SearchContainer">
        <input type="text" placeholder="Cari resep..." value={searchTerm} onChange={handleSearch} />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Pilih Sorting</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Jawa">Asal Jawa</option>
        </select>
        <button onClick={handleDeleteSelected}>
          <Trash2 /> Hapus yang Dipilih
        </button>
      </div>

      {currentItems.map((item, index) => (
        <div className="Box" key={index}>
          <input
            type="checkbox"
            checked={checkedItems.has(item)}
            onChange={() => handleCheckboxToggle(item)}
          />
          <img src={item.image} alt={item.nama} className="RecipeImage" />
          <h2>{item.nama}</h2>
          <p>Asal: {item.Asal}</p>
          <div className="IconContainer">
            <Info className="Icon" />
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
            <h2>Edit Resep</h2>
            <input
              type="text"
              value={selectedRecipe.nama}
              onChange={(e) => setSelectedRecipe({ ...selectedRecipe, nama: e.target.value })}
              placeholder="Nama Makanan"
            />
            <input
              type="text"
              value={selectedRecipe.Asal}
              onChange={(e) => setSelectedRecipe({ ...selectedRecipe, Asal: e.target.value })}
              placeholder="Asal"
            />
            <button onClick={handleSaveEdit}>Simpan</button>
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
          </div>
        </div>
      )}
    </div>
  );
}
