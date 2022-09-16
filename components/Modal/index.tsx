import Overlay from "../Overlay/index";
import styled from "styled-components";

interface ModalProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  onClose: any;
}

const ModalContainer = styled.div<{
  width: string;
  height: string;
  padding: string;
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 15px;
  padding: ${(props) => props.padding};
  background: #fff;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

export default function Modal({
  children,
  width = "448px",
  height = "320px",
  onClose,
  padding = "32px",
}: ModalProps) {
  return (
    <>
      <ModalContainer width={width} height={height} padding={padding}>
        {children}
      </ModalContainer>
      <Overlay opacity={0.4} onClick={onClose} />
    </>
  );
}
