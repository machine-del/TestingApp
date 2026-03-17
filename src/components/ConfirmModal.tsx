import styled from "@emotion/styled";
import { Modal } from "./ui/Modal";

const ContainerButton = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const CancelButton = styled.button`
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
  padding: 8px;
  cursor: pointer;
  transition: 0.4s ease;
  flex: 1 1 calc(50% - 10px);

  &:hover {
    background: #ff0000ff;
    color: #fff;
  }
`;
const SaveButton = styled.button<{ variant: "primary" | "default" }>`
  display: flex;
  flex: 1 1 calc(50% - 10px);
  justify-content: center;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: ${({ variant }) =>
    variant === "primary" ? "#4094f7e5" : "#e5e5e5"};
  color: #fff;
  padding: 8px;
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ variant }) =>
      variant === "default" ? "#e5e5e5" : "#2d83f5"};
  }
`;

type ConfirmModalProps = {
  title: string;
  open: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmModal(props: ConfirmModalProps) {
  const {
    open,
    title,
    onConfirm,
    onClose,
    cancelLabel = "Отменить",
    confirmLabel = "Подтвердить",
  } = props;

  return (
    <>
      <Modal
        open={open}
        title={title}
        onClose={onClose}
        footer={
          <ContainerButton>
            <CancelButton onClick={onClose}>{cancelLabel}</CancelButton>
            <SaveButton onClick={onConfirm} variant="primary">
              {confirmLabel}
            </SaveButton>
          </ContainerButton>
        }
      />
    </>
  );
}
