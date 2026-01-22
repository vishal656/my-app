// components/SectionTitle.tsx
import React from 'react';
import styled from 'styled-components';

// Props typing
type SectionTitleProps = {
  text: string;
};

// Wrapper with bottom border and padding
const TitleWrapper = styled.div`
  border-bottom: 1px solid #d1d5db; // Tailwind border-base-300 equivalent
  padding-bottom: 1.25rem;          // pb-5
`;

// Heading styles
const Title = styled.h2`
  font-size: 1.875rem;               // text-3xl
  font-weight: 500;                  // font-medium
  letter-spacing: 0.05em;            // tracking-wider
  text-transform: capitalize;
`;

const SectionTitle: React.FC<SectionTitleProps> = ({ text }) => {
  return (
    <TitleWrapper>
      <Title>{text}</Title>
    </TitleWrapper>
  );
};

export default SectionTitle;
