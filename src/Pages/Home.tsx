import React, { useEffect } from 'react'
import ArticleList from '../Compnoents/ArticleList';
import { useFetchArticlesDataQuery } from '../Redux/ApiSlice/ArticlesApi';
import { Article } from '../Types/types';


const Home = () => {
  const { data, error, isLoading, refetch } = useFetchArticlesDataQuery();

  console.log(data);

  useEffect(() => {
    refetch();
  }, []);


  console.log(data); // Check in console to see the structure of data

  if (isLoading) {
    return <div>Loading...</div>;
  }



  console.log(data);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 onClick={() => {
            refetch();
          }} className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link" href="">Your Feed</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>

            {
              isLoading ? <h1>lloading</h1> :
                data?.map((article: Article) => {
                  return (
                    <ArticleList 
                    author={article.author} 
                    createdAt={article.createdAt} 
                    title={article.title} 
                    description={article.description} 
                    favoritesCount={article.favoritesCount} 
                    slug={article.slug}
                    />
                  );
                })
            }



            <ul className="pagination">
              <li className="page-item active">
                <a className="page-link" href="">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="">2</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">programming</a>
                <a href="" className="tag-pill tag-default">javascript</a>
                <a href="" className="tag-pill tag-default">emberjs</a>
                <a href="" className="tag-pill tag-default">angularjs</a>
                <a href="" className="tag-pill tag-default">react</a>
                <a href="" className="tag-pill tag-default">mean</a>
                <a href="" className="tag-pill tag-default">node</a>
                <a href="" className="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className='px-4 lg:px-56'>
    //   <ArticleList />
    //   <ArticleList />
    //   <ArticleList />
    //   <ArticleList />

    // </div>
  )
}

export default Home;