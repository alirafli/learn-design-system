import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { darken, rgba } from 'polished';
import { color, typography } from '../shared/styles';
import { easing } from '../shared/animation';

const Text = styled.span`
  display: inline-block;
  vertical-align: top;
`;

const Loading = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  opacity: 0;
`;

const APPEARANCES = {
  PRIMARY: 'primary',
  PRIMARY_OUTLINE: 'primaryOutline',
  SECONDARY: 'secondary',
  SECONDARY_OUTLINE: 'secondaryOutline',
  TERTIARY: 'tertiary',
  OUTLINE: 'outline',
};

const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
};

const StyledButton = styled.button`
  border: 10px solid red;
  font-size: 20px;
`;

const ButtonLink = styled.a``;

export const Button = forwardRef(function Button(
  {
    isDisabled,
    isLoading,
    loadingText,
    isLink,
    children,
    ButtonWrapper,
    ...props
  },
  ref,
) {
  if (ButtonWrapper) {
    return (
      <StyledButton
        as={ButtonWrapper}
        disabled={isDisabled}
        isLoading={isLoading}
        {...props}
        ref={ref}
      >
        <>
          <Text>{children}</Text>
          {isLoading && <Loading>{loadingText || 'Loading...'}</Loading>}
        </>
      </StyledButton>
    );
  }
  if (isLink) {
    return (
      <StyledButton as={ButtonLink} isLoading={isLoading} {...props} ref={ref}>
        <>
          <Text>{children}</Text>
          {isLoading && <Loading>{loadingText || 'Loading...'}</Loading>}
        </>
      </StyledButton>
    );
  }
  return (
    <StyledButton
      disabled={isDisabled}
      isLoading={isLoading}
      {...props}
      ref={ref}
    >
      <>
        <Text>{children}</Text>
        {isLoading && <Loading>{loadingText || 'Loading...'}</Loading>}
      </>
    </StyledButton>
  );
});

Button.propTypes = {
  /**
   * Checks if the button is in a loading state
   */
  isLoading: PropTypes.bool,
  /**
   * When a button is in the loading state you can supply custom text
   */
  loadingText: PropTypes.node,
  /**
   * Buttons that have hrefs should use <a> instead of <button>
   */
  isLink: PropTypes.bool,
  children: PropTypes.node.isRequired,
  appearance: PropTypes.oneOf(Object.values(APPEARANCES)),
  isDisabled: PropTypes.bool,
  /**
   Prevents users from clicking on a button multiple times (for things like payment forms)
  */
  isUnclickable: PropTypes.bool,
  /**
   * Buttons with icons by themselves have a circular shape
   */
  containsIcon: PropTypes.bool,
  /*
   * Size of the button
   */
  size: PropTypes.oneOf(Object.values(SIZES)),
  /**
   * A component that wraps the button
   * Can be used to add custom styles or props to the button
   */
  ButtonWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Button.defaultProps = {
  isLoading: false,
  loadingText: null,
  isLink: false,
  appearance: APPEARANCES.TERTIARY,
  isDisabled: false,
  isUnclickable: false,
  containsIcon: false,
  size: SIZES.MEDIUM,
  ButtonWrapper: undefined,
};
