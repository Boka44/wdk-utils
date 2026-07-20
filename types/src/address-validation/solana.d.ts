/**
 * @typedef {{ success: true, type: 'solana' }} SolanaAddressValidationSuccess
 * @typedef {{ success: false, reason: string }} SolanaAddressValidationFailure
 * @typedef {SolanaAddressValidationSuccess | SolanaAddressValidationFailure} SolanaAddressValidationResult
 */
/**
 * Validates a Solana address (base58-encoded 32-byte public key).
 *
 * Off-curve addresses (PDAs, e.g. associated token accounts) are accepted:
 * they are valid recipients, so no ed25519 on-curve check is performed.
 * Solana addresses carry no checksum, so only structural errors are detectable.
 *
 * @param {string} address The address to validate.
 * @returns {SolanaAddressValidationResult}
 */
export function validateSolanaAddress(address: string): SolanaAddressValidationResult;
export type SolanaAddressValidationSuccess = {
    success: true;
    type: "solana";
};
export type SolanaAddressValidationFailure = {
    success: false;
    reason: string;
};
export type SolanaAddressValidationResult = SolanaAddressValidationSuccess | SolanaAddressValidationFailure;
