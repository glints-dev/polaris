import { memo, useEffect } from 'react';
import { useFrame } from '../../utilities/frame/hooks.js';

const Loading = /*#__PURE__*/memo(function Loading() {
  const {
    startLoading,
    stopLoading
  } = useFrame();
  useEffect(() => {
    startLoading();
    return () => {
      stopLoading();
    };
  }, [startLoading, stopLoading]);
  return null;
});

export { Loading };
