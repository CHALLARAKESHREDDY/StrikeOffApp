import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateWrapper = ({ children }) => {
  const navigate = useNavigate();
  return children(navigate);
};

export default NavigateWrapper;