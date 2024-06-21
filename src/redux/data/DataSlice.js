import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  articlesPerPage:[],
  favoriteArticle:[],
  favoriteArticlePerPage:[],
  error: null,
  loading: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.articles = [];
    },
    fetchSuccess: (state, action) => {
      state.articles = action.payload;
      state.articlesPerPage = action.payload.slice(0,4);
      state.loading = false;
      state.error = null;
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setArticlesPerPage : (state,action)=>{
      state.articlesPerPage = action.payload.filteredData?.slice(action.payload.startIndex,action.payload.startIndex+4);
    },
    setFavoriteArticle : (state,action)=>{
      state.favoriteArticle = action.payload;
    },
    setFavoriteArticlesPerPage : (state,action)=>{
      state.favoriteArticlePerPage = action.payload.filteredFavorites.slice(action.payload.startIndex,action.payload.startIndex+4);
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setArticlesPerPage,
  setFavoriteArticle,
  setFavoriteArticlesPerPage
} = dataSlice.actions;

export default dataSlice.reducer;