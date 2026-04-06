import { Formik, Form } from 'formik';
import { useId, useRef, useState } from 'react';
import placeHolder from '../../../../assets/images/placeholder.jpg';
import Button from '../../../../components/UI/Button/Button';

const AddStoryForm = () => {
  const photoFieldId = useId();
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // handlers
  const handleOpenPicker = () => {
    inputRef.current.click();
  };

  // JSX
  return (
    <Formik
      initialValues={{ photo: null }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ setFieldValue, values /* receive from formik */ }) => {
        const handleFileChange = (e) => {
          const file = e.target.files[0];

          if (!file) return;

          setFieldValue('photo', file); // put the file in Formik
          setPreview(URL.createObjectURL(file)); // do a preview separately
        };

        const handleDeletePhoto = () => {
          setPreview(null);
          values.photo = null;
        };

        return (
          <Form>
            <span>Article cover</span>

            <div className="wrapImg">
              <img src={preview || placeHolder} alt="preview" />
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              id={photoFieldId}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <Button
              variant="secondary"
              onClick={!values.photo ? handleOpenPicker : handleDeletePhoto}
            >
              {values.photo ? 'Delete photo' : 'Upload photo'}
            </Button>

            <Button type="submit">Save</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddStoryForm;
