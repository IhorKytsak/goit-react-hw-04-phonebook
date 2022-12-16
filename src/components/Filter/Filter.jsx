import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onChangeFilter }) => {
  const setFilterValue = event => {
    const value = event.currentTarget.value.toUpperCase();

    onChangeFilter(value);
  };

  return (
    <div>
      <p>Find contacts by name</p>
      <input onChange={setFilterValue}></input>
    </div>
  );
};

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
