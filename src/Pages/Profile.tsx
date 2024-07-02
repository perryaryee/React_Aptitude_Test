import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFollowUserMutation, useGetProfileQuery, useUnfollowUserMutation } from '../Redux/ApiSlice/ProfileApi';
import { useFetchArticlesFeedDataQuery, useFetchFavoritedArticlesQuery } from '../Redux/ApiSlice/ArticlesApi';
import ArticleList from '../Compnoents/ArticleList';
import { Article } from '../Types/types';

const UserProfileComponent: React.FC = () => {
    const navigate = useNavigate();
    const { username } = useParams<{ username?: string }>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    
    const handlePageChange = (page: number) => setCurrentPage(page);

    const { data: Favorited_Articles, error, isLoading: Favorited_Loading, refetch: refreshFavorites } = useFetchFavoritedArticlesQuery(
        { username: username || '', page: currentPage },
        { skip: !username }
    );

    const { data: MyfeedData, error: MyfeedError, isLoading: MyfeedLoading, refetch: FeedLoading } = useFetchArticlesFeedDataQuery({ page: currentPage });

    useEffect(() => {
        refreshFavorites();
        FeedLoading();
    }, []);

    const [activeTab, setActiveTab] = useState<'My Articles' | 'Favorited Articles'>('My Articles');
    const handleTabClick = (tab: 'My Articles' | 'Favorited Articles') => setActiveTab(tab);

    const articles = activeTab === 'My Articles' ? MyfeedData?.articles : Favorited_Articles?.articles;
    const articlesCount = activeTab === 'My Articles' ? MyfeedData?.articlesCount : Favorited_Articles?.articlesCount;

    useEffect(() => {
        if (articlesCount) {
            setTotalPages(Math.ceil(articlesCount / 10)); // Assuming 10 articles per page
        }
    }, [articlesCount]);

    const { data: profileData, isLoading, isError, refetch } = useGetProfileQuery(username || '');

    useEffect(() => {
        refetch();
    }, [])
    

    const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
    const [unfollowUser, { isLoading: unfollowLoading }] = useUnfollowUserMutation();

    const handleFollow = async () => {
        try {
            await followUser(username!).unwrap();
            refetch(); // Refetch profile data to update the follow status
        } catch (error) {
            console.error('Failed to follow the user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await unfollowUser(username!).unwrap();
            refetch(); // Refetch profile data to update the follow status
        } catch (error) {
            console.error('Failed to unfollow the user:', error);
        }
    };

    if (!username) {
        return <div>Username not provided</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !profileData) {
        return <div>Error fetching profile.</div>;
    }

    const { username: profileUsername, bio, image, following } = profileData;
    

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img src={image} className="user-img" alt="User" />
                            <h4>{profileUsername}</h4>
                            <p>{bio}</p>
                            {following ? (
                                <button
                                    disabled={unfollowLoading || followLoading}
                                    onClick={handleUnfollow}
                                    className="btn btn-sm btn-outline-secondary action-btn"
                                >
                                    <i className="ion-plus-round"></i>
                                    &nbsp; Unfollow {profileUsername}
                                </button>
                            ) : (
                                <button
                                    disabled={followLoading || unfollowLoading}
                                    onClick={handleFollow}
                                    className="btn btn-sm btn-outline-secondary action-btn"
                                >
                                    <i className="ion-plus-round"></i>
                                    &nbsp; Follow {profileUsername}
                                </button>
                            )}
                            <button
                                onClick={() => navigate('/settings')}
                                className="btn btn-sm btn-outline-secondary action-btn mx-2"
                            >
                                <i className="ion-gear-a"></i>
                                &nbsp; Edit Profile Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a
                                        onClick={() => handleTabClick('My Articles')}
                                        className={`nav-link ${activeTab === 'My Articles' ? 'active' : ''}`}
                                        href="#"
                                    >
                                        My Articles
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        onClick={() => handleTabClick('Favorited Articles')}
                                        className={`nav-link ${activeTab === 'Favorited Articles' ? 'active' : ''}`}
                                        href="#"
                                    >
                                        Favorited Articles
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {activeTab === 'My Articles' && MyfeedLoading && <h1>Loading My Feed...</h1>}
                        {activeTab === 'Favorited Articles' && Favorited_Loading && <h1>Loading Favorited Articles...</h1>}

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
                </div>
            </div>
        </div>
    );
};

export default UserProfileComponent;













