### advanced typescript

* [learn-advanced-typescript](https://hackernoon.com/learn-advanced-typescript-4yl727e6)
  * read: Recursive types

### note

1. typescript 中的执行顺序。

```ts
type CurryV0<P extends any[], R> =
  (arg0: Head<P>) => HasTail<P> extends true ? CurryV0<Tail<P>, R> : R
```

is equal to:

```ts
type CurryV0<P extends any[], R> =
  (arg0: Head<P>) => (HasTail<P> extends true ? CurryV0<Tail<P>, R> : R)
```

2. 关于 declare。

```ts
declare function curryV0<P extends any[], R>(f: (...args: P) => R): CurryV0<P, R>
const toCurry02 = (name: string, age: number, single: boolean) => true
const curried02 = curryV0(toCurry02)
const test9 = curried02('Jane')(26)(true)
```

此处 declare 用于声明了 curryV0 函数类型。咋一看为啥可以直接调用 `curryV0(toCurry02)`, 想了一下, 其实此处的 curryV0 有一码双关的意思, 即既运行`Typescript 类型函数`又暗含运行`Javascript 函数`。