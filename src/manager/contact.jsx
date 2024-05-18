import React from "react";
import "./style.css";

const TextWrapper = ({ className, text }) => (
  <div className={className}>{text}</div>
);

const OverlapGroup = ({ children }) => (
  <div className="overlap-group">{children}</div>
);

const ImageWrapper = ({ src, className, alt }) => (
  <img src={src} className={className} alt={alt} />
);

export const DivWrapper = () => {
  const studentInfo = [
    { id: "text-3", name: "김주환", studentId: "2208", phone: "010-7777-8888" }
  ];

  const adminInfo = { id: "text-6", name: "관리자 박소진 님" };

  const sortingOptions = [
    { id: "polygon-1", text: "학번 순", src: "polygon-1.svg" },
    { id: "image", text: "이름 순", src: "image.svg" },
    { id: "prime-replay", text: "초기화", src: "prime-replay.svg" }
  ];

  return (
    <div className="div-wrapper">
      <TextWrapper className="text" text="비상 연락처" />
      <TextWrapper className="text-2" text="손쉽게 학생 정보를 확인하세요." />
      {studentInfo.map((info) => (
        <OverlapGroup key={info.id}>
          <TextWrapper className="text-3" text={info.name} />
          <TextWrapper className="text-4" text={info.studentId} />
          <TextWrapper className="element" text={info.phone} />
          <div className="ellipse" />
          <OverlapGroup>
            <TextWrapper className="text-5" text="학생 정보 수정" />
          </OverlapGroup>
        </OverlapGroup>
      ))}
      <OverlapGroup>
        <TextWrapper className="text-6" text={adminInfo.name} />
      </OverlapGroup>
      <TextWrapper className="text-7" text="로그아웃" />
      <div className="group-2">
        {sortingOptions.map((option) => (
          <OverlapGroup key={option.id}>
            <ImageWrapper src={option.src} className="polygon" alt={option.text} />
            <TextWrapper className="text-8" text={option.text} />
          </OverlapGroup>
        ))}
      </div>
        <DivWrapper>

        </DivWrapper>
      {/* 추가적인 요소들에 대해서도 유사한 처리를 할수있음 */}
      {/* ex) 학생 목록, 연락처 정보 등을 배열 데이터로 만들고 map 함수를 이용해 렌더링 할 수 있음 */}
    </div>
  );
};
