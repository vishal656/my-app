import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
`;

const Error: React.FC = () => {
  const error = useRouteError();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred';

  if (isRouteErrorResponse(error)) {
    title = `${error.status}`;
    message = error.statusText;
  }

  return (
    <Wrapper>
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link to="/">Back to home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
