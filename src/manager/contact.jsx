import React from "react";
import "./style.css";
import { atom, useAtom } from 'jotai';

// 원자 생성
const studentInfoAtom = atom([
  { id: "text-3", name: "김주환", studentId: "2208", phone: "010-7777-8888" }
]);

const adminInfoAtom = atom({ id: "text-6", name: "관리자 박소진 님" });

const sortingOptionsAtom = atom([
  { id: "polygon-1", text: "학번 순", src: "polygon-1.svg" },
  { id: "image", text: "이름 순", src: "image.svg" },
  { id: "prime-replay", text: "초기화", src: "prime-replay.svg" }
]);



const TextWrapper = ({ className = "", text }) => (
  <div className={`text-wrapper ${className}`}>{text}</div>
);
const OverlapGroup = ({ children }) => (
  <div className="overlap-group">{children}</div>
);

const ImageWrapper = ({ src, className, alt }) => (
  <img src={src} className={className} alt={alt} />
);

export const DivWrapper = () => {
  // 원자 사용
  const [studentInfo] = useAtom(studentInfoAtom);
  const [adminInfo] = useAtom(adminInfoAtom);
  const [sortingOptions] = useAtom(sortingOptionsAtom);

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
    <TextWrapper className="text-5" text="학생 정보 수정" />
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
      <div className="label">
        <div className="text-wrapper">학생 정보 수정</div>
      </div>
      <div className="rectangle" />
    </div>
  );
};
