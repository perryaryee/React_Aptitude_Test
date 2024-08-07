import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteArticleDataMutation, useFetchArticlesDataQuery, useFetchOneArticleDataQuery, useUpdateArticleDataMutation } from '../Redux/ApiSlice/ArticlesApi';
import { useSelector } from 'react-redux';
import { RootState, selectUserToken } from '../Redux/Slice/UserSlice';
import { Article } from '../Types/types';

const EditArticle: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { data, error, isLoading } = useFetchOneArticleDataQuery(slug!);
    const [updateArticleData] = useUpdateArticleDataMutation();

    const token = useSelector((state: RootState) => selectUserToken(state));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tagList, setTagList] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setDescription(data.description);
            setBody(data.body);
            setTagList(data.tagList);
        }
    }, [data]);



    const [deleteArticleData] = useDeleteArticleDataMutation();

    const handleDeleteArticle = async (event: any) => {
        event.preventDefault();

        try {
            await deleteArticleData(slug!).unwrap();
            // refetch();
            navigate('/');
        } catch (error) {
            console.error('Failed to delete the article:', error);
        }
    };


    const handleSubmit = async () => {
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }

        try {
            const updatedArticle: Article = await updateArticleData({
                slug: slug!,
                article: { title, description, body, tagList },
            }).unwrap();

            navigate(`/article/${updatedArticle.slug}`);
        } catch (error) {
            console.error('Failed to update the article:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading article.</div>;
    }

    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <ul className="error-messages">
                            {/* Error messages can be handled here */}
                        </ul>
                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Article Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="What's this article about?"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control"
                                        rows={8}
                                        placeholder="Write your article (in markdown)"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                        value={tagList.join(' ')}
                                        onChange={(e) => setTagList(e.target.value.split(' '))}
                                    />
                                    <div className="tag-list">
                                        {tagList.map((tag, index) => (
                                            <span key={index} className="tag-default tag-pill">
                                                <i className="ion-close-round"></i> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </fieldset>
                                <div className=' flex justify-end '>
                                    <button onClick={handleDeleteArticle} className="btn btn-lg btn-outline-danger mx-2">
                                        <i className="ion-trash-a"></i> Delete Article
                                    </button>
                                    <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={handleSubmit}>
                                        Edit Article
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditArticle;



















