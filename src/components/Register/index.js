import React, { useState, useEffect } from 'react';
import Formsy from 'formsy-react';
import Header from '../Common/Header';
import Form from '../Common/Form';
import UserNameField from '../Common/UserNameField';
import PasswordField from '../Common/PasswordField';
import Button from '../Common/Button';
import ScreenBackground from '../Common/ScreenBackground';
import EmailField from '../Common/EmailField';
import PasswordHint from './PasswordHint';
import { Registration } from '../../services/restapi';
import { withRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { Loader } from '../Common/Loader';
import swal from 'sweetalert';
import Input from '../Common/Input';

const Register = ({ history }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [type, setType] = useState('password');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHintView, setPasswordHintView] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    small: false,
    caps: false,
    special: false
  });
  const [loading, setLoading] = useState(false);
  const [apiResponse, setres] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const emailRegex = new RegExp('/S+@S+.S+/');
  // useEffect(() => {
  //   callAPI();
  // }, []);

  const changePasswordType = () => {
    type === 'password' ? setType('text') : setType('password');
  };

  const onChangeRepeatPassword = e => {
    setRepeatPassword(e.target.value);
    if (e.target.value !== password) {
      return setPasswordError(true);
    }
    return setPasswordError(false);
  };

  const onPasswordFocus = bool => {
    if (bool == true) {
      return setPasswordHintView(true);
    }
    return setPasswordHintView(false);
  };

  const onChangePasswordField = e => {
    let { value } = e.target;
    let pwdValidation = passwordValidation;
    pwdValidation.length = value.length >= 8 ? true : false;
    pwdValidation.small = /(.*[a-z].*)/.test(value) ? true : false;
    pwdValidation.caps = /(.*[A-Z].*)/.test(value) ? true : false;
    pwdValidation.special = /(.*\W.*)/.test(value) ? true : false;
    setPasswordValidation(pwdValidation);
    setPassword(value);
  };

  const onSubmit = async () => {
    let errorText = '';
    if (!userName || !password || !email) {
      errorText = "Fields can't be empty";
    } else if (!password.length >= 8) {
      errorText = 'Password length should be minimum 8 characters';
    } else if (password !== repeatPassword) {
      errorText = 'Passwords are not same';
    } else if (emailRegex.test(email)) {
      errorText = 'Enter a valid email';
    }
    if (errorText.length) {
      return swal('Error', errorText, 'error');
    }

    setLoading(true);
    const data = {
      userName,
      password,
      emailId: email
    };
    try {
      await Registration(data);
      setLoading(false);
      history.push('/');
    } catch (error) {
      setLoading(false);
      if (error.message) {
        return swal({
          title: 'OOPS!',
          text: error.message,
          icon: 'error'
        });
      }
      return swal({
        title: 'OOPS!',
        text: "Something's wrong",
        icon: 'error'
      });
    }
  };

  const enableButton = () => {
    setCanSubmit(true);
  };
  const disableButton = () => {
    setCanSubmit(false);
  };

  return (
    <Formsy
      onValidSubmit={() => onSubmit()}
      preventExternalInvalidation
      onValid={enableButton}
      onInvalid={disableButton}
    >
      >
      <ScreenBackground>
        <Form>
          <Header>Registration Form</Header>
          <EmailField>
            <i className="fa fa-envelope"></i>
            <Input
              type="text"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
              validations="isEmail"
              validationError="Not a valid Email"
              autoComplete="off"
            />
          </EmailField>
          <UserNameField>
            <i className="fa fa-user"></i>
            <Input
              type="text"
              name="username"
              placeholder="username"
              onChange={e => {
                setUserName(e.target.value);
              }}
              value={userName}
              autoComplete="off"
              validations="isExisty"
              validationError="should not be empty"
            />
          </UserNameField>
          <PasswordField>
            <i className="fa fa-lock"></i>
            <Input
              type={type}
              name="password"
              placeholder="password"
              onChange={e => {
                onChangePasswordField(e);
              }}
              onFocus={() => {
                onPasswordFocus(true);
              }}
              onBlur={() => {
                onPasswordFocus(false);
              }}
              value={password}
              validations="minLength:8"
              validationError="Should contain minimum 8 characters"
            />
            <label
              onClick={() => {
                changePasswordType();
              }}
            >
              {type === 'text' ? (
                <i className="fa fa-eye"></i>
              ) : (
                <i className="fa fa-eye-slash"></i>
              )}
            </label>
          </PasswordField>
          {passwordHintView ? (
            <PasswordHint>
              <label>
                <PasswordHint valid={passwordValidation.length}>
                  <span>
                    {passwordValidation.length ? (
                      <i class="fa fa-check-circle"></i>
                    ) : (
                      <i class="fa fa-times-circle"></i>
                    )}
                  </span>
                  should contain 8 characters
                </PasswordHint>
                <PasswordHint valid={passwordValidation.caps}>
                  <span>
                    {passwordValidation.caps ? (
                      <i class="fa fa-check-circle"></i>
                    ) : (
                      <i class="fa fa-times-circle"></i>
                    )}
                  </span>
                  contain atleast 1 capital letter
                </PasswordHint>
                <PasswordHint valid={passwordValidation.small}>
                  <span>
                    {passwordValidation.small ? (
                      <i class="fa fa-check-circle"></i>
                    ) : (
                      <i class="fa fa-times-circle"></i>
                    )}
                  </span>
                  contain atleast 1 small letter
                </PasswordHint>
                <PasswordHint valid={passwordValidation.special}>
                  <span>
                    {passwordValidation.special ? (
                      <i class="fa fa-check-circle"></i>
                    ) : (
                      <i class="fa fa-times-circle"></i>
                    )}
                  </span>
                  contain atleast 1 special characters
                </PasswordHint>
              </label>
            </PasswordHint>
          ) : (
            ''
          )}
          <PasswordField error={passwordError ? 'error' : 'success'}>
            <i className="fa fa-lock"></i>
            <Input
              type="password"
              name="repeatPassword"
              placeholder="repeatPassword"
              onChange={e => {
                onChangeRepeatPassword(e);
              }}
              value={repeatPassword}
              validations="equalsField:password"
              validationError="should be same as password"
            />
          </PasswordField>
          <Button
            type="submit"
            formNoValidate={true}
            // onClick={() => onSubmit()}
            disableButton={!canSubmit}
          >
            {' '}
            Register{' '}
          </Button>
        </Form>
        <Loader loading={loading}>
          <ClipLoader size={200} color={'black'} loading={loading} />
        </Loader>
      </ScreenBackground>
    </Formsy>
  );
};

export default withRouter(Register);
