// Back-compat shim.
// Historic importers used `../config/clientConfig`. The canonical surface is
// now `../config` (barrel over the split files). This shim re-exports the
// subset that existed before the split so existing imports keep working.
// New code should import from `../config` directly.

export { CLIENT, CAPTURE_APP_URL } from './customer';
export { PRODUCT_OPTIONS } from './products';
export { CONGRESS_OPTIONS } from './congresses';
export { SYSTEM_PROMPT_CTX } from './system-prompt';
