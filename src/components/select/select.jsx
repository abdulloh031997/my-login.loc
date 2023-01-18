import React from 'react';
import SelectComponent from 'react-select';

const customStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: 'white',
    boxShadow: 'none',
    borderRadius: '0',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isFocused || isSelected ? '#CF9338' : '',
    color: isFocused || isSelected ? 'white' : '',
    ':active': {
      backgroundColor: '#CF9338',
    },
    ':hover': {
      backgroundColor: 'rgba(207, 147, 56, 0.5);',
    },
  }),
  singleValue: (base, { isFocused }) => ({
    ...base,
  }),
  multiValue: (base, { isFocused }) => ({
    ...base,
    backgroundColor: '#e5f2f6',
    height: '20px',
  }),
  multiValueLabel: (base, { isFocused }) => ({
    ...base,
  }),
  multiValueRemove: (base, { isFocused }) => ({
    ...base,
  }),
};

export const Select = (props) => (
  <SelectComponent
    classNamePrefix='react-select'
    styles={customStyles}
    {...props}
  />
);
