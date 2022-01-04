import { useState } from "react";

/**
 * TODO documentation
 */
export function useConst<S>(initialState: S | (() => S)): S {
  return useState(initialState)[0];
}
