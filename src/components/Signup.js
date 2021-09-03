import React, { useRef, useState, useEffect } from 'react';
import { Alert, FormGroup, Button, Input, Form } from 'reactstrap';
import { auth } from '../config/firebase';
import './Signup.css';

const Signup = () => {
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  const phoneRef = useRef(null);
  const displayNameRef = useRef(null);
  const [error, setError] = useState('');

  var phoneNo = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;
  var name = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;

  useEffect(async () => {
    const emailMem = window.localStorage.getItem('emailForSignIn');
    const displayNameMem = window.localStorage.getItem('displayNameForSignIn');
    const phoneNumberMem = window.localStorage.getItem('phoneNumberForSignIn');
    const roleMem = window.localStorage.getItem('roleForSignIn');
    if (auth.isSignInWithEmailLink(window.location.href) && !!emailMem) {
      await auth
        .signInWithEmailLink(emailMem, window.location.href)
        .then((res) => console.log(res))
        .catch((err) => setError(err.message));
      console.log('Signed in !!!');
      console.log(auth.currentUser);

      await auth.currentUser
        .updateProfile({
          displayName: `${displayNameMem}`,
          photoURL: `https://randomuser.me/api/portraits/men/1.jpg`,
        })

        .then((res) => {
          console.log(res, 'User Info Updated');
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    }
    window.localStorage.clear();
  }, []);

  const onJoinHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (!phoneRef.current.value.match(phoneNo)) {
      setError('Invalid phone number');
      return;
    }
    if (!displayNameRef.current.value.match(name)) {
      setError(
        'Name should contain more than 4 letters and no special characters'
      );
      return;
    }

    await auth
      .sendSignInLinkToEmail(emailRef.current.value, {
        url: window.location.href,
        handleCodeInApp: true,
      })
      .then(() => {
        window.localStorage.setItem('emailForSignIn', emailRef.current.value);
        window.localStorage.setItem(
          'displayNameForSignIn',
          displayNameRef.current.value
        );
        window.localStorage.setItem(
          'phoneNumberForSignIn',
          phoneRef.current.value
        );
        window.localStorage.setItem('roleForSignIn', roleRef.current.value);
      })
      .catch((err) => setError(error.message));
  };

  return (
    <div className="flex-container">
      <div className="flex-item-left ">
        <Form className="form-container">
          <FormGroup>
            <h1 className="form-item">Sign up</h1>
            <Input
              innerRef={displayNameRef}
              type="text"
              placeholder="Full name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Input
              innerRef={roleRef}
              type="text"
              placeholder="You are a: Dev, 
            Freelancer, Businessman"
              required
            />
          </FormGroup>

          <FormGroup>
            <Input
              innerRef={phoneRef}
              type="text"
              placeholder="Phone"
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              innerRef={emailRef}
              type="email"
              placeholder="Email"
              required
            />
          </FormGroup>

          {error.length ? (
            <FormGroup>
              <Alert color="dark">
                <strong>Error!</strong> {error}.
              </Alert>
            </FormGroup>
          ) : null}

          <FormGroup className="form-item">
            <Button
              block
              className="form-btn"
              onClick={(e) => onJoinHandler(e)}
            >
              Join the wait list
            </Button>
          </FormGroup>
        </Form>
      </div>
      <div className="flex-item-right">
        <div className="content-container">
          <h1 className="text-block">
            Welcome to
            <br /> our community
          </h1>
          <br />
          <p className="text-block">
            Integrating innovation, community and providing our members with the
            best user experience. Sign up to get access to our key features.
          </p>
          <br />
          <br />
          <img
            src="https://randomuser.me/api/portraits/men/9.jpg"
            alt="Avatar"
            className="avatar"
          />
          <img
            style={{ left: -25 }}
            src="https://randomuser.me/api/portraits/women/71.jpg"
            alt="Avatar"
            className="avatar"
          />
          <img
            style={{ left: -32 }}
            src="https://randomuser.me/api/portraits/women/11.jpg"
            alt="Avatar"
            className="avatar"
          />
          <p className="text-block-img">1k+ members have joined.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
