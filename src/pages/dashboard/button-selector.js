// radio button selector of options

import React, { useState } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

// options = [{name: string, value: string}]
export default function ButtonSelector({
  options,
  activeOptionValue,
  setOptionValue,
  tooltip
}) {
  const [id] = useState(() => uuid());
  return (
    <Container length={options.length}>
      {options.map((o, i) => (
        <span key={i}>
          <input
            id={id + i}
            type='radio'
            name={id + 'option'}
            checked={o.value === activeOptionValue}
            onChange={() => setOptionValue(o.value)}
          />
          <label title={tooltip} htmlFor={id + i}>
            {o.name}
          </label>
        </span>
      ))}
    </Container>
  );
}

ButtonSelector.propTypes = {
  options: propTypes.array.isRequired,
  activeOptionValue: propTypes.oneOfType([propTypes.string, propTypes.number])
    .isRequired,
  setOptionValue: propTypes.func.isRequired,
  tooltip: propTypes.string
};

const Container = styled.span`
  display: grid;
  grid-template-columns: repeat(${({ length }) => length}, 1fr);
  input {
    opacity: 0;
    position: fixed;
    width: 0;
    height: 0;
  }
  label {
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.onBackground};
    cursor: pointer;
    width: 100%;
    text-align: center;
    display: inline-block;
    padding: 10px;
    margin: 0;
    user-select: none;
    border-right: 1px solid ${({ theme }) => theme.color.onBackground};
  }
  span:last-of-type {
    label {
      border-right: 0;
    }
  }
  input:checked + label {
    color: ${({ theme }) => theme.color.onBackgroundLight};
    font-weight: bold;
  }
`;
