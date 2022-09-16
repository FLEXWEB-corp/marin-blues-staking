import styled from "styled-components";

interface OverlayProps {
  opacity: number;
  onClick: () => void;
}

const StyledOverlay = styled.div<OverlayProps>`
  position: fixed;
  left: 0;
  top: 0;
  min-width: 1440px;
  min-height: 1024px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, ${(props) => props.opacity});
  z-index: 10;
`;

export default function Overlay({ opacity, onClick }: OverlayProps) {
  return <StyledOverlay onClick={onClick} opacity={opacity} />;
}
