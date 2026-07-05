import * as Yup from 'yup';

export const validationSchema = (isEdit) => {
  return Yup.object({
    title: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    article: Yup.string()
      .min(30, 'Too Short!')
      .max(2043, 'Too Long!')
      .required('Required'),

    photo: isEdit
      ? Yup.mixed().required('Required')
      : Yup.mixed()
          .required('Photo is required')
          .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return false;
            return value.type.startsWith('image/');
          })
          .test('fileSize', 'File size must be less than 2MB', (value) => {
            if (!value) return false;
            return value.size <= 2 * 1024 * 1024;
          }),
  });
};

export const initialValues = {
  title: '',
  article: '',
  category: '',
  photo: null, // ось тут проблема
};

export const autoResizeTextArea = (el, length) => {
  if (!el || length > 2043) return;

  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
};
