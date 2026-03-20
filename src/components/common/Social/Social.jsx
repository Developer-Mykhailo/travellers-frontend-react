import { Link } from 'react-router-dom';
import css from './Social.module.css';

const Social = () => {
  return (
    <>
      <ul className={css.list}>
        <li>
          <Link to="facebook">facebook</Link>
        </li>
        <li>
          <Link to="facebook">facebook</Link>
        </li>
        <li>
          <Link to="facebook">facebook</Link>
        </li>
        <li>
          <Link to="facebook">facebook</Link>
        </li>
      </ul>
    </>
  );
};

export default Social;
