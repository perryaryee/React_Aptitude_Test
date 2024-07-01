import { Avatar, Divider } from '@mui/material';
import React from 'react';
import image from "../assets/demo-avatar.png";
import { Author } from '../Types/types';
import { Link } from 'react-router-dom';


interface Props {
    author?: Author,
    title?: string,
    description?: string,
    favoritesCount?: number,
    createdAt?: string,
    slug: string,
    tagList?: string[];
}

const ArticleList: React.FC<Props> = ({ author, title, description, createdAt, favoritesCount, slug, tagList }) => {
    return (
        <div className="article-preview">
            <div className="article-meta">
                <a href={`/profile/${author?.username}`}><img src={author?.image} /></a>
                <div className="info">
                    {author && (
                        <a href={`/profile/${author?.username}`} className="author text-[#5CB85C] font-semibold">{author.username}</a>
                    )}
                    <span className="date">{createdAt}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <i className="ion-heart">{favoritesCount}</i> 
                </button>
            </div>
            {slug && (
                <Link
                    to={`/articles/${slug}/favorite`}
                    // to={`/article/${slug}`} 
                    className="preview-link">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <span>Read more...</span>
                    <ul className="tag-list">
                        {tagList?.map((tag, index) => (
                            <li key={index} className="tag-default tag-pill tag-outline">{tag}</li>
                        ))}
                    </ul>
                </Link>
            )}
        </div>
    )
}

export default ArticleList;



