//https://github.com/ZeppelinBot/Zeppelin/blob/5b1dc85d922bb6c3d4a451d670a2533c3eab7587/backend/src/utils/validateNoObjectAliases.ts
const scalarTypes = ["string", "number", "boolean", "bigint"];

export class ObjectAliasError extends Error {}

export function validateNoObjectAliases<T extends object>(obj: T, seen?: WeakSet<any>): void {
  if (!seen) {
    seen = new WeakSet();
  }

  for (const [, value] of Object.entries(obj)) {
    if (value == null || scalarTypes.includes(typeof value)) {
      continue;
    }

    if (seen.has(value)) {
      throw new ObjectAliasError("Object aliases are not allowed");
    }

    validateNoObjectAliases(value, seen);
    seen.add(value);
  }
}
