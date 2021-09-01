import React, { useRef, useState } from 'react';
import { Alert, FormGroup, Label, Button, Input, Form } from 'reactstrap';
import { auth } from '../config/firebase';

const Signup = () => {
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const displayNameRef = useRef(null);
  const [error, setError] = useState('');

  const onSignUpHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (phoneRef.current.value !== confirmPasswordRef.current.value) {
      setError('The passwords donot match');
      return;
    }

    await auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        phoneRef.current.value
      )
      .then((res) => {
        console.log(res, 'Registered');
      })
      .catch((error) => {
        setError(error.message);
        console.log(error, error.message);
      });

    await auth.currentUser
      .updateProfile({
        displayName: `${displayNameRef.current.value}`,
      })
      .then((res) => {
        console.log(res, 'Name Added');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="left">
        <Form className="container">
          <h1>Sign Up</h1>

          <FormGroup>
            <Input
              innerRef={displayNameRef}
              type="text"
              placeholder="Full name"
            />
          </FormGroup>

          <FormGroup>
            <Input
              innerRef={emailRef}
              type="text"
              placeholder="You are a: Dev, 
            Freelancer, Businessman"
            />
          </FormGroup>

          <FormGroup>
            <Input innerRef={phoneRef} type="number" placeholder="Phone" />
          </FormGroup>
          <FormGroup>
            <Input innerRef={emailRef} type="email" placeholder="Email" />
          </FormGroup>

          {error.length ? (
            <FormGroup>
              <Alert color="danger">
                <strong>Error!</strong> {error}.
              </Alert>
            </FormGroup>
          ) : null}

          <FormGroup>
            <Button block color="success" onClick={onSignUpHandler}>
              Join the wait list
            </Button>
          </FormGroup>
        </Form>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Signup;
