import Button from '../../../components/UI/Button/Button';
import css from './TravellersList.module.css';
import response from '../../../../temp/users.json';

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
            <Button className={css.viewProfileBtn} variant="secondary">
              View Profile
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TravellersList;
