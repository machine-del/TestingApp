import styled from "@emotion/styled";

const StyledButton = styled.button`
  background: #4094f7;
  border: none;
  border-radius: 6px;
  padding: 18px;
  min-width: 286px;
  color: white;
  margin: 50px 20px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  outline: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;

  &:hover {
    background: #3f7ec7;
  }
`;

type ButtonStyleProps = {
  title: string;
  handleSubmit: () => void;
};

export default function ButtonStyle(props: ButtonStyleProps) {
  const { title, handleSubmit } = props;

  return <StyledButton onClick={handleSubmit}>{title}</StyledButton>;
}
