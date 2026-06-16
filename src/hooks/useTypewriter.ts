import { useState, useEffect, useCallback } from 'react';

export function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex] || '';

    if (isDeleting) {
      setDisplayText(currentWord.substring(0, displayText.length - 1));
    } else {
      setDisplayText(currentWord.substring(0, displayText.length + 1));
    }
  }, [displayText, isDeleting, wordIndex, words]);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[wordIndex] || '';
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentWord) {
      // Finished typing — pause, then start deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === '') {
      // Finished deleting — move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      // Still typing or deleting
      timeout = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, tick, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}
