import styles from "./ImageCard.module.css";

interface Urls {
  small: string;
}

interface ImageCardProps {
  urls: Urls;
  onImageClick: (urls: Urls) => void;
  description: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  urls,
  onImageClick,
  description,
}) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.imageCard}
        src={urls.small}
        alt={description || "Image"}
        onClick={() => onImageClick(urls)}
      />
    </div>
  );
};

export default ImageCard;
