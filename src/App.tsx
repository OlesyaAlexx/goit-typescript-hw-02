import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchImages from "./services/api";
import { Toaster } from "react-hot-toast";
import { Image } from "./types/image";
import "./App.css";

interface Response {
  results: Image[];
  total_pages: number;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null); // стан для вибраного зображення

  useEffect(() => {
    const getImages = async (): Promise<void> => {
      if (!query.trim()) return;

      setIsLoading(true);
      setIsError(false); // Скидаємо попередню помилку

      try {
        const response: Response = await fetchImages(query, page);
        console.log(response);
        setImages((prev) => [...prev, ...response.results]);
        setTotalPages(response.total_pages);
      } catch (error: unknown) {
        console.error("Error fetching images:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  //  useEffect для плавної прокрутки вниз після додавання нових зображень
  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [page]);

  // Функція яка при пошуку очищує старий результат пошуку на виводить новий
  const handleSetQuery = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  // функція встановлює вибране зображення, яке було передане як аргумент, у стан selectedImage
  const handleImageClick = (image: Image): void => {
    setSelectedImage(image);
  };

  // функція скидає стан selectedImage до null, закриваючи модальне вікно
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  //функція збільшує значення стану page на одиницю, і завантажується більше зображень
  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar setQuery={handleSetQuery} />
      {isError && <ErrorMessage message="An error occurred" />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      <Toaster />
      {totalPages > page && !isLoading && !isError && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
