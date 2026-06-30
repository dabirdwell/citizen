/**
 * Test-only ESM resolver hook (NOT a test file — excluded by the *.test.mts
 * glob, and never imported by application code or the Next build).
 *
 * Node's native TypeScript loader (type-stripping) does not infer file
 * extensions for relative specifiers. Some source modules import siblings
 * extensionlessly (e.g. guardian-prompt.ts → `./foundation-components`),
 * relying on the bundler's resolution at build time. To exercise those modules
 * under `node --test` without modifying source, this hook retries a failing
 * extensionless relative specifier with a `.ts` suffix.
 *
 * Register it from a test via:
 *   import { register } from "node:module";
 *   register("./_ts-extension-resolver.mjs", import.meta.url);
 *   const mod = await import("../src/.../module.ts");
 */
export async function resolve(specifier, context, next) {
  const isRelative = specifier.startsWith("./") || specifier.startsWith("../");
  const hasExt = /\.[cm]?[jt]sx?$/.test(specifier);
  if (isRelative && !hasExt) {
    try {
      return await next(specifier + ".ts", context);
    } catch {
      // fall through to default resolution / original error
    }
  }
  return next(specifier, context);
}
