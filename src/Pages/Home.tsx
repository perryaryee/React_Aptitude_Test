import React, { useState, useEffect } from 'react';
import ArticleList from '../Compnoents/ArticleList';
import { useFetchArticlesDataQuery, useFetchArticlesFeedDataQuery, useFetchArticlesByTagQuery, useFetchFavoritedArticlesQuery } from '../Redux/ApiSlice/ArticlesApi';
import { Article } from '../Types/types';
import { useSelector } from 'react-redux';
import { selectUserToken, selectUsername } from '../Redux/Slice/UserSlice';
import { useGetTagsQuery } from '../Redux/ApiSlice/TagsApi';

const Home = () => {
  const isLoggedIn = useSelector(selectUserToken);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: globalData, error: globalError, isLoading: globalLoading, refetch } = useFetchArticlesDataQuery({ page: currentPage });

  useEffect(() => {
    refetch();
  }, []);


  const { data: feedData, error: feedError, isLoading: feedLoading } = useFetchArticlesFeedDataQuery({ page: currentPage });
  const { data: tagsData, error: tagsError, isLoading: tagsLoading } = useGetTagsQuery();

  const [activeTab, setActiveTab] = useState<'global' | 'feed' | 'tag'>('global');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { data: tagData, error: tagError, isLoading: tagLoading } = useFetchArticlesByTagQuery(selectedTag, {
    skip: !selectedTag,
  });

  const handleTabClick = (tab: 'global' | 'feed' | 'tag') => {
    setActiveTab(tab);
    setSelectedTag(null); // Reset selected tag when switching to other tabs
    setCurrentPage(1); // Reset to the first page
  };

  const handleTagClick = (tag: string) => {
    setActiveTab('tag');
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to the first page
  };

  const articles = activeTab === 'global' ? globalData?.articles : activeTab === 'feed' ? feedData?.articles : tagData;
  const articlesCount = activeTab === 'global' ? globalData?.articlesCount : activeTab === 'feed' ? feedData?.articlesCount : tagData?.length || 0;

  useEffect(() => {
    if (articlesCount) {
      setTotalPages(Math.ceil(articlesCount / 10)); // Assuming 10 articles per page
    }
  }, [articlesCount]);

  const username = useSelector(selectUsername);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page px-0 lg:px-40">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {isLoggedIn && (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === 'feed' ? 'active' : ''}`}
                      href="#"
                      onClick={() => handleTabClick('feed')}
                    >
                      Your Feed
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'global' ? 'active' : ''}`}
                    href="#"
                    onClick={() => handleTabClick('global')}
                  >
                    Global Feed
                  </a>
                </li>
                {selectedTag && (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === 'tag' ? 'active' : ''}`}
                      href="#"
                      onClick={() => handleTabClick('tag')}
                    >
                      #{selectedTag}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {globalLoading && activeTab === 'global' && <h1>Loading Global Feed...</h1>}
            {feedLoading && activeTab === 'feed' && <h1>Loading Your Feed...</h1>}
            {tagLoading && activeTab === 'tag' && <h1>Loading Articles for #{selectedTag}...</h1>}

            {articles?.map((article: Article) => (
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
            ))}

            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </a>
                </li>
              ))}
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
                    <a key={tag} href="#" className="tag-pill tag-default" onClick={() => handleTagClick(tag)}>
                      {tag}
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
