import React from 'react'
import ArticleList from '../Compnoents/ArticleList';
import { useFetchArticlesFeedDataQuery } from '../Redux/ApiSlice/ArticlesApi';

const Home = () => {
  const { data, error, isLoading, refetch } = useFetchArticlesFeedDataQuery();

  console.log(data);
  
  return (
    <div className='px-4 lg:px-56'>
      <ArticleList />
      <ArticleList />
      <ArticleList />
      <ArticleList />

    </div>
  )
}

export default Home;