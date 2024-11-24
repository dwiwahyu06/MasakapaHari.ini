// import Footer from "./Component/Footer";
// import Header from "./Component/Header";
// import Resep from "./Page/Resep"; 

// export default function App() {
//   return (
//     <div>
//       <Header />
//       <Resep />
//       <Footer />
//     </div>
//   );
// }


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import Resep from "./Page/Resep";
import AboutUs from "./Page/About"; 
import Contact from './Page/Contact';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes>
          <Route path='/Contact' element={<Contact />}></Route>
          <Route path='/Resep' element={<Resep />}></Route>
          <Route path="/" element={<Resep />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}
