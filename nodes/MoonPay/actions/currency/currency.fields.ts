/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

// List Cryptocurrencies Fields
export const listCryptoFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['currency'],
				operation: ['listCrypto'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['currency'],
				operation: ['listCrypto'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];

// Get Cryptocurrency Fields
export const getCryptoFields: INodeProperties[] = [
	{
		displayName: 'Currency Code',
		name: 'currencyCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['currency'],
				operation: ['getCrypto'],
			},
		},
		default: '',
		placeholder: 'btc',
		description: 'The currency code (e.g., btc, eth, usdc)',
	},
];

// List Fiat Currencies Fields
export const listFiatFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['currency'],
				operation: ['listFiat'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['currency'],
				operation: ['listFiat'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];

// Get Currency Limits Fields
export const getLimitsFields: INodeProperties[] = [
	{
		displayName: 'Currency Code',
		name: 'currencyCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['currency'],
				operation: ['getLimits'],
			},
		},
		default: '',
		placeholder: 'btc',
		description: 'The currency code (e.g., btc, eth, usdc)',
	},
	{
		displayName: 'Base Currency Code',
		name: 'baseCurrencyCode',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['currency'],
				operation: ['getLimits'],
			},
		},
		default: 'usd',
		placeholder: 'usd',
		description: 'The fiat currency code for limits (e.g., usd, eur, gbp)',
	},
];

export const currencyFields: INodeProperties[] = [
	...listCryptoFields,
	...getCryptoFields,
	...listFiatFields,
	...getLimitsFields,
];
