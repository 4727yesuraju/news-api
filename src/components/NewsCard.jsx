import { Heart, HeartPulse, Soup,SquareCode } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFavoriteArticle } from "../redux/data/DataSlice";


const NewsCard = ({ news, bg }) => {
	const data = useSelector(state=>state.data);
	const dispatch = useDispatch();

	const [isFavorite, setIsFavorite] = useState( data.favoriteArticle.some(article=>article.title === news.title));

	const addNewsToFavorites = () => {
		
		let favorites = JSON.parse(JSON.stringify(data.favoriteArticle));
		const isNewsAlreadyInFavorites = favorites.some((fav) => fav.article_id === news.article_id);
		
		if (isNewsAlreadyInFavorites) {
			favorites = favorites.filter((fav) => fav.article_id !== news.article_id);
			setIsFavorite(false);
		} else {
			favorites.unshift(news);
			setIsFavorite(true);
		}

		dispatch(setFavoriteArticle(JSON.parse(JSON.stringify(favorites))));
	};

	return (
		<div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
			<a
				href={`https://www.youtube.com/results?search_query=${news.title} news`}
				target='_blank'
				className='relative h-32 overflow-hidden'
			>
				<div className='skeleton absolute inset-0' />
				{ <img
					src={news.image_url ? news.image_url : '/newsError.jpg'}
					alt='news img'
					className='rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity-scale duration-500 hover:scale-110	 transition-scale'
					onLoad={(e) => {
						e.currentTarget.style.opacity = 1;
						e.currentTarget.previousElementSibling.style.display = "none";
					}}
				/>}
				<div
					className='absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center
							 gap-1 text-sm opacity-95 
							'
				>
					<SquareCode size={16} /> {news.source_id}
				</div>

				<div
					className='absolute top-1 right-2 bg-white rounded-full p-1 px-2 cursor-pointer'
					onClick={(e) => {
						e.preventDefault();
						addNewsToFavorites();
					}}
				>
					{!isFavorite && <Heart size={20} className='hover:fill-red-300 hover:text-red-300' />}
					{isFavorite && <Heart size={20} className='fill-red-500 text-red-500' />}
				</div>
			</a>

			<div className='flex mt-1'>
				<p className='font-bold tracking-wide line-clamp-1'>{news.title}</p>
			</div>
			<Link className='my-2 line-clamp-3 text-justify hover:underline' to={`/news/${news.article_id}`}>
				{news.description ? news.description : "missing description"} 
			</Link>

		</div>
	);
};
export default NewsCard;
