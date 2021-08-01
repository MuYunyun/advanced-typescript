/** --------- Array ---------- */
type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never
// type test1 = Head<[number, string, boolean]> // number

type Tail<T extends any[]> = T extends [any, ...(infer O)] ? O : never
// type test2 = Tail<[number, string, boolean]> // [string, boolean]

type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true
// type test3 = HasTail<[number]>

/** --------- usage of infer ---------- */
type ObjectInfer<O> = O extends { a: infer T } ? T : never
// type test4 = ObjectInfer<{ a: number }> // number

type FunctionInfer<F> = F extends (...args: infer A) => infer R ? [A, R] : never
// const fn01 = (a: number, b: any) => true
// type test5 = FunctionInfer<typeof fn01> // [[number, any], boolean]

type PromiseInfer<P> = P extends Promise<infer T> ? T: never
// const promise = new Promise<string>(() => {})
// type test6 = PromiseInfer<typeof promise> // string

type ArrayInfer<A> = A extends (infer T)[] ? T: never
// const array = [0, 'data', 1]
// type test7 = ArrayInfer<typeof array> // string | number

type TupleInfer<T> = T extends [infer A, ...(infer B)[]] ? [A, B] : never
// type test8 = TupleInfer<[string, number, boolean]> // [string, number | boolean]

/** ---------- curryV0 ---------- */
type CurryV0<P extends any[], R> =
  (arg0: Head<P>) => HasTail<P> extends true ? CurryV0<Tail<P>, R> : R

declare function curryV0<P extends any[], R>(f: (...args: P) => R): CurryV0<P, R>
const toCurry02 = (name: string, age: number, single: boolean) => true
const curried02 = curryV0(toCurry02)
const test9 = curried02('Jane')(26)(true)

// background:
const toCurry03 = (name: string, age: number, ...nicknames: string[]) => true
const curried03 = curryV0(toCurry03)
const test10 = curried03('Jane')(26)('JJ', 'Jini') // error: Expected 1 arguments, but got 2.

/** ---------- curryV1 ---------- */
type CurryV1<P extends any[], R> =
  (arg0: Head<P>, ...rest: Tail<P>) => HasTail<P> extends true ? CurryV1<Tail<P>, R> : R

declare function curryV1<P extends any[], R>(f: (...args: P) => R): CurryV1<P, R>

const toCurry04 = (name: string, age: number, ...nicknames: string[]) => true
const curried04 = curryV1(toCurry04)
// 返回结果是 CurryV1<[age: number, ...nicknames: string[]], boolean> 不太对, todo
const test11 = curried04('Jane', 26, 'JJ', 'Jini')
// expect error
const test12 = curried04('Jane', 26, 'JJ')(26, 'JJ')

// 接着要修正上述函数中后续传的参数类型
// 按照 T 为 any[] 这样子书写, 同样会对传入的参数类型失去校验能力。
type CurryV2<P extends any[], R> =
  <T extends any[]>(...args: T) => HasTail<P> extends true ? CurryV2<Tail<T>, R> : R

declare function curryV2<P extends any[], R>(f: (...args: P) => R): CurryV2<P, R>

const toCurry05 = (name: string, age: number, ...nicknames: string[]) => true
const curried05 = curryV2(toCurry05)
const test13 = curried05('Jane', 26, 'JJ', 'Jini')(26)

// 上述代码的问题是 curried05('Jane', 26, 'JJ', 'Jini') 后只能跟字符串, 但跟着数字也没有报错。

// Recursive types
/** -------- Last -------- */
type Last<T extends any[]> = HasTail<T> extends true ? Last<Tail<T>> : Head<T>
type test14 = Last<[string, number, boolean]> // boolean

/** -------- Length -------- */
type Length<T extends any[]> = T['length']
type test15 = Length<[]>
type test16 = Length<[any, any]>
type test17 = Length<[any, any, any]>

/** -------- Prepend -------- */
// 使用函数或者数组都可以实现 Prepend 的效果。
// type Prepend2<E, T extends any[]> = ((head: E, ...args: T) => any) extends ((...args: infer U) => any) ? U : T
type Prepend2<E, T extends any[]> = [head: E, ...args: T] extends [...args: infer U] ? U : T
type test18 = Prepend2<string, [number]> // [string, number]

/** -------- Drop -------- */
type Drop<N extends number, T extends any[], I extends any[] = []> =
  Length<I> extends N
  ? T
  : Drop<N, Tail<T>, Prepend2<any, I>>
type test19 = Drop<1, [string, number, boolean]> // [number, boolean]
type test191 = Drop<1, [number, string[]]> // [string[]]

/** ---------- curryV3 ---------- */
type CurryV3<P extends any[], R> =
  <T extends any[]>(...args: T) => Length<Drop<Length<T>, P>> extends 0 ? R : CurryV3<Drop<Length<T>, P>, R>

