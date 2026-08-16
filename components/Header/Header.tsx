import css from "./Header.module.css";
import Link from 'next/link';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href='/' aria-label='Home'>
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/notes/filter/all'>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

