import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
const logoImg =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png'

const SignupSchema = Yup.object().shape({
  YourName: Yup.string()
    .trim()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required!'),
  email: Yup.string().trim().email('Invalid email').required('Required!'),
  Password: Yup.string()
    .trim()
    .min(6, 'Minimume 6 Characters')
    .required('Required!'),
  Re_enter_password: Yup.string()
    .trim()
    .oneOf([Yup.ref('Password'), null])
    .required('Required!'),
})

function SignUp() {
  const navigate = useNavigate()
  const handleSubmit = async (values) => {
    const { Password, YourName, email, Re_enter_password } = values
    try {
      await axios
        .post('auth/register', {
          username: YourName,
          email,
          Password,
          ConfirmPassword: Re_enter_password,
        })
        .then(() => navigate('/signin'))
    } catch (error) {
      alert(error)
    }
  }

  return (
    <MainContainer>
      <ImageContainer>
        <img src={logoImg} alt="" />
      </ImageContainer>
      <Container>
        <h3>Create account</h3>
        <Formik
          initialValues={{
            YourName: '',
            Password: '',
            Re_enter_password: '',
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched, validateOnChange, values, validateOnBlur }) => (
            <Form>
              <FormContainer>
                <FormGroup>
                  <label className="Label" htmlFor="YourName">
                    Your Name
                  </label>
                  <Field
                    className={`Field ${
                      errors.YourName && touched.YourName
                        ? 'FieldError'
                        : touched.YourName
                        ? 'FieldSuccess'
                        : null
                    }`}
                    name="YourName"
                  />
                  {errors.YourName && touched.YourName ? (
                    <Error>{errors.YourName}</Error>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <label className="Label" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className={`Field ${
                      errors.email && touched.email
                        ? 'FieldError'
                        : touched.email
                        ? 'FieldSuccess'
                        : null
                    }`}
                    name="email"
                    type="email"
                  />
                  {errors.email && touched.email ? (
                    <Error>{errors.email}</Error>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <label className="Label" htmlFor="Your_Name">
                    Password
                  </label>
                  <Field
                    className={`Field ${
                      errors.Password && touched.Password
                        ? 'FieldError'
                        : touched.Password
                        ? 'FieldSuccess'
                        : null
                    }`}
                    name="Password"
                    type="password"
                  />
                  {errors.Password && touched.Password ? (
                    <Error>{errors.Password}</Error>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <label className="Label" htmlFor="Re_enter_password">
                    Re_enter Password
                  </label>
                  <Field
                    className={`Field ${
                      errors.Re_enter_password && touched.Re_enter_password
                        ? 'FieldError'
                        : touched.Re_enter_password
                        ? 'FieldSuccess'
                        : null
                    }`}
                    name="Re_enter_password"
                    type="password"
                  />
                  {errors.Re_enter_password && touched.Re_enter_password ? (
                    <Error>{errors.Re_enter_password}</Error>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <button className="button" type="submit">
                    Submit
                  </button>
                </FormGroup>

                <FormGroup>
                  <p>
                    Already have an account?
                    <Link to={'/signin'}>
                      {' '}
                      <span>Sign-In</span>
                    </Link>
                  </p>
                </FormGroup>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Container>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 50px;
  @media only screen and (max-width: 767px) {
    width: 100%;
    margin: 0;
    margin-top: 50px;
  }
`
const ImageContainer = styled.div`
  height: 80px;
  margin: auto;
  width: 50%;
  object-fit: contain;
  img {
    height: 100%;
    width: 100%;
  }
`

const Container = styled.div`
  margin-top: 20px;
  border: 1px solid gray;

  h3 {
    text-align: center;
  }
  @media only screen and (max-width: 767px) {
    border: none;
    border-top: 1px solid gray;
  }
`
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
`
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  .Label {
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .Field {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    outline: none;
  }
  .FieldError {
    border: 1px solid red;
  }
  .FieldSuccess {
    border: 1px solid green;
  }

  .button {
    margin-top: 20px;
    background-color: #f6da94;
    padding: 10px;
    font-size: large;
    font-weight: 700;
  }
  p {
    text-align: center;
    font-weight: 500;
    span {
      color: blue;
    }
  }
`
const Error = styled.div`
  color: red;
`

export default SignUp
