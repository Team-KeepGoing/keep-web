import React, { useState } from "react";
import "../styles/ViewBook.css";
import Modal from "./Modal";
import EditBook from "./EditBook";
import ViewBookInfo from "../components/viewBook/ViewBookInfo";
import BookImagePreview from "../components/editBook/ImagePreview";
import ViewBookButtons from "../components/viewBook/ViewBookButtons";

const ViewBook = ({ isOpen, onClose, book }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditBook = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseAllModals = () => {
    onClose();
    setIsEditModalOpen(false);
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="ViewBook">
            <div className="ViewForm">
              <div className="ViewMent">도서 정보</div>
              <ViewBookInfo book={book} />
              <BookImagePreview imageUrl={book.imageUrl} />
              <ViewBookButtons onEdit={handleEditBook} onClose={onClose} />
            </div>
          </div>
        </Modal>
      )}
      {isEditModalOpen && (
        <EditBook
          isOpen={isEditModalOpen}
          onClose={handleCloseAllModals}
          book={book}
        />
      )}
    </>
  );
};

export default ViewBook;
