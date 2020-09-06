import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Common/Header';
import Form from '../Common/Form';
import EmailField from '../Common/EmailField';
import PasswordField from '../Common/PasswordField';
import Button from '../Common/Button';
import ScreenBackground from '../Common/ScreenBackground';
import { login } from '../../services/restapi';
import { updateUserInfo } from './actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import swal from 'sweetalert';
import ClipLoader from 'react-spinners/ClipLoader';
import { Loader } from '../Common/Loader';
import { Link } from 'react-router-dom';

const Login = ({ history, updateUser }) => {
  const [emailId, setemailId] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [loading, setLoading] = useState(false);

  const changePasswordType = () => {
    type === 'password' ? setType('text') : setType('password');
  };
  const onSubmit = async () => {
    const body = {
      emailId,
      password
    };
    try {
      setLoading(true);
      const userInfo = await login(body);

      const userId = userInfo.uid;
      const { stsTokenManager } = userInfo;
      const { refreshToken, accessToken, expirationTime } = stsTokenManager;

      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('expirationTime', JSON.stringify(expirationTime));
      localStorage.setItem('userId', JSON.stringify(userId));
      const data = {
        emailId,
        userId
      };
      updateUser(data);
      setLoading(false);
      history.push('/home');
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

  return (
    <ScreenBackground>
      <Form>
        <Header>Login Form</Header>
        <EmailField>
          <i className="fa fa-envelope"></i>
          <input
            type="text"
            name="emailId"
            placeholder="emailId"
            onChange={e => {
              setemailId(e.target.value);
            }}
            value={emailId}
            autoComplete="off"
          />
        </EmailField>
        <PasswordField>
          <i className="fa fa-lock"></i>
          <input
            type={type}
            name="password"
            placeholder="password"
            onChange={e => {
              setPassword(e.target.value);
            }}
            value={password}
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
        <Button onClick={() => onSubmit()}> Login </Button>
        <div
          style={{
            fontWeight: '600',
            'text-align': 'center',
            'margin-top': '10px'
          }}
        >
          Not a member, <Link to="/register">Register</Link>
        </div>
      </Form>
      <Loader loading={loading}>
        <ClipLoader size={200} color={'black'} loading={loading} />
      </Loader>
    </ScreenBackground>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: data => dispatch(updateUserInfo(data))
  };
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withRouter, withConnect)(Login);
