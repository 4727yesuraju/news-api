import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getRandomColor } from "../lib/utils";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteArticlesPerPage } from "../redux/data/DataSlice";

const FavoritesPage = () => {
	const data = useSelector(state=>state.data);
	const dispatch = useDispatch()
	const favorites = JSON.parse(JSON.stringify(data.favoriteArticle));

	const [filteredFavorites,setFilteredFavorites] = useState([...favorites]);

	//for pagination
	const [startIndex,setStartIndex] = useState(0);

	useEffect(()=>{
		dispatch(setFavoriteArticlesPerPage({filteredFavorites,startIndex}))	
	},[filteredFavorites,startIndex])

	function setStartIndexValue(e){
		setStartIndex(e.target.ariaLabel * 4);
	}

	const handleSearchNews = (e) => {
		e.preventDefault();
		setStartIndex(0);
		setFilteredFavorites([...favorites.filter(article=>article.title.toLowerCase().includes(e.target[0].value.toLowerCase()))]);
	};


	return (
		<div className='bg-[#faf9fb] flex-1 p-10 min-h-screen'>
			<form onSubmit={handleSearchNews} className="flex items-center gap-2">
					<label className='input shadow-md flex items-center gap-2 flex-1'>
						<Search size={"24"} />
						<input
							type='text'
							className='text-sm md:text-md grow'
							placeholder='What do you want to cook today?'
						/>
					</label>	
				</form>
			<div className='max-w-screen-lg mx-auto'>
				<p className='font-bold text-3xl md:text-5xl my-4'>My Favorites</p>

				{filteredFavorites.length === 0 && (
					<div className='h-[80vh] flex flex-col items-center gap-4'>
						<img src='/404.svg' className='h-3/4' alt='404 svg' />
					</div>
				)}

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{data.favoriteArticlePerPage.map((news) => (
						<NewsCard key={news.article_id} news={news} {...getRandomColor()} />
					))}
				</div>

				{/* pagination */}
			{filteredFavorites.length>4 && <div className="join flex justify-center py-5">
				   {
					 [... new Array(Math.ceil(filteredFavorites.length/4))].map((i,_ind)=>{
						return <input key={_ind} className="join-item btn btn-square" type="radio" name="options" aria-label={_ind} checked={startIndex/4 == _ind} onChange={setStartIndexValue} />
					 })
				   }
			</div>}
			</div>
		</div>
	);
};
export default FavoritesPage;
