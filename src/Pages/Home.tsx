


import React, { useEffect } from 'react'
import ArticleList from '../Compnoents/ArticleList';
import { useFetchArticlesDataQuery, useFetchArticlesFeedDataQuery } from '../Redux/ApiSlice/ArticlesApi';
import { Article } from '../Types/types';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../Redux/Slice/UserSlice';
import { useGetTagsQuery } from '../Redux/ApiSlice/TagsApi';


const Home = () => {
  const isLoggedIn = useSelector(selectUserToken);
  const { data, error, isLoading, refetch } = useFetchArticlesDataQuery();


  const { data: tagsData, error: tagsError, isLoading: tagsLoading, refetch: refetchTags } = useGetTagsQuery();

  console.log(tagsData);

  const { data: feedData, error: feedError, isLoading: feedLoading } = useFetchArticlesFeedDataQuery();
  console.log(feedData);


  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isLoggedIn ? <li className="nav-item">
                  <a className="nav-link" href="">Your Feed</a>
                </li> : null}

                <li className="nav-item">
                  <a className="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>

            {
              isLoading ? <h1>loading</h1> :
                data?.map((article: Article) => {
                  return (
                    <ArticleList
                      key={article.slug}
                      author={article.author}
                      createdAt={article.createdAt}
                      title={article.title}
                      description={article.description}
                      favoritesCount={article.favoritesCount}
                      slug={article.slug}
                      tagList={article.tagList}
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
                {tagsLoading ? (
                  <p>Loading tags...</p>
                ) : (
                  tagsData?.map((tag: string) => (
                    <a key={tag} href="" className="tag-pill tag-default">{tag}</a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;