/**
 * Validates a Tron address.
 *
 * @param {string} address The address to validate.
 * @returns {TronAddressValidationResult}
 */
export function validateTronAddress(address: string): TronAddressValidationResult;
export type TronAddressValidationSuccess = import("./types.js").AddressValidationSuccess;
export type TronAddressValidationFailure = import("./types.js").AddressValidationFailure;
export type TronAddressValidationResult = import("./types.js").AddressValidationResult;
