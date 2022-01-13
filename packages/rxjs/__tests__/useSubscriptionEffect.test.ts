import { renderHook, act } from "@testing-library/react-hooks";
import { useState } from "react";
import { Subject } from "rxjs";
import { useSubscriptionEffect } from "../src/useSubscriptionEffect";

test("non-emitted values do not produce any effect", () => {
  const $ = new Subject<number>();

  const { result } = renderHook(() => {
    const [x, setX] = useState<number>(0);

    useSubscriptionEffect($, {
      next: setX,
    });

    return x;
  });

  expect(result.current).toBe(0);
});

test("emitted value triggers a `next` effect", () => {
  const $ = new Subject<number>();

  const { result } = renderHook(() => {
    const [x, setX] = useState<number>(0);

    useSubscriptionEffect($, {
      next: setX,
    });

    return x;
  });

  act(() => {
    $.next(1);
  });

  expect(result.current).toBe(1);
});

test("each emitted value triggers a `next` effect sequentially", () => {
  const $ = new Subject<number>();

  const { result } = renderHook(() => {
    const [x, setX] = useState<number>(0);

    useSubscriptionEffect($, {
      next: setX,
    });

    return x;
  });

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

test("emitted error triggers an `error` effect", () => {
  const $ = new Subject<number>();

  const { result } = renderHook(() => {
    const [x, setX] = useState<number>(0);

    useSubscriptionEffect($, {
      next: () => {},
      error: setX,
    });

    return x;
  });

  expect(result.current).toBe(0);

  act(() => {
    $.error(1);
  });

  expect(result.current).toBe(1);
});

test("emitted complete triggers a `complete` effect", () => {
  const $ = new Subject<number>();

  const { result } = renderHook(() => {
    const [x, setX] = useState<number>(0);

    useSubscriptionEffect($, {
      next: () => {},
      error: () => {},
      complete: () => setX(1),
    });

    return x;
  });

  expect(result.current).toBe(0);

  act(() => {
    $.complete();
  });

  expect(result.current).toBe(1);
});
