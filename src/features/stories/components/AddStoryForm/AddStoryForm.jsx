import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useId, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDown from '../../../../assets/icons/keyboard_arrow_down.svg?react';
import placeHolder from '../../../../assets/images/placeholder1.png';
import Button from '../../../../components/UI/Button/Button';
import { createStory, fetchCategories } from '../../store/operation';
import { selectCategories } from '../../store/selectors';
import {
  autoResizeTextArea,
  initialValues,
  validationSchema,
} from './addStoryForm.config';

import css from './AddStoryForm.module.css';
import { useNavigate } from 'react-router-dom';

const AddStoryForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const articleRef = useRef(null);
  const id = useId();

  //! effects
  // fetch categories
  useEffect(() => {
    if (categories.length > 0) return;
    dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  //todo handlers
  const resetFormUI = (resetForm) => {
    resetForm();
    setPreview(null);

    if (inputRef.current) inputRef.current.value = '';

    if (articleRef.current) articleRef.current.style.height = 'auto';
  };

  const handleOpenPicker = () => {
    inputRef.current?.click();
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

    if (inputRef.current) inputRef.current.value = '';
  };

  const handleTextAreaChange = (e, setFieldValue) => {
    let articleLength = e.target.value.length;

    setFieldValue('article', e.target.value);
    autoResizeTextArea(e.target, articleLength);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { _id } = await dispatch(createStory(values)).unwrap();

      toast.success('The story was created successfully!');

      navigate(`/stories/${_id}`);

      resetFormUI(resetForm);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  //! JSX
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          /* receive from formik */ values,
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
                <div className={css.wrapContent}>
                  <div className={css.wrapImg}>
                    <img src={preview || placeHolder} alt="preview" />
                  </div>
                  <input
                    type="file"
                    name="photo"
                    ref={inputRef}
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
                      !values.photo
                        ? handleOpenPicker
                        : () => handleDeletePhoto(setFieldValue)
                    }
                  >
                    {values.photo ? 'Delete photo' : 'Upload photo'}
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
                  <Button type="submit" disabled={!dirty || !isValid}>
                    Save
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => resetFormUI(resetForm)}
                  >
                    Cancel
                  </Button>
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
