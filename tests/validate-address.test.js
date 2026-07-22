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

import { validateAddress } from '../src/address-validation/validate-address.js'

describe('validateAddress', () => {
  it('dispatches bip122 chain ids to the Bitcoin validator', () => {
    const result = validateAddress('bip122:000000000019d6689c085ae165831e93', '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')

    expect(result).toEqual({ success: true, type: 'p2pkh', network: 'bitcoin' })
  })

  it('dispatches eip155 chain ids to the EVM validator', () => {
    const result = validateAddress('eip155:1', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e')

    expect(result).toEqual({ success: true, type: 'evm' })
  })

  it('dispatches solana chain ids to the Solana validator', () => {
    const result = validateAddress('solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp', 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB')

    expect(result).toEqual({ success: true, type: 'solana' })
  })

  it('dispatches spark chain ids to the Spark validator', () => {
    const result = validateAddress('spark:mainnet', 'spark1pgss82uvuvyjggx72gl42qk3285yz0j6lgxw9uk2mvgajsr8w22nudv8w6hqs2')

    expect(result).toEqual({ success: true, type: 'spark' })
  })

  it('dispatches tron chain ids to the Tron validator', () => {
    const result = validateAddress('tron:mainnet', 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t')

    expect(result).toEqual({ success: true, type: 'tron' })
  })

  it('accepts a bare chain namespace without a reference', () => {
    const result = validateAddress('eip155', '0x742d35Cc6634C0532925a3b844Bc454e4438f44e')

    expect(result).toEqual({ success: true, type: 'evm' })
  })

  it('returns the chain validator failure unchanged', () => {
    const result = validateAddress('eip155:1', 'not-an-address')

    expect(result).toEqual({ success: false, reason: 'INVALID_FORMAT' })
  })

  it('returns null for a chain namespace without a validator', () => {
    const result = validateAddress('ton:mainnet', 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs')

    expect(result).toBeNull()
  })
})
