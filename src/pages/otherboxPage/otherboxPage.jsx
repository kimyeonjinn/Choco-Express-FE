import * as S from "./styled";
import HeartBackG from "../../components/common/Heartbackground/heartBackG";
import { useNavigate, useLocation } from "react-router-dom";
import { BOXES } from "../../constants/Boxes/data";
import { useOtherBox } from "../../hooks/useOtherBox";
import Cookies from "js-cookie";

export const OtherboxPage = () => {
  const { otherData } = useOtherBox();
  console.log("상대방 박스 조회 data:", otherData);
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("access_token");
  const boxId = otherData.boxId;

  const MoveOnLetterP = () => {
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트하고, 돌아올 페이지 정보를 함께 전달
      navigate("", { state: { from: location.pathname } });
    } else {
      // 토큰이 있으면 초콜릿 보내기 페이지로 이동
      navigate(`/box/${boxId}/choco`, { state: { otherData } });
    }
  };

  const MoveOnMainP = () => {
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트하고, 돌아올 페이지 정보를 함께 전달
      navigate("", { state: { from: location.pathname } });
    } else {
      // 토큰이 있으면 나만의 박스 조회 페이지로 이동 - 주소 변경해야함
      navigate(`/box/${boxId}/choco`);
    }
  };
  if (!otherData) {
    return <div>Loading...</div>;
  }
  const selectedBox = BOXES.find((box) => box.id === otherData.boxType);
  return (
    <S.Container>
      <HeartBackG />
      <S.Wrapper>
        <div className="Box">
          <div>[{otherData.boxName}] 의 초콜릿 상자</div>
          <S.BoxContainer>
            <img src={selectedBox.src} className="boxImg" />
          </S.BoxContainer>
        </div>
        <S.ButtonContainer>
          <S.Button
            onClick={() => {
              MoveOnLetterP();
            }}
          >
            초콜릿 보내기
          </S.Button>
          <S.Button
            onClick={() => {
              MoveOnMainP();
            }}
          >
            내 초콜릿 상자 보러가기
          </S.Button>
        </S.ButtonContainer>
      </S.Wrapper>
    </S.Container>
  );
};
