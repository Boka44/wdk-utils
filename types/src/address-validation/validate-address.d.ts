/**
 * Validates an address for the chain identified by a CAIP-2 chain id.
 * Dispatches to the chain-specific validator and returns its result,
 * including chain-specific fields such as `type` and `network`.
 *
 * Bitcoin addresses encode their network, so for bip122 chain ids the
 * reference (genesis block hash) selects the expected network and a
 * mismatching address fails with NETWORK_MISMATCH. A bare bip122
 * namespace or an unknown reference also fails with NETWORK_MISMATCH,
 * since the expected network cannot be confirmed.
 *
 * @param {string} chainId - A CAIP-2 chain id (e.g. "eip155:1") or a bare chain namespace (e.g. "eip155").
 * @param {string} address - The address to validate.
 * @returns {AddressValidationResult} The chain validator's result, or `{ success: false, reason: 'UNSUPPORTED_CHAIN' }` when no validator exists for the chain namespace.
 */
export function validateAddress(chainId: string, address: string): AddressValidationResult;
export type AddressValidationResult = import("./types.js").AddressValidationResult;
