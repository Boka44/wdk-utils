/**
 * Splits a BIP-39 mnemonic into hex-encoded Shamir shares.
 *
 * The mnemonic is decoded to its raw BIP-39 entropy (16-32 bytes) before
 * splitting, so an invalid checksum or a non-wordlist word is rejected here.
 * Only the entropy is shared; the phrase is re-derived on {@link combineMnemonic}.
 *
 * @param {string} mnemonic - A valid BIP-39 mnemonic (12, 15, 18, 21, or 24 words).
 * @param {SplitOptions} options - Split configuration.
 * @returns {Promise<string[]>} Hex-encoded shares, `options.shares` of them.
 */
export function splitMnemonic(mnemonic: string, options: SplitOptions): Promise<string[]>;
/**
 * Reconstructs a BIP-39 mnemonic from Shamir shares.
 *
 * The recovered entropy is re-encoded through BIP-39, so the returned phrase
 * carries a valid checksum. At least `threshold` shares must be supplied.
 *
 * Note: Shamir shares are unauthenticated. Supplying wrong or too few (but >= 2)
 * shares yields a different, still checksum-valid phrase rather than an error.
 *
 * @param {string[]} shares - Hex-encoded shares produced by {@link splitMnemonic}.
 * @returns {Promise<string>} The reconstructed BIP-39 mnemonic.
 */
export function combineMnemonic(shares: string[]): Promise<string>;
export type SplitOptions = {
    /**
     * - Total number of shares to create (n). 2..255.
     */
    shares: number;
    /**
     * - Minimum shares needed to reconstruct (k). 2..shares.
     */
    threshold: number;
};
