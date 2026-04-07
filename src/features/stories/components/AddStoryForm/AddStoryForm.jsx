import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId, useRef, useState } from 'react';
import ArrowDown from '../../../../assets/icons/keyboard_arrow_down.svg?react';
import placeHolder from '../../../../assets/images/placeholder.jpg';
import Button from '../../../../components/UI/Button/Button';
import {
  autoResizeTextArea,
  initialValues,
  validationSchema,
} from './addStoryForm.config';

import response from '../../../../../temp/categories.json'; /* for a while */
import css from './AddStoryForm.module.css';

const AddStoryForm = () => {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const id = useId();
  const allCategories = response.data;

  // handlers
  const handleOpenPicker = () => {
    inputRef.current.click();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values,
        setFieldValue,
        handleBlur,
        setFieldTouched /* receive from formik */,
      }) => {
        //

        const handleFileChange = (e) => {
          const file = e.target.files[0];
          setFieldTouched('photo', true);

          if (!file) {
            // setFieldValue('photo', null);
            // setPreview(null);
            return;
          }
          setFieldValue('photo', file); // put the file in Formik
          setPreview(URL.createObjectURL(file)); // do a preview separately
        };

        const handleDeletePhoto = () => {
          setPreview(null);
          setFieldValue('photo', null);
          // setFieldTouched('photo', true);

          // if (inputRef.current) {
          //   inputRef.current.value = '';
          // }
        };

        const handleTextAreaChange = (e) => {
          setFieldValue('article', e.target.value);
          autoResizeTextArea(e.target);
        };

        // JSX
        return (
          <>
            <span className={css.cover}>Article cover</span>

            <Form className={css.form}>
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
                onChange={handleFileChange}
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
                onClick={!values.photo ? handleOpenPicker : handleDeletePhoto}
              >
                {values.photo ? 'Delete photo' : 'Upload photo'}
              </Button>

              {/* Title */}
              <div className={css.wrapField}>
                <label htmlFor="title">Title</label>
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
                <label htmlFor="category">Category</label>

                <div className={css.wrapSelect}>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    className={clsx(!values.category && css.placeholder)}
                  >
                    <option value="" disabled hidden>
                      Category
                    </option>
                    {allCategories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ArrowDown className={clsx(css.arrowDown)} />
                </div>
              </div>

              {/* Descr */}
              <div className={css.wrapField}>
                <label htmlFor="descr">Brief description</label>
                <Field
                  as="textarea"
                  name="descr"
                  type="text"
                  id={id + 'descr'}
                  placeholder="Enter a brief description of the story"
                />
                <ErrorMessage
                  name="descr"
                  component="span"
                  className={css.error}
                />
              </div>

              {/* Article */}
              <div className={css.wrapField}>
                <label htmlFor="article">Story text</label>
                <textarea
                  name="article"
                  id={id + 'article'}
                  placeholder="Your story is here"
                  value={values.article}
                  onChange={handleTextAreaChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="article"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.wrapButtons}>
                <Button type="submit">Save</Button>
                <Button
                  variant="secondary"
                  type="reset"
                  onClick={handleDeletePhoto}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default AddStoryForm;
