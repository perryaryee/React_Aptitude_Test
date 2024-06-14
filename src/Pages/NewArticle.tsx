import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostArticleDataMutation } from '../Redux/ApiSlice/ArticlesApi';
import { Article } from '../Types/types';

const NewArticleForm: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tagList, setTagList] = useState<string[]>([]);

    const [postArticle, { isLoading }] = usePostArticleDataMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const articleData = {
            article: {
                title,
                description,
                body,
                tagList
            }
        };

        try {
            const response = await postArticle(articleData).unwrap();
            console.log('Posted article:', response);
            navigate('/'); // Redirect to home or article list page
        } catch (error) {
            console.error('Failed to post article:', error);
        }
    };

    const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value.trim());
    };

    const handleAddTag = () => {
        if (tagInput && !tagList.includes(tagInput)) {
            setTagList([...tagList, tagInput]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTagList = tagList.filter(tag => tag !== tagToRemove);
        setTagList(updatedTagList);
    };

    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Article Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="What's this article about?"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control"
                                        rows={8}
                                        placeholder="Write your article (in markdown)"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        required
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                        value={tagInput}
                                        onChange={handleTagInput}
                                    />
                                    <button type="button" onClick={handleAddTag}>
                                        Add Tag
                                    </button>
                                </fieldset>
                                <div className="tag-list">
                                    {tagList.map(tag => (
                                        <span key={tag} className="tag-default tag-pill">
                                            {tag} <i className="ion-close-round" onClick={() => handleRemoveTag(tag)}></i>
                                        </span>
                                    ))}
                                </div>
                                <button className="btn btn-lg pull-xs-right btn-primary" type="submit" disabled={isLoading}>
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArticleForm;










