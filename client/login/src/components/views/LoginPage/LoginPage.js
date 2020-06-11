import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

//안에서 값을 바꾸기 위해서는 state를 만들어줘야 하는데
//email을 위한 state과 password를 위한 state이 각각 필요하다

function LoginPage(props) {
  const dispatch = useDispatch();

  //server에 보낼 값들을 state에서 받고 있다
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    //
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };
    //axios를 쓰지 않고 redux를 쓰기로 함
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push('/');
      } else {
        alert('Error');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />

        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
