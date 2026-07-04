import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useId, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowDown from '../../../../assets/icons/keyboard_arrow_down.svg?react';
import placeHolder from '../../../../assets/images/placeholder1.png';
import Button from '../../../../components/UI/Button/Button';
import { deleteMyStory } from '../../../user/store/operation';
import { selectUserPublicStoriesItems } from '../../../user/store/selectors';
import { setUpdatedStoryItem } from '../../../user/store/slice';
import {
  createStory,
  fetchCategories,
  fetchPublicStoryById,
  updateStory,
} from '../../store/operation';
import { selectCategories } from '../../store/selectors';
import {
  autoResizeTextArea,
  initialValues,
  validationSchema,
} from './addStoryForm.config';

import css from './AddStoryForm.module.css';

const AddStoryForm = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);
  const userPublicStoriesItems = useSelector(selectUserPublicStoriesItems);

  const { storyId } = useParams();
  const isEdit = mode === 'edit';

  const photoRef = useRef(null);
  const articleRef = useRef(null);
  const id = useId();

  const [preview, setPreview] = useState(null);
  const [story, setStory] = useState(null);
  const [isDeletingStory, setIsDeletingStory] = useState(false);

  const formValues = isEdit
    ? {
        title: story?.title ?? '',
        article: story?.article ?? '',
        category: story?.category ?? '',
        photo: story?.img ?? '',
      }
    : initialValues;

  //! effects
  // fetch story to edit
  useEffect(() => {
    if (!isEdit) return;
    if (isDeletingStory) return;

    const story = userPublicStoriesItems.find((item) => item._id === storyId);
    if (story) {
      // eslint-disable-next-line
      setStory(story);
      setPreview(story.img);
      return;
    }

    const getStory = async () => {
      try {
        const data = await dispatch(fetchPublicStoryById(storyId)).unwrap();

        setStory(data);
        setPreview(data.img);
      } catch (error) {
        console.log(error);
      }
    };

    getStory();
  }, [dispatch, storyId, userPublicStoriesItems, isEdit, isDeletingStory]);

  // fetch categories
  useEffect(() => {
    if (categories.length > 0) return;
    dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //todo handlers
  const resetFormUI = (resetForm) => {
    resetForm();
    setPreview(story.img);

    if (photoRef.current) photoRef.current.value = '';

    if (articleRef.current) articleRef.current.style.height = 'auto';
  };

  const handleOpenPicker = () => {
    photoRef.current?.click();
  };

  const handleFileChange = (e, setFieldValue, setFieldTouched) => {
    const file = e.target.files[0];

    setFieldTouched('photo', true);

    if (!file) {
      setFieldValue('photo', null);
      setPreview(null);
      return;
    }

    setFieldValue('photo', file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDeletePhoto = (setFieldValue) => {
    setPreview(null);
    setFieldValue('photo', null);

    if (photoRef.current) photoRef.current.value = '';
  };

  const handleTextAreaChange = (e, setFieldValue) => {
    let articleLength = e.target.value.length;

    setFieldValue('article', e.target.value);
    autoResizeTextArea(e.target, articleLength);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = isEdit
        ? await dispatch(updateStory({ id: storyId, values })).unwrap()
        : await dispatch(createStory(values)).unwrap();

      isEdit && dispatch(setUpdatedStoryItem(data));

      isEdit
        ? toast.success('The story was updated successfully!')
        : toast.success('The story was created successfully!');

      navigate(`/stories/${data._id}`, { replace: true });

      resetFormUI(resetForm);
    } catch (message) {
      toast.error(
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>Something went wrong</p>
          <p>{message}</p>
        </div>
      );
    }
  };

  const handleDeleteStory = async () => {
    setIsDeletingStory(true);
    try {
      await dispatch(deleteMyStory(storyId)).unwrap();

      toast.success('The story was deleted successfully!');

      navigate('/profile/published-stories', { replace: true });
    } catch (error) {
      toast.error('Oops! Somemthing went wrong!');
      console.log(error);
    }
  };

  //! JSX
  return (
    <>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema(isEdit)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          /* receive from formik */ values,
          setFieldValue,
          handleBlur,
          resetForm,
          setFieldTouched,
          // isValid,
          // dirty,
        }) => {
          return (
            <>
              <span className={css.cover}>Article cover</span>
              <Form className={css.form}>
                <div className={css.wrapContent}>
                  <div className={css.wrapImg}>
                    <img src={preview ?? placeHolder} alt="preview" />
                  </div>
                  <input
                    type="file"
                    name="photo"
                    ref={photoRef}
                    accept="image/*"
                    id={id + '-file'}
                    style={{ display: 'none' }}
                    onChange={(e) =>
                      handleFileChange(e, setFieldValue, setFieldTouched)
                    }
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="photo"
                    component="span"
                    className={css.error}
                  />
                  <Button
                    className={css.uploadPhotoBtn}
                    variant="secondary"
                    onClick={
                      isEdit
                        ? handleOpenPicker
                        : !values.photo
                          ? handleOpenPicker
                          : () => handleDeletePhoto(setFieldValue)
                    }
                  >
                    {isEdit
                      ? 'Change photo'
                      : values.photo
                        ? 'Delete photo'
                        : 'Upload photo'}
                  </Button>
                  {/* Title */}
                  <div className={css.wrapField}>
                    <label htmlFor={id + 'title'}>Title</label>
                    <Field
                      name="title"
                      type="text"
                      id={id + 'title'}
                      placeholder="Enter a story title"
                    />
                    <ErrorMessage
                      name="title"
                      component="span"
                      className={css.error}
                    />
                  </div>
                  {/* Category */}
                  <div className={clsx(css.wrapField)}>
                    <label htmlFor={id + 'category'}>Category</label>
                    <div className={css.wrapSelect}>
                      <Field
                        as="select"
                        name="category"
                        id={id + 'category'}
                        className={clsx(!values.category && css.placeholder)}
                      >
                        <option value="" disabled hidden>
                          Category
                        </option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </Field>
                      <ArrowDown className={clsx(css.arrowDown)} />
                    </div>
                  </div>

                  {/* Article */}
                  <div className={css.wrapField}>
                    <label htmlFor={id + 'article'}>Story text</label>
                    <textarea
                      ref={articleRef}
                      name="article"
                      id={id + 'article'}
                      placeholder="Your story is here"
                      value={values.article}
                      onChange={(e) => handleTextAreaChange(e, setFieldValue)}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="article"
                      component="span"
                      className={css.error}
                    />
                  </div>
                </div>

                {/* Save / Calcel */}
                <div className={css.wrapButtons}>
                  <div className={css.saveButtons}>
                    {/* <Button type="submit" disabled={!dirty || !isValid}> */}
                    <Button type="submit">Save</Button>
                    <Button
                      variant="secondary"
                      onClick={() => resetFormUI(resetForm)}
                    >
                      Cancel
                    </Button>
                  </div>

                  {isEdit && (
                    <>
                      <Button
                        className={css.deleteStory}
                        variant="secondary"
                        onClick={handleDeleteStory}
                      >
                        Delete Story
                      </Button>
                    </>
                  )}
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default AddStoryForm;
