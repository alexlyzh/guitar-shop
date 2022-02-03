import {useMemo, MutableRefObject, useState, useEffect, useCallback} from 'react';
import {Comment, RemoteData} from '../../types/types';

const observerOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0,
} as const;

export const useReviewFeed = (
  comments: RemoteData<Comment>,
  renderStep: number,
  observedRef?: MutableRefObject<HTMLButtonElement | null>,
) => {
  const [renderCount, setRenderCount] = useState(renderStep);
  const sortedComments = useMemo(() => [...comments.data]
    .sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt)), [comments]);
  const reviews = sortedComments.slice(0, renderCount);
  const isAllRendered = renderCount >= comments.data.length;

  const renderNextReviews = useCallback(() => {
    !isAllRendered && setRenderCount((prev) => prev + renderStep);
  }, [renderStep, isAllRendered]);


  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        renderNextReviews();
      }
    }, observerOptions);
    const target = observedRef?.current;

    if (target && !isAllRendered) {
      observer.observe(target);
    }

    if (target && isAllRendered) {
      observer.unobserve(target);
    }

    return () => {
      target && observer.unobserve(target);
    };
  }, [observedRef, isAllRendered, renderNextReviews]);


  return [reviews, renderNextReviews, isAllRendered] as [Comment[], () => void, boolean];
};
