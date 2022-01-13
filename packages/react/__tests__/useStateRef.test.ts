import { act, renderHook } from "@testing-library/react-hooks";
import { useStateRef } from "../src/useStateRef";

const o1 = { p: 0 };
const o2 = { p: 1 };

test("as long as set hasn't been called value is initialValue", () => {
  const { result } = renderHook(() => useStateRef(o1));

  expect(result.current[0].current).toBe(o1);
});

test("the setter changes the stored reference", () => {
  // TODO Test rerender count
  const { result } = renderHook(() => useStateRef(o1));

  expect(result.current[0].current).toBe(o1);

  act(() => {
    result.current[1](o2);
  });

  expect(result.current[0].current).not.toBe(o1);
  expect(result.current[0].current).toBe(o2);
});
