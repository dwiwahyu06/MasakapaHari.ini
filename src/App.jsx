/* eslint-disable no-unused-vars */
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Footer from "./Component/Footer";
// import Header from "./Component/Header";
// import Resep from "./Page/Resep";
// import AboutUs from "./Page/About"; 
// import Contact from './Page/Contact';
// import { BookHeart } from 'lucide-react';
// import React, { useState } from 'react';

// export default function App() {
//   const [favoriteCount, setFavoriteCount] = useState(0);
//   const [favoriteList, setFavoriteList] = useState([]); // Tambahkan state untuk daftar favorit

//   // Fungsi untuk menambah jumlah favorit dan menyimpan data favorit
//   const handleFavoriteToggle = (item) => {
//     setFavoriteCount(prevCount => prevCount + 1);

//     // Menambah item ke daftar favorit jika belum ada di daftar
//     setFavoriteList(prevList => {
//       if (!prevList.find(favItem => favItem.nama === item.nama)) {
//         return [...prevList, item];
//       }
//       return prevList;
//     });
//   };

//   return (
//     <Router>
//       <div>
//         <Header />
//         <div className="BookHeartContainer">
//           <BookHeart />
//           <span className="FavoriteCount">{favoriteCount}</span>
//         </div>
        
//         {/* Daftar Favorit */}
//         <div className="FavoriteListContainer">
//           <h3>Daftar Favorit:</h3>
//           <ul>
//             {favoriteList.map((item, index) => (
//               <li key={index}>{item.nama}</li>
//             ))}
//           </ul>
//         </div>

//         <Routes>
//           <Route 
//             path='/Contact' 
//             element={<Contact />} 
//           />
//           <Route 
//             path='/Resep' 
//             element={<Resep onFavoriteToggle={handleFavoriteToggle} />} 
//           />
//           <Route
//             path='/Resep'
//             element={<Resep />}/>
//           {/* <Route 
//             path='/Data'
//             element={<data />}/> */}
//           <Route 
//             path="/about" 
//             element={<AboutUs />} 
//           />
//         </Routes>
        
//         <Footer />
//       </div>
//     </Router>
//   );
// }






import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import Login from "./Page/login";
import Resep from "./Page/Resep";
import AboutUs from "./Page/About";
import Contact from "./Page/Contact";
import { BookHeart } from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [favoriteList, setFavoriteList] = useState([]);

  const handleFavoriteToggle = (item) => {
    setFavoriteCount((prevCount) => prevCount + 1);
    setFavoriteList((prevList) => {
      if (!prevList.find((favItem) => favItem.nama === item.nama)) {
        return [...prevList, item];
      }
      return prevList;
    });
  };

  return (
    <Router>
      <div>
        <Header />
        

        <Routes>
          {/* Login Route */}
          <Route
            path="/"
            element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />}
          />

          {/* Proteksi Rute */}
          <Route
            path="/Resep"
            element={isLoggedIn ? <Resep onFavoriteToggle={handleFavoriteToggle} /> : <Navigate to="/" />}
          />

          <Route path="/About" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
