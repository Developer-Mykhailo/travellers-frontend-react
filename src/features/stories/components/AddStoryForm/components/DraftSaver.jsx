import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCreateDraft, updateEditDraft } from '../../../store/slice';
import { useLocation } from 'react-router-dom';

const DraftSaver = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { values } = useFormikContext();

  // eslint-disable-next-line
  const { photo, ...rest } = values;

  // !
  useEffect(() => {
    if (pathname !== '/stories/create') return;

    const timer = setTimeout(() => {
      dispatch(updateCreateDraft(rest));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, values, pathname, rest]);

  // !
  useEffect(() => {
    if (!pathname.includes('edit')) return;

    const timer = setTimeout(() => {
      dispatch(updateEditDraft(rest));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, values, pathname, rest]);

  return null;
};

export default DraftSaver;
