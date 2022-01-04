import { Dispatch, RefObject, useRef, useState } from "react";

/**
 * A mix of hooks `useState` and `useRef`, it returns a returns a 3-tuple made of a
 * mutable ref (initialized by the `def` parameter), a function to update the ref as well as
 * trigger the re-render, and the stateful value that tags along with it.
 * @returns An object that will persist for the full lifetime of the component.
 */
export function useStateRef<T>(
  def: T
): [Readonly<RefObject<T>>, Dispatch<T>, T] {
  const ref = useRef(def);
  const [x, setX] = useState(def);
  function setRef(x: T) {
    ref.current = x;
    setX(x);
  }
  return [ref, setRef, x];
}
