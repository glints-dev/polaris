import { useRef, useEffect } from 'react';
import { Key } from '../../types.js';

const KONAMI_CODE = [Key.UpArrow, Key.UpArrow, Key.DownArrow, Key.DownArrow, Key.LeftArrow, Key.RightArrow, Key.LeftArrow, Key.RightArrow, Key.KeyB, Key.KeyA];
function KonamiCode({
  handler
}) {
  const keyEvent = 'keydown';
  const position = useRef(0);

  const handleKeyEvent = event => {
    const key = event.keyCode;
    const requiredKey = KONAMI_CODE[position.current];

    if (key === requiredKey) {
      if (position.current === KONAMI_CODE.length - 1) {
        handler(event);
        position.current = 0;
      } else {
        position.current++;
      }
    } else {
      position.current = 0;
    }
  };

  useEffect(() => {
    document.addEventListener(keyEvent, handleKeyEvent);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent);
    };
  });
  return null;
}

export { KONAMI_CODE, KonamiCode };
