import { AppProvider } from './context/AppContext';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import Login from "./Page/login";
import Resep from "./Page/Resep";
import AboutUs from "./Page/About";
import Contact from "./Page/Contact";
import RecipeDetail from "./Page/RecipeDetail";
import PopularRecipes from "./Page/PopularRecipes";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/Resep"
              element={<Resep />}
            />
            <Route path="/About" element={<AboutUs />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/popular" element={<PopularRecipes />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
