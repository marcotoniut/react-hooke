import { useRef } from "react";
import { areHookInputsEqual } from "./__internal__";

/**
 * `useDependent` returns a lazy value that will be re-computed on each change in the dependency array.
 * @note The api is virtually equivalent to [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo)'s,
 * the difference being that `useDependent` won't forget values, making it a good candidate for **semantic guarantees**
 * @param create The lazy value yielded on each render.
 * @returns A `value` re-computed every time a dependency changes.
 */
export function useDependent<S>(
  create: () => S,
  deps: ReadonlyArray<unknown>
): S {
  const ref = useRef<{
    readonly prevDeps: ReadonlyArray<unknown> | null;
    readonly x: S;
  }>();
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
