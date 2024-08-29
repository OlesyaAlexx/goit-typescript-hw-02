import Modal from "react-modal";
import React, { useEffect } from "react";
import styles from "./ImageModal.module.css";
import { Image } from "../../types/image";

Modal.setAppElement("#root");

interface ImageModalProps {
  onClose: () => void;
  image: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!image || !image.urls || !image.urls.regular) {
    return null; // Не рендерити нічого, якщо дані неповні
  }

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      /*  onKeyDown={handleKeyDown} */
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <img src={image.urls.regular} className={styles.modalImage} />
      </div>
    </Modal>
  );
};

export default ImageModal;
