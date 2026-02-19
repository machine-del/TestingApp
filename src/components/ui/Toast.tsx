import styled from "@emotion/styled";
import { CloseIcon, DoneIcon } from "../../icons/icons";
import { useEffect } from "react";

const Notice = styled.div`
  position: fixed;
  right: 35px;
  bottom: 35px;
  background-color: #d7edff;
  color: #0e73f6;
  display: flex;
  gap: 8px;
  border-radius: 15px;
  justify-content: space-between;
  padding: 15px 10px 15px 16px;
  min-width: 320px;
`;

const Content = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.71;
`;

const Close = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.71;
  color: #0e73f6;
  cursor: pointer;
  position: absolute;
  top: 4.67px;
  right: 6.67px;
  transition: 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

type ToastProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  duration?: number;
};

export function Toast(props: ToastProps) {
  const { open, onClose, message, duration = 3000 } = props;

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <Notice>
      <Content>
        <DoneIcon />
        <SubTitle>{message}</SubTitle>
      </Content>
      <Close aria-label="Закрыть" onClick={() => onClose()}>
        <CloseIcon />
      </Close>
    </Notice>
  );
}
