import Overlay from '../Overlay/index';
import styled, { css } from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  mw?: string;
  onClose: any;
}

const ModalContainer = styled.div<{
  width: string;
  height: string;
  padding: string;
  mw?: string;
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  ${props =>
    props.mw
      ? css`
          max-width: ${props.mw};
        `
      : ''}
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 15px;
  padding: ${props => props.padding};
  background: #fff;
  transform: translate(-50%, -50%);
  z-index: 100;

  @media (max-width: 480px) {
    width: 343px;
  }
`;

export default function Modal({
  children,
  width = '448px',
  mw,
  height = '320px',
  onClose,
  padding = '32px',
}: ModalProps) {
  return (
    <>
      <ModalContainer width={width} height={height} padding={padding} mw={mw}>
        {children}
      </ModalContainer>
      <Overlay opacity={0.4} onClick={onClose} />
    </>
  );
}
