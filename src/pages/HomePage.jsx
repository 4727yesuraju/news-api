import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getRandomColor } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchFailure, fetchStart, fetchSuccess, setArticlesPerPage } from "../redux/data/DataSlice";



const API_KEY = import.meta.env.VITE_API_KEY;


const HomePage = () => {
	const data =  useSelector(state=>state.data);
	const [filteredData,setFilteredData] = useState(JSON.parse(JSON.stringify(data.articles)));
	const dispatch = useDispatch();

	const [startIndex,setStartIndex] = useState("");

	const fetchnews = async (category="") => {
		try {
			dispatch(fetchStart());
			 const res = await fetch(
				`https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=${category}&apiKey=${API_KEY}`
			);
			const data = await res.json();
			dispatch(fetchSuccess([...data.articles]));	
		} catch (error) {
			console.log(error.message);
			fetchFailure(error.message);
		}
	};

	useEffect(() => {
		fetchnews("");
	}, []);

	useEffect(()=>{
		dispatch(setArticlesPerPage({filteredData,startIndex}))	
	},[filteredData,startIndex])


	const handleSearchRecipe = (e) => {
		e.preventDefault();
		setStartIndex(0);
		setFilteredData([...data.articles.filter(article=>article.title.toLowerCase().includes(e.target[0].value.toLowerCase()))]);
	};

	function updateCategory(e){
		setStartIndex(0);
		fetchnews(e.target.innerHTML);
	}

	function renderPage(e){
		setStartIndex(e.target.ariaLabel * 5);
		dispatch(setArticlesPerPage(e.target.ariaLabel * 5))
	}
	
	return (
		<div className='bg-[#faf9fb] p-10 flex-1'>
			<div className='max-w-screen-lg mx-auto'>
				<form onSubmit={handleSearchRecipe} className="flex items-center gap-2">
					<label className='input shadow-md flex items-center gap-2 flex-1'>
						<Search size={"24"} />
						<input
							type='text'
							className='text-sm md:text-md grow'
							placeholder='What do you want to cook today?'
						/>
					</label>
					<div className="dropdown dropdown-hover">
						<div tabIndex={0} role="button" className="btn m-1">categories</div>
						<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
							<li><span onClick={updateCategory}>Business</span></li>
							<li><span onClick={updateCategory}>Technology</span></li>
							<li><span onClick={updateCategory}>Entertainment</span></li>
						</ul>
					</div>
				</form>

				<h1 className='font-bold text-3xl md:text-5xl mt-4'>Recommended news</h1>
				<p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular choices</p>

				<div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					
					{!data.loading && data.articles.length > 0 &&
						data.articlesPerPage?.map((recipe) => (
							<RecipeCard key={recipe.publishedAt} recipe={recipe} {...getRandomColor()} />
						))}

					{data.loading &&
						[...Array(9)].map((_, index) => (
							<div key={index} className='flex flex-col gap-4 w-full'>
								<div className='skeleton h-32 w-full'></div>
								<div className='flex justify-between'>
									<div className='skeleton h-4 w-28'></div>
									<div className='skeleton h-4 w-24'></div>
								</div>
								<div className='skeleton h-4 w-1/2'></div>
							</div>
						))}

                     {!data.loading && data.articles.length === 0 && (
							<div className='h-[80vh] w-[80vh] flex flex-col items-center gap-4'>
								<img src='/404.svg' className='h-3/4 w-3/4' alt='404 svg' />
							</div>
						)}
					</div>
				
			</div>

			{/* pagination */}
			{filteredData?.length>5 && <div className="join flex justify-center py-5">
				   {
					 [... new Array(Math.ceil(filteredData.length/5))].map((i,_ind)=>{
						return <input key={_ind} className="join-item btn btn-square" type="radio" name="options" aria-label={_ind} checked={startIndex/5 == _ind} onChange={renderPage} />
					 })
				   }
			</div>}
		</div>
	);
};
export default HomePage;
