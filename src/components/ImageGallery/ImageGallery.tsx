import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Image } from "../../types/image";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  if (!images || images.length === 0) {
    return <p className={styles.text}>No images to display</p>;
  }
  return (
    <ul className={styles.gallery}>
      {images.map((image, index) => (
        <li key={`${image.id}-${index}`}>
          <ImageCard
            urls={image.urls}
            onImageClick={() => onImageClick(image)}
            description={image.description || "No description available"}
          />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
