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
                <a href="/profile/eric-simons"><img src={author?.image} /></a>
                <div className="info">
                    {author && (
                        <a href={author.image} className="author">{author.username}</a>
                        // <Link to={`/profile/${author.username}`}>
                        //     <Avatar alt={author.username} src={author.image} />
                        // </Link>
                    )}
                    {/* <a href="/profile/eric-simons" className="author">{author}</a> */}
                    <span className="date">{createdAt}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {favoritesCount}
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



