import z from "zod";

// From https://stackoverflow.com/a/56370310/316944
export type Tail<T extends any[]> = ((...t: T) => void) extends (h: any, ...r: infer R) => void ? R : never;

export declare type WithRequiredProps<T, K extends keyof T> = T & {
  // https://mariusschulz.com/blog/mapped-type-modifiers-in-typescript#removing-the-mapped-type-modifier
  [PK in K]-?: Exclude<T[K], null>;
};

// https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type Awaitable<T = unknown> = T | Promise<T>;

export type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>;
};

// From https://stackoverflow.com/a/70262876/316944
export declare abstract class As<Tag extends keyof never> {
  private static readonly $as$: unique symbol;
  private [As.$as$]: Record<Tag, true>;
}

export type Brand<T, B extends keyof never> = T & As<B>;

export const snowflakeRegex = /[1-9][0-9]{5,19}/;

export type Snowflake = Brand<string, "Snowflake">;

const isSnowflakeRegex = new RegExp(`^${snowflakeRegex.source}$`);
export function isSnowflake(v: unknown): v is Snowflake {
  return typeof v === "string" && isSnowflakeRegex.test(v);
}

export const zSnowflake = z.string().refine((str) => isSnowflake(str), {
  message: "Invalid snowflake ID",
});
export const hexToNumber = (hex: string | null): number | null => {
  if (!hex) return null;
  return parseInt(hex.replace("#", ""), 16);
};
