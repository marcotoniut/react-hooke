import { useEffect } from "react";
import type { Observable, PartialObserver } from "rxjs";

/**
 * @experimental
 * @param $ An rxjs `Observable` that sets a new state with whatever comes through the stream pipeline
 * @param observer Observer. @note Beware of using callbacks when appropriate
 * @param deps Extra dependency array
 */
export const useSubscriptionEffect = <S>(
  $: Observable<S>,
  observer: PartialObserver<S>,
  deps: readonly unknown[] = []
): void => {
  useEffect(() => {
    const s = $.subscribe(observer);
    return () => s.unsubscribe();
  }, [$, observer.next, observer.complete, observer.error, ...deps]);
};
