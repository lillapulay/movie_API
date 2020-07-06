import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

// It has no state and doesn’t need lifecycle hooks, so doesn't have to be a class component
// It's basically a wrapper around a React Bootstrap text imput + connected to the store
// The VisibilityFilterInput component will be used as a sub-component of MoviesList
function VisibilityFilterInput(props) {
  return <Form.Control className="movies-filter"
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Filter..."
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);