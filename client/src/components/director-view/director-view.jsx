import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    // Death year needs to be added to the database! + Add movies that belong with this director?
    return (
      <Row className="director-view">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title> {director.Name}</Card.Title>
              <Card.Text> {director.Bio}</Card.Text>
              <Card.Text> Born: {director.Birth}</Card.Text>
              <Card.Text> Died: {director.Death}</Card.Text>
              <Link to={`/`}>
                <Button variant="info"><b>Back</b></Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
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