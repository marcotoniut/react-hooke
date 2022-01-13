import { renderHook, act } from "@testing-library/react-hooks";
import { BehaviorSubject } from "rxjs";
import { useBehaviorState } from "../src/useBehaviorState";

test("non-emitted values yield the initial value of the BehaviorSubject", () => {
  const $ = new BehaviorSubject<number>(0);
  const { result } = renderHook(() => useBehaviorState($));

  expect(result.current).toBe(0);
});

test("yields the single emitted value", () => {
  const $ = new BehaviorSubject<number>(0);
  const { result } = renderHook(() => useBehaviorState($));

  expect(result.current).toBe(0);

  act(() => {
    $.next(1);
  });

  expect(result.current).toBe(1);
});

test("yields the last emitted value", () => {
  const $ = new BehaviorSubject<number>(0);
  const { result } = renderHook(() => useBehaviorState($));

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
