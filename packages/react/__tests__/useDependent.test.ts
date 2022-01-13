import { renderHook, act } from "@testing-library/react-hooks";
import { useState } from "react";
import { useDependent } from "../src/useDependent";

test("doesn't recompute when there are no dependencies", () => {
  const set = jest.fn(() => 0);

  const { result } = renderHook(() => useDependent(set, []));

  expect(set).toHaveBeenCalledTimes(1);
  expect(result.current).toBe(0);
});

test("recomputes only when a dependency changes", () => {
  const identity = jest.fn((x) => x);

  const { result } = renderHook(() => {
    const [dep, setDep] = useState(0);
    const x = useDependent(() => identity(dep), [dep]);
    return { x, setDep };
  });

  expect(result.current.x).toBe(0);

  act(() => {
    for (let i = 0; i < 10; i++) {
      result.current.setDep(0);
    }
    for (let i = 0; i < 10; i++) {
      result.current.setDep(1);
    }
  });

  expect(identity).toHaveBeenCalledTimes(2);
  expect(result.current.x).toBe(1);
});

test("recomputes when one of the many dependencies changes", () => {
  const identity = jest.fn((x) => x);

  const { result } = renderHook(() => {
    const [dep1, setDep1] = useState(0);
    const [dep2, setDep2] = useState("a");
    const x = useDependent(() => identity(`${dep1} ${dep2}`), [dep1, dep2]);
    return { x, setDep1, setDep2 };
  });

  expect(result.current.x).toBe("0 a");

  act(() => {
    result.current.setDep1(0);
    result.current.setDep2("a");
  });
  expect(identity).toHaveBeenCalledTimes(1);
  expect(result.current.x).toBe("0 a");

  act(() => {
    result.current.setDep1(1);
  });
  expect(identity).toHaveBeenCalledTimes(2);
  expect(result.current.x).toBe("1 a");

  act(() => {
    result.current.setDep2("b");
  });
  expect(identity).toHaveBeenCalledTimes(3);
  expect(result.current.x).toBe("1 b");

  act(() => {
    result.current.setDep1(2);
    result.current.setDep2("c");
  });
  expect(identity).toHaveBeenCalledTimes(4);
  expect(result.current.x).toBe("2 c");
});
