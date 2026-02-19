import styled from "@emotion/styled";
import { useEffect } from "react";

const Overlay = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContainer = styled.div`
  background: #fff;
  box-shadow: 0px 0px 10px #00000069;
  height: 100%;
  width: 100%;
  height: auto;
  max-width: 450px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;
  position: absolute;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Close = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
  top: -25px;
`;

type TaskModalProps = {
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

export function Modal(props: TaskModalProps) {
  const { open, onClose, title, children, footer } = props;

  useEffect(() => {
    const keydwn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", keydwn);

    return () => window.removeEventListener("keydown", keydwn);
  }, [open, onClose]);

  if (!open) return;
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <Close onClick={onClose}>X</Close>
        </Header>
        <Body>{children}</Body>
        <Footer>{footer}</Footer>
      </ModalContainer>
    </Overlay>
  );
}
