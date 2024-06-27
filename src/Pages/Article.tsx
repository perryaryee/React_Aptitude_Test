import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from '../Redux/ApiSlice/FavouritesApi';
import { useDeleteArticleDataMutation, useFetchOneArticleDataQuery } from '../Redux/ApiSlice/ArticlesApi';
import { useGetArticleCommentsQuery, useCreateArticleCommentMutation, useDeleteArticleCommentMutation } from '../Redux/ApiSlice/CommentsApi';
import { Comment } from '../Types/types';
import { IconButton } from '@mui/material';

const Article: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    // Fetch article data based on the slug
    const { data: articleData, error: articleError, isLoading: articleLoading } = useFetchOneArticleDataQuery(slug || '');

    // Fetch comments for the article
    const { data: commentsData, error: commentsError, isLoading: commentsLoading, refetch } = useGetArticleCommentsQuery(slug || '');

    // Mutation hooks for creating and deleting comments

    const [deleteArticleData] = useDeleteArticleDataMutation();

    const handleDelete = async () => {
        try {
            await deleteArticleData(slug!).unwrap();
            navigate('/');
        } catch (error) {
            console.error('Failed to delete the article:', error);
        }
    };

    const [commentBody, setCommentBody] = useState('');
    const [createCommentMutation] = useCreateArticleCommentMutation();
    const [deleteCommentMutation] = useDeleteArticleCommentMutation();

    const handlePostComment = async () => {
        if (commentBody.trim() === '') {
            return; // Prevent posting empty comments
        }

        try {
            await createCommentMutation({ slug: slug || '', body: commentBody }).unwrap();
            setCommentBody('');
            refetch(); // Clear comment body after successful post
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteCommentMutation({ slug: slug || '', id: commentId }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    // Mutation hooks for favorite/unfavorite article
    const [favoriteArticle, { isLoading: isFavoriting }] = useFavoriteArticleMutation();
    const [unfavoriteArticle, { isLoading: isUnfavoriting }] = useUnfavoriteArticleMutation();

    const handleFavorite = async () => {
        try {
            await favoriteArticle(slug || '').unwrap();
        } catch (error) {
            console.error('Failed to favorite article:', error);
        }
    };

    const handleUnfavorite = async () => {
        try {
            await unfavoriteArticle(slug || '').unwrap();
        } catch (error) {
            console.error('Failed to unfavorite article:', error);
        }
    };

    if (articleLoading || commentsLoading) {
        return <div>Loading...</div>;
    }

    if (articleError || !articleData) {
        return <div>Error loading article.</div>;
    }

    if (commentsError) {
        return <div>Error loading comments.</div>;
    }

    const { author, title, description, body, tagList, createdAt, favoritesCount } = articleData;
    const authorName = author?.username || 'Unknown Author';
    const authorImage = author?.image || 'default-image-path';




    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{title}</h1>
                    <div className="article-meta">
                        <a href={`/profile/${author?.username}`}><img src={authorImage} alt="Author" /></a>
                        <div className="info">
                            <a href={`/profile/${author?.username}`} className="author">{authorName}</a>
                            <span className="date">{createdAt}</span>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp; Follow {authorName} <span className="counter">(10)</span>
                        </button>
                        &nbsp;&nbsp;
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={handleFavorite}
                            disabled={isFavoriting}
                        >
                            <i className="ion-heart"></i>
                            &nbsp; Favorite Post <span className="counter">({favoritesCount})</span>
                        </button>
                        <button onClick={() => {
                            navigate(`/edit-article/${slug}`)
                        }} className="btn btn-sm btn-outline-secondary">
                            <i className="ion-edit"></i> Edit Article
                        </button>
                        <button onClick={handleDelete} className="btn btn-sm btn-outline-danger">
                            <i className="ion-trash-a"></i> Delete Article
                        </button>
                    </div>
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <p>{description}</p>
                        <div dangerouslySetInnerHTML={{ __html: body || '' }} />
                        <ul className="tag-list">
                            {tagList?.map(tag => (
                                <li key={tag} className="tag-default tag-pill tag-outline">{tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr />

                {/* Comment Form */}
                <form className="card comment-form" onSubmit={(e) => { e.preventDefault(); handlePostComment(); }}>
                    <div className="card-block">
                        <textarea
                            className="form-control"
                            placeholder="Write a comment..."
                            rows={3}
                            value={commentBody}
                            onChange={(e) => setCommentBody(e.target.value)}
                        />
                    </div>
                    <div className="card-footer">
                        <img src={authorImage} className="comment-author-img" alt="Comment Author" />
                        <button type="submit" className="btn btn-sm btn-primary">Post Comment</button>
                    </div>
                </form>


                {Array.isArray(commentsData) && (
                    <div>
                        {commentsData.map((comment: any) => (
                            <div className="card" key={comment.id}>
                                <div className="card-block">
                                    <p className="card-text">{comment.body}</p>
                                </div>
                                <div className="card-footer">
                                    <a href={`/profile/${comment.author.username}`} className="comment-author">
                                        <img src={comment.author.image} className="comment-author-img" alt="Comment Author" />
                                    </a>

                                    <span className="mod-options">
                                        <IconButton onClick={() => handleDeleteComment(comment.id)}>
                                            <svg color='red' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </IconButton>

                                        {/* <i className="ion-trash-a"></i> */}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Article;




















