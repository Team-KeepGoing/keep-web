import React from "react";
import { useDropzone } from "react-dropzone";
import Uproad from "../../assets/img/Upload.svg";
import config from "../../config/config.json";

const EmergencyModal = ({
  modalInfo,
  setModalInfo,
  setShowModal,
  handleEmergency,
  isUpload,
  setIsUpload,
  onDrop,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/jpg",
    multiple: false,
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${config.serverurl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("이미지 업로드 실패");
      }

      const data = await response.json();
      setModalInfo((prev) => ({
        ...prev,
        imgUrl: data.imgUrl,
      }));
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다:", error);
      alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(file.type)) {
        await uploadImage(file);
      } else {
        alert(
          "유효하지 않은 파일 형식입니다. PNG, JPG, JPEG 파일만 업로드 가능합니다."
        );
      }
    }
  };

  return (
    <div
      className="EmergencyModalBg"
      onClick={() => {
        setShowModal(false);
      }}
    >
      <div
        className="EmergencyModal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="EmergencyModalTitle">학생 정보</p>
        <div className="EmergencyModalContent">
          <div className="EmergencyModalUpload">
            <div className="UproadContainer" {...getRootProps()}>
              <input {...getInputProps()} style={{ display: "none" }} />
              {isDragActive ? (
                <p>이미지를 드래그 해 주세요</p>
              ) : (
                !modalInfo.imgUrl && (
                  <span
                    className="UploadMent"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    드래그 앤 드랍 또는 여기를 눌러 업로드
                  </span>
                )
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {modalInfo.imgUrl ? (
                <img
                  src={modalInfo.imgUrl}
                  alt="Uploaded"
                  className="UploadedImg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <img src={Uproad} alt="UproadImage" className="Uproad" />
              )}
            </div>
          </div>
          <div className="EmergencyModalContentRight">
            <div>
              <input
                type="text"
                className="EmergencyModalContentTitle"
                value={modalInfo.studentName}
                onChange={(e) =>
                  setModalInfo({
                    ...modalInfo,
                    studentName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                type="text"
                className="EmergencyModalContentText"
                value={modalInfo.studentId}
                onChange={(e) =>
                  setModalInfo({
                    ...modalInfo,
                    studentId: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                type="text"
                className="EmergencyModalContentText1"
                value={modalInfo.phoneNum}
                onChange={(e) =>
                  setModalInfo({
                    ...modalInfo,
                    phoneNum: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                type="text"
                className="EmergencyModalContentText2"
                value={modalInfo.address}
                onChange={(e) =>
                  setModalInfo({
                    ...modalInfo,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                type="text"
                className="EmergencyModalContentText3"
                value={modalInfo.mail}
                onChange={(e) =>
                  setModalInfo({
                    ...modalInfo,
                    mail: e.target.value,
                  })
                }
              />
            </div>
            {!isUpload ? (
              <button
                className="EmergencyModalContentButton"
                onClick={() => setIsUpload(true)}
              >
                학생 정보 수정
              </button>
            ) : (
              <div className="flex">
                <button
                  type="submit"
                  className="EmergencyAdd"
                  onClick={() => handleEmergency(modalInfo.id)}
                >
                  등록
                </button>
                <button
                  type="button"
                  className="EmergencyCancel"
                  onClick={() => {
                    setIsUpload(false);
                    setShowModal(false);
                  }}
                >
                  취소
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;
