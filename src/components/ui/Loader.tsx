import styled from "@emotion/styled";

const WrapperLoader = styled.div`
  width: 100%;
  height: 340px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Loader() {
  return (
    <WrapperLoader>
      <div className="custom-loader" />
    </WrapperLoader>
  );
}
