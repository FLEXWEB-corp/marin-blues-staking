import React from 'react';
import styled, { css } from 'styled-components';

type themeType = 'black' | 'white';

interface ButtonProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  buttonTheme?: themeType;
  disabled?: boolean;
  onClick?: () => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface ButtonContainerProps {
  width: string;
  height: string;
  padding: string;
  margin: string;
  buttonTheme: string;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  font-size: 14px;
  font-weight: 600;
  border-radius: 32px;
  line-height: 1.71;
  letter-spacing: 0.28px;
  cursor: pointer;
  border: none;
  background: none;
  transition: 0.3s;

  ${props =>
    props.buttonTheme === 'black' &&
    !props.disabled &&
    css`
      background-color: #141416;
      color: #fff;
      &:hover {
        background-color: #5e4fff;
        color: #fff;
      }
    `};

  ${props =>
    props.buttonTheme === 'white' &&
    !props.disabled &&
    css`
      border: solid 2px #e6e8ec;
      color: #141416;
      &:hover {
        background-color: #141416;
        color: #fff;
        border: none;
      }
    `};

  ${props =>
    props.disabled &&
    css`
      background-color: #e6e8ec;
      cursor: not-allowed;
    `}
`;

const Button = ({
  children,
  width = '130px',
  height = '48px',
  padding = '0px',
  margin = '0px',
  buttonTheme = 'black',
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonContainer
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      buttonTheme={buttonTheme}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
