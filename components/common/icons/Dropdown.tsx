import React from 'react';
import styled from 'styled-components';

const ContainerDropdown = styled.div`
  height: 18px;
  width: 18px;
`;

function Dropdown(): JSX.Element {
  return (
    <ContainerDropdown>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 19 19"
      >
        <defs>
          <filter id="8ihxlgs6qa">
            <feColorMatrix
              in="SourceGraphic"
              values="0 0 0 0 0.533333 0 0 0 0 0.533333 0 0 0 0 0.533333 0 0 0 1.000000 0"
            />
          </filter>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g filter="url(#8ihxlgs6qa)" transform="translate(-377 -500)">
            <g>
              <path
                fill="#000"
                fillRule="nonzero"
                d="M15.317 4.32L17.28 6.322 9.36 14.4 1.44 6.322 3.403 4.32 9.36 10.395z"
                transform="translate(377.5 500.5) matrix(0 1 1 0 0 0)"
              />
            </g>
          </g>
        </g>
      </svg>
    </ContainerDropdown>
  );
}

export default Dropdown;
