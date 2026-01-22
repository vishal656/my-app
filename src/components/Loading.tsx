// components/Loading.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Spin animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Fullscreen container
const LoadingWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Spinner
const Spinner = styled.span`
  display: inline-block;
  width: 3rem;    // size equivalent to loading-lg
  height: 3rem;
  border: 4px solid rgba(0, 0, 0, 0.1); // light ring
  border-top-color: #570df8;            // primary color
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loading: React.FC = () => {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  );
};

export default Loading;
