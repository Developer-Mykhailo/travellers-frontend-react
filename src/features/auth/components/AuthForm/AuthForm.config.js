import * as Yup from 'yup';

export const getSchema = (register) => {
  const AuthFormSchema = register
    ? Yup.object({
        name: Yup.string()
          .min(3, 'Too short')
          .max(32, 'Too long')
          .required('Required'),

        email: Yup.string()
          .email('Must be a valid email!')
          .required('Required'),

        password: Yup.string().min(8, 'Too short').required('Required'),
      })
    : Yup.object({
        email: Yup.string()
          .email('Must be a valid email!')
          .required('Required'),

        password: Yup.string().min(8, 'Too short').required('Required'),
      });
  return AuthFormSchema;
};
