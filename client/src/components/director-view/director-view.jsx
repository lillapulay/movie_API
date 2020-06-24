import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    // Death year needs to be added to the database! + Add movies that belong with this director?
    return (
      <div className="director-view">
        <Container>
          <Card>
            <Card.Body>
              <Card.Title> Name: {director.Name}</Card.Title>
              <Card.Text> Bio: {director.Bio}</Card.Text>
              <Card.Text> Born: {director.Birth}</Card.Text>
              <Card.Text> Died: {director.Death}</Card.Text>
              <Link to={`/`}>
                <Button variant="info"><b>Back</b></Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string
  }).isRequired,
};