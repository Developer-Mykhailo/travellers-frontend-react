import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../../components/UI/Button/Button';
import ConfirmModal from '../../../../components/UI/ConfirmModal/ConfirmModal';
import { useModalState } from '../../../../hooks/useModalState';
import { useToggleSaveStory } from '../../../../hooks/useToggleSaveStory';
import { selectIsAuth } from '../../../auth/store/selectors';
import {
  selectUser,
  selectUserPublicStoriesItems,
} from '../../../user/store/selectors';

import ui from '../../../../components/UI/ui.module.css';
import css from './StoryActions.module.css';

/**
 * Story action controls (save, edit) shown on a story page.
 *
 * @param {{ storyId?: string, owner?: { id?: string } }} props
 * @returns {JSX.Element}
 */
const StoryActions = ({ storyId, owner }) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const isAuth = useSelector(selectIsAuth);
  const toggleSaveStory = useToggleSaveStory();

  const userPublicStoriesItems = useSelector(selectUserPublicStoriesItems);

  const currentStoryId = user?.savedStories?.includes(storyId);

  const isSaved = Boolean(currentStoryId);

  const isOwnerMatch = Boolean(owner?.id && user?._id && owner.id === user._id);
  const isInUserPublicIds = Boolean(user?.publicStories?.includes(storyId));
  const isInUserPublicItems = Boolean(
    userPublicStoriesItems?.some((item) => item._id === storyId)
  );
  const isMyStory = isOwnerMatch || isInUserPublicIds || isInUserPublicItems;

  const { isOpen: isModalOpen, openModal, closeModal } = useModalState();

  const titleMessage = isSaved ? 'Story is saved' : 'Save this story';
  const descrMessage = !isSaved
    ? 'It will be available in your profile in the saved section'
    : 'This story is in your saved list';

  const handleConfirm = () => navigate('/auth/login');
  const handleCancel = () => navigate('/auth/register');

  // JSX
  return (
    <>
      <div className={css.storyActionsBox}>
        <p className={css.storyActionsTitle}>{titleMessage}</p>
        <p className={css.storyActionsDescr}>{descrMessage}</p>

        {isMyStory && (
          <Link
            to={`/stories/${storyId}/edit`}
            className={clsx(ui.shared, ui.secondary, css.link)}
          >
            Edit
          </Link>
        )}

        <Button
          className={css.saveStoryBtn}
          onClick={() =>
            isAuth ? (storyId ? toggleSaveStory(storyId) : null) : openModal()
          }
        >
          {!isSaved ? 'Save' : 'Remove'}
        </Button>
      </div>

      {isModalOpen && (
        <ConfirmModal
          onClose={closeModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default StoryActions;
