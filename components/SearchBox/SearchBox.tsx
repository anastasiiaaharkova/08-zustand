import styles from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search notes"
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}