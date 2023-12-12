import React from 'react';
import { ButtonStyle } from './ButtonStyle';

const Button = ({ onClick }) => {
  return <ButtonStyle onClick={onClick}>Load more</ButtonStyle>;
};

export default Button;
