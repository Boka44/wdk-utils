export function validateBase58(address: any): import("./types.js").AddressValidationSuccess | {
    decoded: Uint8Array;
} | {
    success: boolean;
    reason: string;
};
/**
 * Validates a Bech32 address for any supported network.
 * @param {string} address - The address to validate.
 * @returns {BtcAddressValidationResult}
 */
export function validateBech32(address: string): BtcAddressValidationResult;
/**
 * Validates a Bech32m address for any supported network.
 * @param {string} address - The address to validate.
 * @returns {BtcAddressValidationResult}
 */
export function validateBech32m(address: string): BtcAddressValidationResult;
/**
 * Validates a Bitcoin address for any supported network.
 *
 * @param {string} address The address to validate.
 * @returns {BtcAddressValidationResult}
 */
export function validateBitcoinAddress(address: string): BtcAddressValidationResult;
export type BtcAddressValidationSuccess = import("./types.js").AddressValidationSuccess;
export type BtcAddressValidationFailure = import("./types.js").AddressValidationFailure;
export type BtcAddressValidationResult = import("./types.js").AddressValidationResult;