declare function curryV3<P extends any[], R>(f: (...args: P) => R): CurryV3<P, R>

const toCurry06 = (name: string, age: number, ...nicknames: string[]) => true
const curried06 = curryV3(toCurry06)
const test20 = curried06('Jane')(26)('JJ')
const test21 = curried06('Jane', 26)(1) // expect error
const test22 = curried06('Jane', 26, 'JJ')

// 因为此时 T 与 P 类型之间缺少关系绑定, 此时函数中理论上可以传入任意类型的参数, 因此此时可以看到校验全部失效。

/** ----------- Cast(抛弃) ----------- */
type Cast<X, Y> = X extends Y ? X : Y

type test21 = Cast<[string], any> // [string]
type test22 = Cast<[string], number> // number

/** ---------- curryV4 ---------- */
type CurryV4<P extends any[], R> =
  <T extends any[]>(...args: Cast<T, Partial<P>>) => Length<Drop<Length<T>, P>> extends 0
  ? R : CurryV4<Drop<Length<T>, P>, R>
// 解释: 使用 Cast<T, Partial<P>> 关联 T 与 P 的关系, 若函数传参类型与 Curry 接受类型 P 不匹配, 则保留 P 类型。

declare function curryV4<P extends any[], R>(f: (...args: P) => R): CurryV4<P, R>

const toCurry07 = (name: string, age: number, ...nicknames: string[]) => true
const curried07 = curryV4(toCurry07)
const test23 = curried07('Jane')(26)('JJ')
const test24 = curried07('Jane', 26)(1) // 可以看到此时类型校验生效了
const test25 = curried07('Jane', 26, 'JJ')
const test26 = curried07('Jane', 26, 'JJ', 'Jini')(26) // 不足的是, 如果末尾使用了 ...nicknames, 此时还是无法满足类型校验。

// 在 CurryV4 版本中, 使用 Length<> extends 0, 作为递归终止条件, 但如果使用者使用了 ...nicknames,
// 则 Length 的结果始终到达不了 0, 这样就没办法作为递归的终止条件了。

/** ---------- curryV5 ---------- */
// type test27 = [string] extends [any, ...any[]] ? true : false // true
type CurryV5<P extends any[], R> =
  <T extends any[]>(...args: Cast<T, Partial<P>>) => Drop<Length<T>, P> extends [any, ...any[]]
    ? CurryV5<Drop<Length<T>, P> extends infer DT ? Cast<DT, any[]> : never, R>
    : R
declare function curryV5<P extends any[], R>(f: (...args: P) => R): CurryV5<P, R>
// const toCurry08 = (name: string, age: number, ...nicknames: string[]) => true
const toCurry08 = (name: string, age: number, ...nicknames: string[]) => true
const curried08 = curryV5(toCurry08)

const test27 = curried08('Jane')(26) // boolean, here we expect it function.
type aaaaaa = [string] extends [any, ...any[]] ? true : false
const test28 = curried08('Jane', 26)
const test29 = curried08('Jane', 26, 'JJ')
const test30 = curried08('Jane', 26, 'JJ', 'Jini')(26) // 可以看到, 在满足之前 case 的情况下, 现在也满足了扩展运算符的语法。

// v5 没有验证成功, 先跳过

type Pos<I extends any[]> = Length<I>
type Next<I extends any[]> = Prepend2<any, I>
type Prev<I extends any[]> = Tail<I>

// type iterator = [any, any]
// type test31 = Pos<iterator> // 2
// type test32 = Pos<Next<iterator>> // 3
// type test33 = Pos<Prev<iterator>> // 1

type Iterator1<Index extends number = 0, From extends any[] = [], I extends any[] = []> =
  Pos<I> extends Index ? From : Iterator1<Index, Next<From>, Next<I>>

// type test34 = Iterator1<2> // [any, any]
// type test35 = Iterator1<3, [any, any]> // [any, any, any, any, any]
// type test36 = Pos<test34> // 2
// type test37 = Pos<test35> // 5

type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> =
  Pos<I> extends Length<T> ? R : Reverse<T, Prepend2<T[Pos<I>], R>, Next<I>>
// type test57 = Reverse<[1, 2, 3]> // [3, 2, 1]
// type test58 = Reverse<test57> // [1, 2, 3]
// type test59 = Reverse<[2, 1], [3, 4]> // [1, 2, 3, 4]

type Concat<T1 extends any[], T2 extends any[]> = Reverse<Reverse<T1>, T2>
// type test60 = Concat<[1, 2], [3, 4]> // [1, 2, 3, 4]

type Append<E, T extends any[]> = Concat<T, [E]>
// type test61 = Append<3, [1, 2]> // [1, 2, 3]

// GapOf 先跳过, 未识别 __
type GapOf<T1 extends any[], T2 extends any[], TN extends any[], I extends any[]>
  = T1[Pos<I>] extends __ ? Append<T2[Pos<I>], TN> : TN