# `@react-hooke/rxjs`

## Recipes

### `useObservableState`

#### Usage

```tsx
import { useConst, useDependent } from "@react-hooke/react";
import { useObservableState } from "@react-hooke/rxjs";
import { useEffect } from "react";
import { Subject } from "rxjs";
import * as RX from "rxjs/operators";

function C(): JSX.Element {
  const $ = useConst(() => new Subject());

  useEffect(() => {
    setInterval(() => $.next(), 1000);
  }, [$]);

  const counter$ = useDependent(
    () => $.pipe(RX.reduce((acc) => acc + 1, 0)),
    [$]
  );
  const counter = useObservableState(counter$, () => 0);

  return <>{counter}</>;
}
```

#### Merging observables

```tsx
import { useDependent } from "@react-hooke/react";
import { useObservableState } from "@react-hooke/rxjs";
import { merge, Observable } from "rxjs";

function C({
  $1,
  $2,
}: {
  $1: Observable<number>;
  $2: Observable<number>;
}): JSX.Element {
  const merged$ = useDependent(() => merge($1, $2), [$1, $2]);
  const merged = useObservableState(merged$, () => 0);

  return <>{merged}</>;
}
```

---

### `useBehaviorState`

#### Usage

```tsx
import { useConst } from "@react-hooke/react";
import { useBehaviorState } from "@react-hooke/rxjs";
import { useEffect } from "react";
import { BehaviorSubject } from "rxjs";

function C(): JSX.Element {
  const counter$ = useConst(() => new BehaviorSubject<number>(0));
  const counter = useBehaviorState(counter$);

  useEffect(() => {
    setInterval(() => counter$.next(counter$.value + 1), 1000);
  }, [counter$]);

  return <>{counter}</>;
}
```
