import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function formikForm() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log('Formik Submitted:', values)}
    >
      {() => (
        <Form>
          <Field name="username" placeholder="Username" />
          <ErrorMessage name="username" component="div" />
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
}

export default formikForm;
