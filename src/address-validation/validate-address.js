// Copyright 2026 Tether Operations Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use strict'

import { validateBitcoinAddress } from './bitcoin.js'
import { validateEVMAddress } from './evm.js'
import { validateSolanaAddress } from './solana.js'
import { validateSparkAddress } from './spark.js'
import { validateTronAddress } from './tron.js'

/** @typedef {import("./types.js").AddressValidationFailure} AddressValidationFailure */
/** @typedef {import("./bitcoin.js").BtcAddressValidationResult} BtcAddressValidationResult */
/** @typedef {import("./evm.js").EvmAddressValidationResult} EvmAddressValidationResult */
/** @typedef {import("./solana.js").SolanaAddressValidationResult} SolanaAddressValidationResult */
/** @typedef {import("./spark.js").SparkAddressValidationResult} SparkAddressValidationResult */
/** @typedef {import("./tron.js").TronAddressValidationResult} TronAddressValidationResult */

/**
 * @typedef {BtcAddressValidationResult | EvmAddressValidationResult | SolanaAddressValidationResult | SparkAddressValidationResult | TronAddressValidationResult | AddressValidationFailure} ValidateAddressResult
 */

/** Address validators by CAIP-2 chain namespace. */
const VALIDATORS = {
  bip122: validateBitcoinAddress,
  eip155: validateEVMAddress,
  solana: validateSolanaAddress,
  spark: validateSparkAddress,
  tron: validateTronAddress
}

/** CAIP-2 chain id: a namespace, optionally followed by a ":reference". */
const CHAIN_ID_RE = /^[-a-z0-9]{3,8}(:[-_a-zA-Z0-9]{1,32})?$/

/** bip122 chain references (genesis block hashes) → Bitcoin network label. */
const BITCOIN_NETWORKS = {
  '000000000019d6689c085ae165831e93': 'bitcoin',
  '000000000933ea01ad0ee984209779ba': 'testnet',
  '0f9188f13cb7b2c71f2a335e3a4fc328': 'regtest'
}

/**
 * Returns whether a validated Bitcoin address matches the expected network.
 * Legacy testnet and regtest addresses share the same version bytes and are
 * reported as testnet, so p2pkh/p2sh testnet results also match regtest.
 *
 * @param {{ type: string, network?: string }} result
 * @param {string} [expected]
 * @returns {boolean}
 */
function _matchesBitcoinNetwork (result, expected) {
  if (result.network === expected) return true
  return expected === 'regtest' && result.network === 'testnet' &&
    (result.type === 'p2pkh' || result.type === 'p2sh')
}

/**
 * Validates an address for the chain identified by a CAIP-2 chain id.
 * Dispatches to the chain-specific validator and returns its result,
 * including chain-specific fields such as `type` and `network`.
 *
 * Bitcoin and Spark addresses encode their network, so for bip122 and spark
 * chain ids the reference selects the expected network and a mismatching
 * address fails with NETWORK_MISMATCH — as does a missing or unknown
 * reference, since the expected network cannot be confirmed. Legacy
 * testnet-format addresses accepted for the regtest chain id are reported
 * with the network normalized to "regtest".
 *
 * @param {string} chainId - A CAIP-2 chain id (e.g. "eip155:1") or a bare chain namespace (e.g. "eip155").
 * @param {string} address - The address to validate.
 * @returns {ValidateAddressResult} The chain validator's result; INVALID_CHAIN_ID for a malformed chain id, UNSUPPORTED_CHAIN when the chain namespace has no validator.
 */
export function validateAddress (chainId, address) {
  if (typeof chainId !== 'string' || !CHAIN_ID_RE.test(chainId)) {
    return { success: false, reason: 'INVALID_CHAIN_ID' }
  }

  const [namespace, reference] = chainId.split(':')
  const validate = VALIDATORS[namespace]
  if (!validate) return { success: false, reason: 'UNSUPPORTED_CHAIN' }

  const result = validate(address)
  if (!result.success) return result

  if (namespace === 'bip122') {
    const expected = BITCOIN_NETWORKS[reference]
    if (!_matchesBitcoinNetwork(result, expected)) {
      return { success: false, reason: 'NETWORK_MISMATCH' }
    }
    if (result.network !== expected) {
      return { ...result, network: expected }
    }
  }
  if (namespace === 'spark' && result.network !== reference) {
    return { success: false, reason: 'NETWORK_MISMATCH' }
  }
  return result
}
