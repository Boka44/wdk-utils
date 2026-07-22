/**
 * Validates an address for the chain identified by a CAIP-2 chain id.
 * Dispatches to the chain-specific validator and returns its result
 * unchanged, including chain-specific fields such as `type` and `network`.
 *
 * @param {string} chainId - A CAIP-2 chain id (e.g. "eip155:1") or a bare chain namespace (e.g. "eip155").
 * @param {string} address - The address to validate.
 * @returns {AddressValidationResult | null} The chain validator's result, or `null` when no validator exists for the chain namespace.
 */
export function validateAddress(chainId: string, address: string): AddressValidationResult | null;
export type AddressValidationResult = import("./types.js").AddressValidationResult;
