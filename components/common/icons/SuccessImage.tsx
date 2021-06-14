import React from 'react';
import styled from 'styled-components';

const ContainerSuccessImage = styled.div`
  min-height: 25px;
  min-width: 25px;
`;

function SuccessImage(): JSX.Element {
  return (
    <ContainerSuccessImage>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="25"
        viewBox="0 0 26 25"
      >
        <g fill="none" fillRule="evenodd">
          <g fill="#238D48" fillRule="nonzero">
            <g>
              <path
                d="M12.5 0C19.404 0 25 5.596 25 12.5S19.404 25 12.5 25 0 19.404 0 12.5 5.596 0 12.5 0zm0 2.262C6.846 2.262 2.262 6.846 2.262 12.5S6.846 22.738 12.5 22.738 22.738 18.154 22.738 12.5C22.73 6.849 18.15 2.27 12.5 2.262zm4.69 5.633l1.889 2.033-7.704 7.835-4.796-5.018 1.631-1.71 3.043 3.203 5.937-6.343z"
                transform="translate(-84 -219) translate(84.744 219)"
              />
            </g>
          </g>
        </g>
      </svg>
    </ContainerSuccessImage>
  );
}

export default SuccessImage;
