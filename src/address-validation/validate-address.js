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

/** @typedef {import("./types.js").AddressValidationResult} AddressValidationResult */

/** Address validators by CAIP-2 chain namespace. */
const VALIDATORS = {
  bip122: validateBitcoinAddress,
  eip155: validateEVMAddress,
  solana: validateSolanaAddress,
  spark: validateSparkAddress,
  tron: validateTronAddress
}

/**
 * Validates an address for the chain identified by a CAIP-2 chain id.
 * Dispatches to the chain-specific validator and returns its result
 * unchanged, including chain-specific fields such as `type` and `network`.
 *
 * @param {string} chainId - A CAIP-2 chain id (e.g. "eip155:1") or a bare chain namespace (e.g. "eip155").
 * @param {string} address - The address to validate.
 * @returns {AddressValidationResult | null} The chain validator's result, or `null` when no validator exists for the chain namespace.
 */
export function validateAddress (chainId, address) {
  const namespace = chainId.split(':')[0]
  const validate = VALIDATORS[namespace]

  return validate ? validate(address) : null
}
