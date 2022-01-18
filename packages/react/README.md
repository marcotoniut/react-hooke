# `@react-hooke/react`

## Recipes

### `useConst`

```tsx
import { useConst } from "@react-hooke/react";

function C(): JSX.Element {
  const one = useConst(() => 1);
  return <>{one}</>;
}
```

---

### `useDependent`

```tsx
import { useDependent } from "@react-hooke/react";

function C({ p1, p2 }: { p1: string; p1: string }): JSX.Element {
  const dependentOnP1AndP2Changing = useDependent(() => `${p1}${p2}`, [p1, p2]);
  return <>{dependentOnP1AndP2Changing}</>;
}
```
