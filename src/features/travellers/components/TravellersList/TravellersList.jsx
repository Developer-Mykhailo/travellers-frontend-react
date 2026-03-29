import { Link } from 'react-router-dom';
import response from '/temp/users.json';
import ui from '/src/components/UI/ui.module.css';

import css from './TravellersList.module.css';
import clsx from 'clsx';

const TravellersList = () => {
  const users = response.data.data;

  // JSX
  return (
    <>
      <ul className={css.userList}>
        {users.map((user) => (
          <li key={user._id} className={css.userItem}>
            <div className={css.avatarWrap}>
              <img src={user.avatar} alt="avatar" className={css.userAvatar} />
            </div>

            <h3 className={css.userName}>{user.name}</h3>
            <p className={css.userDescr}>{user.description}</p>
            <Link
              to={'/travellers/:travallerId'}
              className={clsx(ui.shared, ui.secondary, css.viewProfie)}
            >
              View Profile
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TravellersList;
