import css from './SidebarNotes.module.css'
import Link from "next/link";

const NotesSidebar = async () => {

    const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

    return <div>
      <ul className={css.menuList}>
  {/* список тегів */}
  <li className={css.menuItem}>
    <Link href={`/notes/filter/all`} className={css.menuLink}>
      All notes
    </Link>
  </li>
  {tags.map((tag) => (
    <li className={css.menuItem} key={tag}>
      <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
        {tag}
      </Link>
    </li>
  ))}
</ul>
  </div>;
};

export default NotesSidebar;