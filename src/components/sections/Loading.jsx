import React from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const Override = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Loading = ({ loading }) => (
  <Override>
    <ClipLoader loading={loading} size={20} color={'#fff'} />
  </Override>
);
