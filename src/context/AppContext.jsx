import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [favoriteList, setFavoriteList] = useState([]);
  const [resep, setResep] = useState([]);
  const [filteredResep, setFilteredResep] = useState([]);

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
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      favoriteCount,
      setFavoriteCount,
      favoriteList,
      setFavoriteList,
      handleFavoriteToggle,
      resep,
      setResep,
      filteredResep,
      setFilteredResep
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
} 