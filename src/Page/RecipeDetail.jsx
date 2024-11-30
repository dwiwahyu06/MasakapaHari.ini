import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react';

const RecipeDetail = () => {
  const { resep } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = resep.find((item, index) => index === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate('/Resep')}>
        <ArrowLeft /> Kembali
      </button>
      
      <div className="detail-content">
        <img src={recipe.image} alt={recipe.nama} className="detail-image" />
        <h1>{recipe.nama}</h1>
        <h3>Asal: {recipe.Asal}</h3>
        
        <div className="recipe-section">
          <h2>Bahan-bahan:</h2>
          <ul>
            {Array.isArray(recipe.bahan) ? (
              recipe.bahan.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li>{recipe.bahan}</li>
            )}
          </ul>
        </div>
        
        <div className="recipe-section">
          <h2>Langkah-langkah:</h2>
          <ol>
            {Array.isArray(recipe.langkah) ? (
              recipe.langkah.map((step, index) => (
                <li key={index}>{step}</li>
              ))
            ) : (
              <li>{recipe.langkah}</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail; 