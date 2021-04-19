import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSelectors } from "../redux/auth";
import { Jumbotron, Container } from "react-bootstrap";

const Home = () => {
  const isAuthoraized = useSelector((state) =>
    authSelectors.getIsAuthorized(state)
  );
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Hello!</h1>
        {!isAuthoraized ? (
          <>
            <p>Here you can keep safe all your contacts</p>
            <p>
              Please, <Link to={"/register"}>register</Link> to start
            </p>
            <p>
              If you are already registered, <Link to={"/login"}>login</Link> to
              see and edit your contacts
            </p>
          </>
        ) : (
          <p>
            Youre already login lets <Link to={"/contacts"}>start</Link>
          </p>
        )}
      </Container>
    </Jumbotron>
  );
};

export default Home;
