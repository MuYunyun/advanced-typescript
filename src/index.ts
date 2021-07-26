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

/** ---------- curryV1 ---------- */
// background:
const toCurry03 = (name: string, age: number, ...nicknames: string[]) => true
const curried03 = curryV0(toCurry03)
const test10 = curried03('Jane')(26)('JJ', 'Jini') // error: Expected 1 arguments, but got 2.

/** ---------- curryV0 ---------- */
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
// 但是这样子书写, T 为 any[] 会照成 Tail<T> 失效。
type CurryV2<P extends any[], R> =
  <T extends any[]>(args: T) => HasTail<P> extends true ? CurryV2<Tail<T>, R> : R

declare function curryV2<P extends any[], R>(f: (...args: P) => R): CurryV2<P, R>

const toCurry05 = (name: string, age: number, ...nicknames: string[]) => true
const curried05 = curryV2(toCurry04)
const test13 = curried05('Jane', 26, 'JJ', 'Jini')

// read Recursive types

