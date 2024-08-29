import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setQuery }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (input.trim() === "") {
      toast.error("The search field cannot be empty", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    setQuery(input);
  };

  return (
    <header className={styles.searchBar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
