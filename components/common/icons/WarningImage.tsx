import React from 'react';
import styled from 'styled-components';

const ContainerAlertImage = styled.div`
  min-height: 25px;
  min-width: 25px;
`;

function AlertImage(): JSX.Element {
  return (
    <ContainerAlertImage>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="25"
        viewBox="0 0 26 25"
      >
        <g fill="none" fillRule="evenodd">
          <g>
            <g>
              <g>
                <g fill="#d68227" fillRule="nonzero">
                  <path
                    d="M12.5 0C19.403 0 25 5.601 25 12.503S19.403 25 12.5 25 0 19.399 0 12.497 5.597 0 12.5 0zm0 2.262c-5.655 0-10.238 4.587-10.238 10.24 0 5.655 4.583 10.236 10.238 10.236 5.655 0 10.238-4.587 10.238-10.24-.006-5.649-4.589-10.23-10.238-10.236zm1.55 7.262v7.655H15v1.808h-.95V19h-2.903v-.013H10V17.18h1.147v-5.758h-1.08V9.53h1.08v-.005h2.903zM12.616 5c.94 0 1.514.697 1.533 1.605 0 .89-.593 1.61-1.572 1.61-.92 0-1.514-.72-1.513-1.61 0-.909.614-1.605 1.552-1.605z"
                    transform="translate(-85 -223) translate(61 197) translate(24.079 26)"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </ContainerAlertImage>
  );
}

export default AlertImage;
