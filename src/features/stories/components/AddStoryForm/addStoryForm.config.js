import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  descr: Yup.string()
    .min(15, 'Too Short!')
    .max(170, 'Too Long!')
    .required('Required'),
  article: Yup.string()
    .min(25, 'Too Short!')
    .max(2000, 'Too Long!')
    .required('Required'),
  photo: Yup.mixed()
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

export const initialValues = {
  title: '',
  article: '',
  category: '',
  descr: '',
  photo: null,
};

export const autoResizeTextArea = (el) => {
  if (!el) return;

  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
};
