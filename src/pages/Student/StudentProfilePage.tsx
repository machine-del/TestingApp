import { useRef, useState } from "react";
import { LinkIcon } from "../../icons/icons";
import styled from "@emotion/styled";
import ChangeModalPassword from "../../components/ChangeModalPassword";
import { Toast } from "../../components/ui/Toast";

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  padding: 40px;
  margin-top: 61px;
`;

const LinkRow = styled.a`
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  color: #09090b;
  transition: all 0.3s ease;
  font-weight: 400;
  font-style: Regular;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: -2.2%;
  margin-bottom: 15px;
  width: max-content;

  &:hover {
    color: #0e73f6;
  }
`;

const AvatarBox = styled.div`
  display: flex;
  width: 346px;
  height: 346px;
`;

const Avatar = styled.img`
  border-radius: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullNameData = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 700;
  font-size: 30px;
  line-height: 100%;
  letter-spacing: -2.2%;
  margin-bottom: 17px;
`;

const Tag = styled.div`
  min-width: 75px;
  background-color: #e8f5ff;
  border-radius: 14px;
`;

const TagText = styled.p`
  color: #4094f7;
  padding: 7px 14px;
  font-weight: 700;
  font-size: 20.99px;
  line-height: 100%;
  letter-spacing: -2.2%;
`;

const GroupTags = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const Tags = styled.div`
  display: flex;
  gap: 2px;
`;

const TagItem = styled.span`
  display: flex;
  font-size: 18px;
  color: #09090b;
  font-weight: 400;
  line-height: 1;
  padding: 6px 13px;
  background-color: #f5f5f5;
  border-radius: 14px;
`;

const Actions = styled.span`
  display: flex;
  gap: 25px;
`;

const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid #dde2e4;
  color: #09090b;
  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.6%;
  padding: 10px 30px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

type GroupTag = {
  group: string;
  course: string;
  vector: string;
};

type ProfileData = {
  fullname: string;
  avatar?: string;
  socialLink?: { url: string; label: string };
  label: string;
  tags: GroupTag;
};

export function StudentProfilePage() {
  const data = {
    fullname: "Vladislav",
    avatar:
      "https://img.freepik.com/premium-vector/man-avatar-icon-flat-illustration-man-avatar-vector-icon-any-web-design_98396-3379.jpg",
    socialLink: { url: "https://vk.com/plk00", label: "vk.com/plk00" },
    label: "КОД",
    tags: [
      {
        group: "КД1",
        course: "3 курс",
        vector: "frontend",
      },
    ],
  };
  const [profile, setProfile] = useState<ProfileData>(data);
  const [isOpenPass, setOpenPass] = useState(false);
  const [isOpenToast, setIsOpenToast] = useState(false);
  const fileRef = useRef(null);

  function handleChangeImage() {
    console.log("1");
  }

  function handleChangePassword() {
    setOpenPass(true);
  }

  return (
    <Wrapper>
      <AvatarBox>
        <Avatar src={profile.avatar} alt="avatar" />
      </AvatarBox>
      <ProfileInfo>
        <FullNameData>
          <h2>{profile.fullname}</h2>
          <Tag>
            <TagText>{profile.label}</TagText>
          </Tag>
        </FullNameData>
        <LinkRow href={profile.socialLink?.url} target="_blank">
          <LinkIcon />
          {profile.socialLink?.label}
        </LinkRow>

        <GroupTags>
          {profile.tags.map((x, i) => (
            <Tags key={i}>
              <TagItem>{x.vector}</TagItem>
              <TagItem>{x.course}</TagItem>
              <TagItem>{x.group}</TagItem>
            </Tags>
          ))}
        </GroupTags>

        <Actions>
          <StyledButton onClick={() => handleChangeImage()}>
            Поменять фото
          </StyledButton>
          <StyledButton onClick={() => handleChangePassword()}>
            Изменить пароль
          </StyledButton>
        </Actions>
      </ProfileInfo>

      {/* <button onClick={() => fileRef.current?.click()}>download img</button>
      <input ref={fileRef} type="file" style={{ display: "none" }} /> */}
      <ChangeModalPassword
        open={isOpenPass}
        onClose={setOpenPass}
        onSuccess={() => setIsOpenToast(true)}
      />
      <Toast
        open={isOpenToast}
        onClose={() => setIsOpenToast(false)}
        message="Сохранения изменены"
      />
    </Wrapper>
  );
}
