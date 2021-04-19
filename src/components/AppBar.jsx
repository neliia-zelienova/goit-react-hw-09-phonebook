import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors, authOperations } from "../redux/auth";
import { Navbar, Button, Form, Toast } from "react-bootstrap";

const AppBar = ({ onLogout }) => {
  const userEmail = useSelector((state) => authSelectors.getUserEmail(state));
  const isAuthorazed = useSelector((state) =>
    authSelectors.getIsAuthorized(state)
  );
  const errorMessage = useSelector((state) =>
    authSelectors.getErrorMessage(state)
  );

  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(authOperations.logout()), [
    dispatch,
  ]);

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">PhoneBook</Navbar.Brand>

      {isAuthorazed && (
        <>
          <Navbar.Toggle />
          <Toast show={errorMessage}>
            <Toast.Body>{errorMessage}</Toast.Body>
          </Toast>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="text-center mr-sm-2">{`Signed in as: ${userEmail}`}</Navbar.Text>
            <Form inline>
              <Button type="button" onClick={logout} variant="danger">
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

export default AppBar;
