import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchOneArticleDataQuery } from '../Redux/ApiSlice/ArticlesApi';
import { Article } from '../Types/types';

const ArticleDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data, error, isLoading } = useFetchOneArticleDataQuery(slug!);
    console.log(data);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading article.</div>;
    }

    if (!data) {
        return <div>Article not found.</div>;
    }

    const { author, title, description, body, tagList, createdAt, favoritesCount } = data || {};
    const authorName = author?.username || 'Unknown Author';
    const authorImage = author?.image || 'default-image-path';

    return (

        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{title}</h1>
                    <div className="article-meta">
                        <a href={`/profile/${authorName}`}><img src={authorImage} alt={authorName} /></a>
                        <div className="info">
                            <a href={`/profile/${authorName}`} className="author">{authorName}</a>
                            <span className="date">{new Date(createdAt).toDateString()}</span>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart">Follow</i>  {authorName}
                            </button>

                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart">Favourite Article</i> {favoritesCount}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container page">
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

export default ArticleDetails;
