import styled from "@emotion/styled";
import { KodeIcon, ProfileIcon, StatsIcon, TestsIcon } from "./../icons/icons";
import { NavLink, Outlet } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
`;
const Main = styled.main`
  width: 100%;
`;

const Aside = styled.div`
  width: 240px;
  height: 100vh;
  background: #fff;
  display: flex;
  height: 100vh;
`;

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 16px;
`;
const Title = styled.div`
  color: #0e73f6;
  margin: 30px 0px 15px;
`;
const StyledButton = styled(NavLink)`
  border-radius: 10px;
  width: 100%;
  background: transparent;
  border: none;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 10px;
  cursor: pointer;
  color: #09090b;
  font-size: 1.2em;
  text-decoration: none;
  transition: 0.2s ease;

  &.active {
    background-color: #e8f5ff !important;
    color: #0e73f6 !important;
  }

  &:hover {
    background-color: #e8f5ff !important;
    color: #0e73f6 !important;
  }
`;

export function StudentLayout() {
  return (
    <>
      <Wrapper>
        <Aside>
          <Container>
            <Title>
              <KodeIcon />
            </Title>
            <StyledButton
              to="/student/tests"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <TestsIcon />
              Тестирование
            </StyledButton>
            <StyledButton
              to="/student/statistics"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <StatsIcon />
              Статистика
            </StyledButton>
            <StyledButton
              to="/student/profile"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <ProfileIcon />
              Профиль
            </StyledButton>
          </Container>
        </Aside>
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </>
  );
}
