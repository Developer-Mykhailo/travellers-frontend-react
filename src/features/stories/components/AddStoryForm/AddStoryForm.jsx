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
import {
  selectCategories,
  selectDraftCreateStory,
  selectDraftEditStory,
} from '../../store/selectors';
import {
  updateCreateDraft,
  updateEditDraft,
  updatePublicStoriesList,
} from '../../store/slice';
import {
  autoResizeTextArea,
  initialValues,
  validationSchema,
} from './addStoryForm.config';
import DraftSaver from './components/DraftSaver';
import ConfirmModal from '../../../../components/UI/ConfirmModal/ConfirmModal';
import { useModalState } from '../../../../hooks/useModalState';

import css from './AddStoryForm.module.css';

const AddStoryForm = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);
  const userPublicStoriesItems = useSelector(selectUserPublicStoriesItems);
  const draftCreateStory = useSelector(selectDraftCreateStory);
  const draftEditStory = useSelector(selectDraftEditStory);

  const { storyId } = useParams();
  const isEdit = mode === 'edit';

  const photoRef = useRef(null);
  const articleRef = useRef(null);
  const id = useId();

  const [preview, setPreview] = useState(null);
  const [story, setStory] = useState(null);
  const [isDeletingStory, setIsDeletingStory] = useState(false);
  const [shouldReinitialize, setShouldReinitialize] = useState(true);
  const { isOpen, setIsOpen, openModal, closeModal } = useModalState();

  const oldStory = {
    title: story?.title?.trim() ?? '',
    article: story?.article?.trim() ?? '',
    category: story?.category ?? '',
    photo: null,
  };

  function setInitValues(oldStory, initValues, draft) {
    const storeIsEmty = Object.keys(draft).length === 0;

    if (isEdit) return storeIsEmty ? oldStory : draft;

    return storeIsEmty ? initialValues : draft;
  }

  const formValues = setInitValues(
    oldStory,
    initialValues,
    isEdit ? draftEditStory : draftCreateStory
  );

  //! effects
  // fetch story to edit
  useEffect(() => {
    if (!isEdit) return;
    if (isDeletingStory) return;

    const story = userPublicStoriesItems?.find((item) => item._id === storyId);
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

  // unmount
  useEffect(() => {
    return () => {
      isEdit ? dispatch(updateEditDraft({})) : dispatch(updateCreateDraft({}));
    };
    // eslint-disable-next-line
  }, []);

  //reinitialize
  useEffect(() => {
    if (!shouldReinitialize) return;

    if (isEdit && story) {
      // eslint-disable-next-line
      setShouldReinitialize(false);
    }

    if (!isEdit) {
      setShouldReinitialize(false);
    }
  }, [isEdit, story, shouldReinitialize]);

  //todo handlers
  const resetFormUI = (resetForm, dirty, id, submit) => {
    isEdit ? dispatch(updateEditDraft({})) : dispatch(updateCreateDraft({}));

    resetForm();

    isEdit ? setPreview(story.img) : setPreview(null);

    if (photoRef.current) photoRef.current.value = '';

    if (articleRef.current) articleRef.current.style.height = 'auto';

    if (id && submit) {
      navigate(`/stories/${id}`, { replace: true }); // when submit
      return;
    }

    if (dirty) return; // when Cansel

    navigate(-1); // when turn Back
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
    const submit = true;
    try {
      const data = isEdit
        ? await dispatch(updateStory({ id: storyId, values })).unwrap()
        : await dispatch(createStory(values)).unwrap();

      isEdit && dispatch(setUpdatedStoryItem(data));

      isEdit
        ? toast.success('The story was updated successfully!')
        : toast.success('The story was created successfully!');

      resetFormUI(resetForm, null, data._id, submit);
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
      dispatch(updatePublicStoriesList(storyId));

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
        enableReinitialize={shouldReinitialize}
      >
        {({
          values,
          setFieldValue,
          handleBlur,
          resetForm,
          setFieldTouched,
          isValid,
          dirty,
        }) => {
          return (
            <>
              <span className={css.cover}>Article cover</span>
              <Form className={css.form}>
                <DraftSaver />

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

                {/* Save / Calcel / Delete */}
                <div className={css.wrapButtons}>
                  <div className={css.saveButtons}>
                    <Button type="submit" disabled={!dirty || !isValid}>
                      Save
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => resetFormUI(resetForm, dirty)}
                    >
                      {dirty ? 'Cancel' : 'Back'}
                    </Button>
                  </div>

                  {isEdit && (
                    <>
                      <Button
                        className={css.deleteStory}
                        variant="secondary"
                        onClick={openModal}
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

      {isOpen && (
        <ConfirmModal
          onClose={closeModal}
          title={<p style={{ color: '#E9304F' }}>Are you sure❓</p>}
          descr={'Those who like this story are going to be sad 🥺🥺🥺'}
          confirmButtonText={'Delete'}
          cancelButtonText={'Back'}
          onConfirm={handleDeleteStory}
          onCancel={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AddStoryForm;
