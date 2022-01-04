import { useRef } from "react";
import { areHookInputsEqual } from "./__internal__";

/**
 * `useDependent` returns a lazy value that will be re-computed on each change in the dependency array.
 * @param create The lazy value yielded on each render.
 * @returns A `value` re-computed every time a dependency changes.
 * @notes At one point and, for the love of Zeus, somebody unit test this!
 */
export function useDependent<S>(
  create: () => S,
  deps: ReadonlyArray<unknown>
): S {
  const ref = useRef<{ prevDeps: ReadonlyArray<unknown> | null; x: S }>();
  if (
    ref.current === undefined ||
    areHookInputsEqual(deps, ref.current.prevDeps) === false
  ) {
    ref.current = {
      prevDeps: deps,
      x: create(),
    };
  }
  return ref.current.x;
}
