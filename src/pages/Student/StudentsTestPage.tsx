import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TestCard } from "../../components/tests/TestCard";
import type { Attempt, TestItem } from "../../components/types/testing";
import { SearchIcon } from "../../icons/icons";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";

interface StudentHeaderProps {
  title?: string;
}

const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
  color: #475569;
  padding: 6px;
  border-radius: 8px;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  &:hover {
    background: #f5f7fb;
  }

  &:focus {
    outline: 2px solid #0e73f6;
    outline-offset: 2px;
  }
`;

const SearchInput = styled.input`
  height: 36px;
  min-width: 220px;
  padding: 0 10px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    border-color: #0e73f6;
    box-shadow: 0 0 0 3px rgba(14, 115, 246, 0.15);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  min-height: 64px;
  width: 100%;
  box-sizing: border-box;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  font-size: 14px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.2;
`;

const UserNick = styled.div`
  color: #09090b80;
  background-color: #f5f5f5;
  padding: 3px;
  border-radius: 3px;
  font-weight: 400;
  width: max-content;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #0e73f6;
  font-weight: 700;
  font-size: 36px;
  line-height: 100%;
  letter-spacing: -2.2%;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export default function StudentsTestPage({ title = "" }: StudentHeaderProps) {
  const [tests, setTests] = useState<TestItem[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const isTestsHeader = (title || "Тестирования").trim();

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [searchOpen]);

  const handleSearchClick = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const handleSearchBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      requestAnimationFrame(() => {
        if (document.activeElement !== e.currentTarget) {
          setSearchOpen(false);
        }
      });
    },
    [],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      // console.log("Search query:", e.target.value);
    },
    [],
  );

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setSearchOpen(false);
      }
      if (e.key === "Enter") {
        console.log("Perform search with:", searchQuery);
      }
    },
    [searchQuery],
  );

  useEffect(() => {
    const tests = "/public/data/tests.json";
    const attempts = "/public/data/attempts.json";

    Promise.all([fetch(tests), fetch(attempts)])
      .then(async ([res1, res2]) => {
        setLoading(true);
        if (!res1.ok) throw new Error(res1.status.toString());
        if (!res2.ok) throw new Error(res2.status.toString());
        const r = await res1.json();
        const a = await res2.json();
        setTests(r);
        setAttempts(a);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const lastAttemptByTest = useMemo(() => {
    const unique = new Map();
    const mine = attempts.filter((a) => a.userId === 1);
    for (const element of mine) unique.set(element.userId, element);
    return unique;
  }, [attempts]);

  if (isLoading) return <div className="custom-loader" />;
  if (error) return <h3>{error}</h3>;
  
  return (
    <section>
      <HeaderContainer>
        <HeaderLeft>
          <HeaderTitle>{isTestsHeader}</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <SearchContainer>
            {searchOpen ? (
              <SearchInput
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onBlur={handleSearchBlur}
                onKeyDown={handleSearchKeyDown}
                placeholder="Поиск тестов…"
                aria-label="Строка поиска по тестам"
                autoFocus
              />
            ) : (
              <SearchButton
                onClick={handleSearchClick}
                aria-label="Поиск"
                title="Открыть поиск"
              >
                <SearchIcon />
              </SearchButton>
            )}
          </SearchContainer>

          {!location.pathname.includes("/profile") && (
            <UserContainer>
              <Avatar
                src="https://img.freepik.com/premium-vector/man-avatar-icon-flat-illustration-man-avatar-vector-icon-any-web-design_98396-3379.jpg"
                alt="Аватар"
              />
              <UserInfo>
                <UserName>Владислав Керимов</UserName>
                <UserNick>@machinedel</UserNick>
              </UserInfo>
            </UserContainer>
          )}
        </HeaderRight>
      </HeaderContainer>

      <Cards>
        {tests.map((test) => (
          <TestCard
            key={test.id}
            test={test}
            lastAttempt={lastAttemptByTest.get(test.id)}
          />
        ))}
      </Cards>
    </section>
  );
}
