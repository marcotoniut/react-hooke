import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

/**
 * @param $ A rxjs `Behavior` that sets a new state with whatever comes through the stream pipeline.
 * @note A `Behavior` is a custom structure subset of the BehaviorSubject, which acts as an Observable, but
 * also holds a mutable `value` with the latest push.
 * @returns Latest state value.
 */
export const useBehaviorState = <S>(
  $: Pick<BehaviorSubject<S>, "value" | "subscribe">
) => {
  const [x, setX] = useState($.value);
  useEffect(() => {
    const s = $.subscribe(setX);
    return () => s.unsubscribe();
  }, [$]);
  return x;
};
