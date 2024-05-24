export * from "./synonym";

export type Optional<T> = T | undefined;
export type JSONResponse<T = unknown> = { data: T };
// @todo: Remove when not used: export type Nullable<T> = T | null | undefined;
