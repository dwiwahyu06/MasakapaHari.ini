import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Trash2, Plus } from 'lucide-react';

const PopularRecipes = () => {
  const { resep } = useAppContext();
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const handleDelete = (index) => {
    const newPopularRecipes = popularRecipes.filter((_, i) => i !== index);
    setPopularRecipes(newPopularRecipes);
  };

  const handleAddRecipe = (selectedRecipe) => {
    if (!popularRecipes.find(recipe => recipe.nama === selectedRecipe.nama)) {
      setPopularRecipes([...popularRecipes, selectedRecipe]);
    }
    setIsSelectModalOpen(false);
  };

  return (
    <div className="popular-container">
      <h1>Resep Paling Populer</h1>
      
      <div className="popular-grid">
        {popularRecipes.map((recipe, index) => (
          <div key={index} className="popular-card">
            <img src={recipe.image} alt={recipe.nama} />
            <div className="popular-content">
              <h3>{recipe.nama}</h3>
              <p>Asal: {recipe.Asal}</p>
              <button 
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        <div className="add-popular" onClick={() => setIsSelectModalOpen(true)}>
          <Plus size={40} />
          <p>Tambah Resep Populer</p>
        </div>
      </div>

      {isSelectModalOpen && (
        <div className="Modal">
          <div className="ModalContent">
            <h2>Pilih Resep</h2>
            <div className="recipe-grid">
              {resep.map((recipe, index) => (
                <div 
                  key={index} 
                  className="recipe-option"
                  onClick={() => handleAddRecipe(recipe)}
                >
                  <img src={recipe.image} alt={recipe.nama} />
                  <h4>{recipe.nama}</h4>
                </div>
              ))}
            </div>
            <button 
              className="close-button"
              onClick={() => setIsSelectModalOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularRecipes; 