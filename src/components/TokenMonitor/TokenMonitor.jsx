import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessTokenValidUntil } from '../../features/auth/store/selectors';
import { refreshToken } from '../../features/auth/store/operation';

const TokenMonitor = () => {
  const dispatch = useDispatch();
  const accessTokenValidUntil = useSelector(selectAccessTokenValidUntil);

  useEffect(() => {
    if (!accessTokenValidUntil) return;

    const expiredAtMs = Date.parse(accessTokenValidUntil);

    const timeoutMs = expiredAtMs - Date.now() - 14 * 60 * 1000;

    if (timeoutMs <= 0) {
      dispatch(refreshToken());
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(refreshToken());
    }, timeoutMs);

    return () => clearTimeout(timeoutId);
  }, [dispatch, accessTokenValidUntil]);

  //
  return null;
};

export default TokenMonitor;
