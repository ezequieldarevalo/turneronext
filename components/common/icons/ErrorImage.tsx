import React from 'react';
import styled from 'styled-components';

const ContainerErrorImage = styled.div`
  min-height: 25px;
  min-width: 25px;
`;

function ErrorImage(): JSX.Element {
  return (
    <ContainerErrorImage>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 26 26"
      >
        <g fill="none" fillRule="evenodd">
          <g fill="#B80000" fillRule="nonzero">
            <g>
              <g>
                <path
                  d="M12.5 0C19.403 0 25 5.597 25 12.5S19.403 25 12.5 25 0 19.403 0 12.5 5.597 0 12.5 0zm0 2.262c-5.655 0-10.238 4.589-10.238 10.244 0 5.655 4.583 10.238 10.238 10.238 5.655 0 10.238-4.589 10.238-10.244C22.732 6.85 18.149 2.268 12.5 2.262zm2.933 5.394l1.923 1.923-2.885 2.878 2.885 2.885-1.923 1.929-2.885-2.89-2.884 2.89-1.923-1.93 2.884-2.884L7.741 9.58l1.923-1.923 2.884 2.884 2.885-2.884z"
                  transform="translate(-80 -221) translate(59.394 195) translate(21 26.656)"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </ContainerErrorImage>
  );
}

export default ErrorImage;
