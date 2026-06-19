import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../../components/UI/Button/Button';
import { loginUser, registerUser } from '../../store/operation';

import css from './AuthForm.module.css';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const register = location.pathname === '/auth/register';

  const initialValues = register
    ? {
        name: '',
        email: '',
        password: '',
      }
    : {
        email: '',
        password: '',
      };

  // todo handlers
  const handleSubmit = async (values, actions) => {
    try {
      if (register) {
        await dispatch(registerUser(values)).unwrap();

        await dispatch(
          loginUser({
            email: values.email,
            password: values.password,
          })
        ).unwrap();

        navigate('/');
        //
      } else {
        await dispatch(loginUser(values)).unwrap();
        navigate('/');
      }
      actions.resetForm();
    } catch (error) {
      alert(error);
    }
  };

  // JSX
  return (
    <>
      <Formik
        key={register ? 'register' : 'login'}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          {register && (
            <div className={css.wrapField}>
              <label htmlFor="name">
                Full Name<span className={css.star}>*</span>
              </label>
              <Field
                name="name"
                id="name"
                placeholder="Your name and surname"
              />
            </div>
          )}

          <div className={css.wrapField}>
            <label htmlFor="email">
              Email<span className={css.star}>*</span>
            </label>
            <Field name="email" id="email" />
          </div>

          <div className={css.wrapField}>
            <label htmlFor="password">
              Password<span className={css.star}>*</span>
            </label>
            <Field
              name="password"
              id="password"
              type="password"
              placeholder="********"
            />
          </div>

          <Button className={css.submit} type="submit">
            {register ? 'Register' : 'Login'}
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default AuthForm;
