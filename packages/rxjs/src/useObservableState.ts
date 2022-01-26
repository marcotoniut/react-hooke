import { useEffect, useState } from "react";
import { Observable } from "rxjs";

function constVoid() {
  return;
}

/**
 * @param {Observable<S>} $ An rxjs `Observable` that sets a new state with whatever comes through the stream pipeline.
 * @param {() => S} initialState First state value.
 * @param {(e: unknown) => void} error Optional error handler. @note Beware of new references
 * @param {(e) => void} complete Optional complete handler. @note Beware of new references
 * @returns If source stream has emitted, it's latest emision. Otherwise, the initial state
 */
export const useObservableState = <S>(
  $: Observable<S>,
  initialState: () => S,
  error: (_: unknown) => void = constVoid,
  complete: () => void = constVoid
) => {
  const [x, setX] = useState(initialState);
  useEffect(() => {
    const s = $.subscribe({
      next: setX,
      error,
      complete,
    });
    return () => s.unsubscribe();
  }, [$, setX, complete, error]);
  return x;
};
