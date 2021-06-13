import React from 'react';
import { string, bool, node } from 'prop-types';
import styled from 'styled-components';

import Loader from './icons/Loader';

const Shade = styled.div`
  align-items: center;
  ${(props: IShade) => !props.noBackground && 'background-color: #4a4a4a40;'}
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;

  position: absolute;
  right: 0;
  top: 0;

  z-index: 75;
`;

const StyledLoader = styled(Loader)`
  height: 5rem;
`;

interface IShade {
  noBackground: boolean;
}

function LoaderG({ className, children, loading, noBackground }:any) {
  return (
    <div className={className}>
      {children}
      {loading && (
        <Shade noBackground={noBackground}>
          <StyledLoader />
        </Shade>
      )}
    </div>
  );
}

LoaderG.propTypes = {
  className: string,
  loading: bool,
  children: node,
  noBackground: bool,
};

LoaderG.defaultProps = {
  className: undefined,
  loading: false,
  children: undefined,
  noBackground: false,
};

export default styled(LoaderG)`
  display: inherit;
  position: relative;
`;
