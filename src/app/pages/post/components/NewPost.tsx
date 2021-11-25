import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostService } from '@app/core/services/post.service';
import { SignatureService } from '@app/core/services/signature.service';
import { editorConfiguration } from '@config/ckEditorConfig';
import { Navigate } from 'react-router';
import NotificationContext from '@app/shared/contexts/NotificationContext/NotificationContext';
import LoadingButton from '@app/shared/components/loading-button/LoadingButton';

const NewPost = () => {
  const postService = new PostService();
  const signatureService = new SignatureService();
  const { handleSubmit } = useForm();

  // post state
  const [imageCover, setImageCover] = useState('');
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState({});
  const [isloadingCover, setIsLoadingCover] = useState(false);
  const [errorPost, setErrorPost] = useState({
    title: false,
    description: false,
    content: false,
  });

  // API state
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  // string to array tags
  const handleMultipleTags = (e) => {
    const tagsArr = e.target.value.split(',').map((item) => item.trim());
    setTags(tagsArr);
  };

  // preview image
  const handleChangeImage = (e) => {
    setIsLoadingCover(true);
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setFile(file);
        setImageCover(reader.result.toString());
        setIsLoadingCover(false);
      };
      reader.readAsDataURL(file);
    } else {
      setIsLoadingCover(false);
    }
  };

  // on submit
  const createPost = () => {
    setErrorPost({
      title: title ? false : true,
      description: description ? false : true,
      content: content ? false : true,
    });
    content &&
      title &&
      description &&
      (async () => {
        setIsLoading(true);
        try {
          // get signedRequest
          const resSignURL: any = await signatureService.getSignURL({
            typeUpload: 'cover-post',
            fileName: file['name'],
            fileType: file['type'],
          });
          // upload image
          await postService.uploadImageInSignURL(
            resSignURL.signedRequest,
            file
          );
          // create post
          await postService.createPost({
            title,
            description,
            content,
            tags,
            cover: imageCover
              ? resSignURL.url
              : 'https://sharing-news-project.s3.amazonaws.com/cover-post/default_cover.jpg',
            status: status ? 'private' : 'public',
          });
        } catch (error) {
          setHasError(error);
        }
        setIsLoading(false);
        setIsDone(true);
      })();
  };

  // show notification
  useEffect(() => {
    if (isDone && !hasError) {
      showNotification({ isSuccess: true, message: 'New post successfully' });
    }
    if (isDone && hasError) {
      showNotification({
        isSuccess: false,
        message: 'New post unsuccessfully',
      });
    }
  }, [isDone]);

  if (isDone) {
    return <Navigate to={'/profile/me'} />;
  }

  return (
    <>
      <div className="new-post container container-sm">
        <form className="post-form" onSubmit={handleSubmit(createPost)}>
          <img
            className="post-cover"
            src={imageCover ? imageCover : '/assets/images/default_cover.jpg'}
            alt="post cover"
          />
          <div className="post-form-options">
            <label
              htmlFor="fileInput"
              title="Add cover image"
              className="choose-image"
            >
              {isloadingCover ? (
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgifimage.net%2Fwp-content%2Fuploads%2F2017%2F09%2Fajax-loading-gif-transparent-background-8.gif&f=1&nofb=1"
                  alt="loading"
                  className="loading-indicator"
                />
              ) : (
                <img
                  className="post-form-file-img"
                  src="/assets/icons/plus-icon.svg"
                  alt="add image"
                />
              )}
              <p className="choose-image-text">Select a cover image</p>
            </label>
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/*"
              className="post-form-file"
              onChange={handleChangeImage}
            />
            <input
              className="switch-toggle"
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked ? true : false)}
            />
          </div>
          <div className="post-form-group">
            <input
              className={'post-form-input post-form-title'}
              placeholder="Title"
              type="text"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {errorPost.title && (
            <span className="form-error post-form-error">
              Please write the title
            </span>
          )}
          <div className="post-form-group">
            <textarea
              className="post-form-input post-form-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >Description </textarea>
          </div>
          {errorPost.description && (
            <span className="form-error post-form-error">
              Please write the description
            </span>
          )}
          <div className="form-editor">
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              data={content}
              className="post-form-content"
              onChange={(event, editor) => {
                setContent(editor.getData());
              }}
            />
          </div>
          {errorPost.content && (
            <span className="form-error post-form-error">
              Please write the content
            </span>
          )}
          <div className="post-form-group">
            <input
              className="post-form-input post-form-description"
              placeholder="Tags (Separate multiple tags with commas)"
              type="text"
              onChange={handleMultipleTags}
            />
          </div>
          <div className="post-form-submit">
            <LoadingButton
              classBtn="btn btn-primary btn-publish"
              loading={isLoading}
            >
              Publish
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPost;
