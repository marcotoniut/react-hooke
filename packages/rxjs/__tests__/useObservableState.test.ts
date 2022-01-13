import { renderHook, act } from "@testing-library/react-hooks";
import { Subject } from "rxjs";
import { useObservableState } from "../src/useObservableState";

test("non-emitted values yield the initial state", () => {
  const $ = new Subject<number>();
  const { result } = renderHook(() => useObservableState($, () => 0));

  expect(result.current).toBe(0);
});

test("yields the single emitted value", () => {
  const $ = new Subject<number>();
  const { result } = renderHook(() => useObservableState($, () => 0));

  act(() => {
    $.next(1);
  });

  expect(result.current).toBe(1);
});

test("yields the last emitted value", () => {
  const $ = new Subject<number>();
  const { result } = renderHook(() => useObservableState($, () => 0));

  expect(result.current).toBe(0);

  act(() => {
    $.next(1);
    $.next(2);
  });

  expect(result.current).toBe(2);

  act(() => {
    $.next(3);
  });

  expect(result.current).toBe(3);
});
