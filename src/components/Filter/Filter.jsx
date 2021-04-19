import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactsActions, contactsSelectors } from "../../redux/contacts";
import { Form, Row, Col, Spinner, Container } from "react-bootstrap";

const Filter = () => {

  const filterValue = useSelector(state => contactsSelectors.getFilter(state));
  const isLoading = useSelector((state) =>
    contactsSelectors.getIsLoading(state)
  );
  const dispatch = useDispatch();
  const changeFilter = useCallback((e) =>
    dispatch(contactsActions.changeFilter(e.target.value)), [dispatch]
  );
  return (
    <Container>
      <Form action="">
        <Form.Group as={Row} controlId="searchField">
          <Col sm={5}>
            <Form.Control
              sm={5}
              type="text"
              name="filter"
              placeholder="Search contact by name"
              value={filterValue}
              onChange={changeFilter}
            />
          </Col>
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Filter;
