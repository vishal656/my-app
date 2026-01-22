import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 640px) {
    column-gap: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.025em;

  @media (min-width: 640px) {
    font-size: 3.75rem;
  }
`;

const Stats = styled.div`
  background-color: var(--primary, #570df8);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
`;

const Stat = styled.div`
  padding: 1rem 1.5rem;
`;

const StatTitle = styled.div`
  color: var(--primary-content, #ffffff);
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: 0.2em;
`;

const Description = styled.p`
  margin-top: 1.5rem;
  font-size: 1.125rem;
  line-height: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const About: React.FC = () => {
  return (
    <>
      <Container>
        <Title>We love</Title>
        <Stats>
          <Stat>
            <StatTitle>comfy</StatTitle>
          </Stat>
        </Stats>
      </Container>

      <Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
        quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia optio
        aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo sed
        officiis ea tempore! Similique eos minima sit porro, ratione aspernatur!
      </Description>
    </>
  );
};

export default About;
