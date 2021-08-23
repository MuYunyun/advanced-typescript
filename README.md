## note

关于 declare。

```ts
declare function curryV0<P extends any[], R>(f: (...args: P) => R): CurryV0<P, R>
const toCurry02 = (name: string, age: number, single: boolean) => true
const curried02 = curryV0(toCurry02)
const test9 = curried02('Jane')(26)(true)
```

此处 declare 用于声明了 curryV0 函数类型。咋一看为啥可以直接调用 `curryV0(toCurry02)`, 想了一下, 其实此处的 curryV0 有一码双关的意思, 即既运行`Typescript 类型函数`又暗含运行`Javascript 函数`。

## 用于条件判断时的 extends

当 extends 用于表示条件判断时，可以总结规律：`范围狭窄 extends 范围宽泛时结果为 true，反之为 false`。

```ts
type demo = string extends string | number ? true : false // true
```

当 extends 作用于对象时，若在对象中指定的 key 越多，则其类型定义的范围越狭窄，可以参考如下例子。

```ts
type result = { a: true, b: false } extends { a: true } ? true : false // true
```

## 泛型类型中的 extends

考虑如下 Demo 类型定义:

```ts
type Demo<T, U> = T extends U ? never : T
```

因为 `'a' | 'b' | 'c' extends 'a'` 是 false, 所以 `Demo<'a' | 'b' | 'c', 'a'>` 结果是 never 么?

TypeScript [官方文档](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)提到:

> When conditional types act on a generic type, they become distributive when given a union type.

即当条件类型作用于泛型类型时，它们在给定联合类型时成为分配类型。用 JavaScript 来表达 `'a' | 'b' | 'c' extends 'a'` 的结果类似于:

```js
function Demo(T, U) {
  return T.map(val => {
    if (val !== U) return val
    return 'never'
  })
}

Demo(['a', 'b', 'c'], 'a') // ['never', 'b', 'c']
```

此外根据 [never 类型](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)的定义 —— never 类型可分配给每种类型，但是没有类型可以分配给 never（除了 never 本身）。即 `never | 'b' | 'c'` 等价于 `'b' | 'c'`。

因此 `Demo<'a' | 'b' | 'c', 'a'>` 结果并不是 never 而是 `'b' | 'c'`。而 Demo 类型的声明其实就是 TS 官方提供的 `Exclude<Type, ExcludedUnion>`。

## 在箭头函数中使用 extends

官网中关于运算符 extends 运算符的优先级，在如下的类型定义中

```diff
type CurryV0<P extends any[], R> =
-  (arg0: Head<P>) => HasTail<P> extends true ? CurryV0<Tail<P>, R> : R
+  (arg0: Head<P>) => (HasTail<P> extends true ? CurryV0<Tail<P>, R> : R)
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

* [learn-advanced-typescript](https://hackernoon.com/learn-advanced-typescript-4yl727e6) 阅读下来有一定难度, 实际编码下来有一些点与原作者不同。
* [中文版](https://zhuanlan.zhihu.com/p/120441348)

### Todo

* chainableOptions
* promiseAll