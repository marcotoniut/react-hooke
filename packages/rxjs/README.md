# `@react-hooke/rxjs`

## Recipes

### `useObservableState`

#### Usage

```tsx
import { useObservableState } from "@react-hooke/rxjs";
import { useEffect, useState } from "react";
import { Subject } from "rxjs";
import * as RX from "rxjs/operators";

function C(): JSX.Element {
  const [streams] = useState(() => {
    const trigger$ = new Subject();
    const count$ = trigger$.pipe(RX.reduce((acc) => acc + 1, 0));
    return {
      count$,
      trigger$,
    };
  });

  useEffect(() => {
    setInterval(() => streams.trigger$.next(), 1000);
  }, [streams.trigger$]);

  const count = useObservableState(streams.count$, () => 0);

  return <>{count}</>;
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
import { useBehaviorState } from "@react-hooke/rxjs";
import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

function C(): JSX.Element {
  const [count$] = useState(() => new BehaviorSubject<number>(0));
  const count = useBehaviorState(count$);

  useEffect(() => {
    setInterval(() => count$.next(count$.value + 1), 1000);
  }, [count$]);

  return <>{count}</>;
}
```
