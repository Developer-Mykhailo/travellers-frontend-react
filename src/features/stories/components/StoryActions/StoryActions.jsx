import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Button from '../../../../components/UI/Button/Button';
import { useToggleSaveStory } from '../../../../hooks/useToggleSaveStory';
import { selectIsAuth } from '../../../auth/store/selectors';
import { selectUser } from '../../../user/store/selectors';

import ui from '../../../../components/UI/ui.module.css';
import css from './StoryActions.module.css';

const StoryActions = ({ storyId, owner }) => {
  const user = useSelector(selectUser);

  const isAuth = useSelector(selectIsAuth);
  const toggleSaveStory = useToggleSaveStory();

  const currentStoryId = user?.savedStories?.find((elem) => elem === storyId);

  const isSaved = Boolean(currentStoryId);

  const isMyStory = owner?.id === user?._id;

  const titleMessage = isSaved ? 'Story is saved' : 'Keep the story';
  const descrMessage =
    'It will be available in your profile in the saved section';

  // JSX
  return (
    <>
      <div className={css.storyActionsBox}>
        <p className={css.storyActionsTitle}>{titleMessage}</p>
        <p className={css.storyActionsDescr}>{descrMessage}</p>

        {isMyStory && (
          <a
            className={clsx(ui.shared, ui.secondary, css.link)}
            href={`/stories/${storyId}/edit`}
          >
            Edit
          </a>
        )}

        <Button
          className={css.saveStoryBtn}
          onClick={() =>
            isAuth ? toggleSaveStory(storyId) : alert('You are not logged in')
          }
        >
          {!isSaved ? 'Save' : ' Remove'}
        </Button>
      </div>
    </>
  );
};

export default StoryActions;
