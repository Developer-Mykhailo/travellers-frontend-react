import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { toggleSaveStory } from '../features/user/store/operation';

export const useToggleSaveStory = () => {
  const dispatch = useDispatch();

  const handleToggleSaveStory = async (id) => {
    try {
      const result = await dispatch(toggleSaveStory(id)).unwrap();

      result.data.saved
        ? toast.success('The story was successfully added')
        : toast.error('The story was successfully removed');
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return handleToggleSaveStory;
};
