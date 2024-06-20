import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import NewsPage from "./pages/NewsPage";
import { useState } from "react";

function App() {
	const [news, setNews] = useState([]);
	return (
		<div className='flex'>
			<Sidebar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/favorites' element={<FavoritesPage />} />
				<Route path='/news/:title' element={<NewsPage news={news} />} />
			</Routes>
		</div>
	);
}

export default App;
