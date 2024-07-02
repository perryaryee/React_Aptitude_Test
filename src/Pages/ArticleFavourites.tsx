import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchOneArticleDataQuery } from '../Redux/ApiSlice/ArticlesApi';
import { Article } from '../Types/types';
import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from '../Redux/ApiSlice/FavouritesApi';
import { useFollowUserMutation, useGetProfileQuery, useUnfollowUserMutation } from '../Redux/ApiSlice/ProfileApi';
import dayjs from 'dayjs';

const ArticleFavourites: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data, error, isLoading, refetch: refetchData } = useFetchOneArticleDataQuery(slug!);

    const [favoriteArticleMutation] = useFavoriteArticleMutation();
    const [unfavoriteArticleMutation] = useUnfavoriteArticleMutation();

    // State to track favorite status
    const [favorited, setFavorited] = React.useState<boolean>(false);
    const [loadingFavorite, setLoadingFavorite] = React.useState<boolean>(false);

    useEffect(() => {
        if (data) {
            setFavorited(data.favorited);
        }
    }, [data]);

    const handleFavorite = async () => {
        if (!loadingFavorite) {
            setLoadingFavorite(true);
            try {
                await favoriteArticleMutation(slug!).unwrap();
                setFavorited(true);
                refetchData()
            } catch (error) {
                console.error('Failed to favorite article:', error);
            } finally {
                setLoadingFavorite(false);
            }
        }
    };

    const handleUnfavorite = async () => {
        if (!loadingFavorite) {
            setLoadingFavorite(true);
            try {
                await unfavoriteArticleMutation(slug!).unwrap();
                setFavorited(false);
                refetchData()
            } catch (error) {
                console.error('Failed to unfavorite article:', error);
            } finally {
                setLoadingFavorite(false);
            }
        }
    };






    const { author, title, description, body, tagList, createdAt, favoritesCount } = data || {};
    const authorName = author?.username || 'Unknown Author';
    const authorImage = author?.image || 'default-image-path';


    const { data: profileData, isLoading: profileDataLoading, isError, refetch } = useGetProfileQuery(authorName || '');

    console.log(profileData?.following);



    const [followUser, { isLoading: followLoading }] = useFollowUserMutation();
    const [unfollowUser, { isLoading: unfollowLoading }] = useUnfollowUserMutation();

    const handleFollow = async () => {
        try {
            await followUser(authorName!).unwrap();
            refetch(); // Refetch profile data to update the follow status
        } catch (error) {
            console.error('Failed to follow the user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await unfollowUser(authorName!).unwrap();
            refetch(); // Refetch profile data to update the follow status
        } catch (error) {
            console.error('Failed to unfollow the user:', error);
        }
    };






    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading article.</div>;
    }

    if (!data) {
        return <div>Article not found.</div>;
    }



    return (

        <div className="article-page">
            <div className="banner">
                <div className="container  px-3 lg:px-40">
                    <h1>{title}</h1>
                    <div className="article-meta">
                        <a href={`/profile/${authorName}`}><img src={authorImage} alt={authorName} /></a>
                        <div className="info">
                            <a href={`/profile/${authorName}`} className="author">{authorName}</a>
                            <span className="date">
                                {dayjs(createdAt).format('MMMM D, YYYY h:mm A')}
                            </span>
                        </div>
                        <div>
                            {profileData?.following ? <button disabled={unfollowLoading || followLoading}
                                onClick={handleUnfollow} className="btn btn-outline-primary btn-sm pull-xs-right mx-2">
                                <i className="ion-heart">Unfollow</i>  {authorName}
                            </button> : <button disabled={followLoading || unfollowLoading}
                                onClick={handleFollow} className="btn btn-outline-primary btn-sm pull-xs-right mx-2">
                                <i className="ion-heart">Follow</i>  {authorName}
                            </button>}


                            <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={favorited ? handleUnfavorite : handleFavorite} disabled={loadingFavorite}>
                                <i className="ion-heart"></i>
                                &nbsp; {favorited ? 'Unfavorite Article' : 'Favorite Article'} <span className="counter">({favoritesCount})</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container page px-3 lg:px-40">
                <div className="row article-content">
                    <div className="col-md-12">
                        <p>{body}</p>
                    </div>
                </div>
                <ul className="tag-list">
                    {tagList && tagList.map((tag, index) => (
                        <li key={index} className="tag-default tag-pill tag-outline">{tag}</li>
                    ))}
                </ul>
                <hr />
            </div>
        </div>
    );
}

export default ArticleFavourites;
