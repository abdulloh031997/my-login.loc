import React from 'react';
import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

const Override = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const PreLoading = ({ preLoading }) => (
  <Override>
    <MoonLoader loading={preLoading} size={70} />
  </Override>
);
