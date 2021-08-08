### advanced typescript

* [learn-advanced-typescript](https://hackernoon.com/learn-advanced-typescript-4yl727e6) 阅读下来有一定难度, 实际编码下来有一些点与原作者不同。
* [中文版](https://zhuanlan.zhihu.com/p/120441348)

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

3. extends 字段语义

如下 case 结果

```ts
type c = { a: true, b: false }
type d = c extends { a: true } ? true : false // true
```

### 如何判断 Typescript 中的两个类型完全相等?

```ts
// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650. understanding it is difficult.
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<U>() => U extends Y ? 1 : 2) ? true : false
```

### 将 tuple 转化为对象

可以利用 `tuple[number]` 取得 tuple 的并集。

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
type test = typeof tuple[number] // "tesla" | "model 3" | "model X" | "model Y"
```

可以利用 `P in T[number]` 进行遍历。

```ts
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: string
}
```

### link

* [ts-toolbelt](https://github.com/millsp/ts-toolbelt)