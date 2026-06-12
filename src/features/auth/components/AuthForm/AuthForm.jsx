// import React from 'react'

import { Formik, Form, Field } from 'formik';
import Button from '../../../../components/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../store/operation';
import { useLocation, useNavigate } from 'react-router-dom';

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
    <div>
      <Formik
        key={register ? 'register' : 'login'}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          {register && (
            <>
              <label htmlFor="name">Name*</label>
              <Field name="name" id="name" />
            </>
          )}

          <label htmlFor="email">Email*</label>
          <Field name="email" id="email" />

          <label htmlFor="password">Password*</label>
          <Field name="password" id="password" type="password" />

          <Button type="submit">{register ? 'Register' : 'Login'}</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AuthForm;
