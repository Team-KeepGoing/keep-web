import React, { useState, useEffect } from "react";
import "../styles/ViewBook.css";
import Modal from "./Modal";
import EditBook from "./EditBook";
import ViewBookInfo from "../components/viewBook/ViewBookInfo";
import BookImagePreview from "../components/editBook/ImagePreview";
import ViewBookButtons from "../components/viewBook/ViewBookButtons";

const ViewBook = ({ isOpen, onClose, book, refreshBooks }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookImage, setBookImage] = useState(book.imageUrl);

  useEffect(() => {
    setBookImage(book.imageUrl);
  }, [book.imageUrl]);

  const openEditModal = () => setIsEditModalOpen(true);

  const closeAllModals = () => {
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
              <BookImagePreview bookImage={bookImage} />
              <ViewBookButtons onEdit={openEditModal} onClose={onClose} />
            </div>
          </div>
        </Modal>
      )}
      {isEditModalOpen && (
        <EditBook
          isOpen={isEditModalOpen}
          onClose={closeAllModals}
          book={book}
          refreshBooks={refreshBooks}
        />
      )}
    </>
  );
};

export default ViewBook;
