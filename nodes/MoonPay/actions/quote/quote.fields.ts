/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

// Get Buy Quote Fields
export const getBuyQuoteFields: INodeProperties[] = [
	{
		displayName: 'Currency Code',
		name: 'currencyCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getBuyQuote'],
			},
		},
		default: '',
		placeholder: 'btc',
		description: 'The cryptocurrency code to buy (e.g., btc, eth)',
	},
	{
		displayName: 'Base Currency Code',
		name: 'baseCurrencyCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getBuyQuote'],
			},
		},
		default: 'usd',
		placeholder: 'usd',
		description: 'The fiat currency code (e.g., usd, eur, gbp)',
	},
	{
		displayName: 'Amount Type',
		name: 'amountType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getBuyQuote'],
			},
		},
		options: [
			{
				name: 'Fiat Amount (Base Currency)',
				value: 'base',
			},
			{
				name: 'Crypto Amount (Quote Currency)',
				value: 'quote',
			},
		],
		default: 'base',
		description: 'Whether to specify the amount in fiat or crypto',
	},
	{
		displayName: 'Base Currency Amount',
		name: 'baseCurrencyAmount',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getBuyQuote'],
				amountType: ['base'],
			},
		},
		default: 100,
		description: 'Amount in fiat currency to spend',
	},
	{
		displayName: 'Quote Currency Amount',
		name: 'quoteCurrencyAmount',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getBuyQuote'],
				amountType: ['quote'],
			},
		},
		default: 0.01,
		description: 'Amount in cryptocurrency to receive',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getBuyQuote'],
			},
		},
		options: [
			{
				displayName: 'Payment Method',
				name: 'paymentMethod',
				type: 'options',
				options: [
					{ name: 'Credit/Debit Card', value: 'credit_debit_card' },
					{ name: 'SEPA Bank Transfer', value: 'sepa_bank_transfer' },
					{ name: 'GBP Bank Transfer', value: 'gbp_bank_transfer' },
					{ name: 'ACH Bank Transfer', value: 'ach_bank_transfer' },
					{ name: 'Apple Pay', value: 'apple_pay' },
					{ name: 'Google Pay', value: 'google_pay' },
				],
				default: 'credit_debit_card',
				description: 'Payment method for the transaction',
			},
			{
				displayName: 'Are Fees Included',
				name: 'areFeesIncluded',
				type: 'boolean',
				default: true,
				description: 'Whether fees are included in the quote amount',
			},
		],
	},
];

// Get Sell Quote Fields
export const getSellQuoteFields: INodeProperties[] = [
	{
		displayName: 'Currency Code',
		name: 'currencyCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getSellQuote'],
			},
		},
		default: '',
		placeholder: 'btc',
		description: 'The cryptocurrency code to sell (e.g., btc, eth)',
	},
	{
		displayName: 'Base Currency Code',
		name: 'baseCurrencyCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getSellQuote'],
			},
		},
		default: 'usd',
		placeholder: 'usd',
		description: 'The fiat currency code to receive (e.g., usd, eur, gbp)',
	},
	{
		displayName: 'Amount Type',
		name: 'amountType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getSellQuote'],
			},
		},
		options: [
			{
				name: 'Crypto Amount (Base Currency)',
				value: 'base',
			},
			{
				name: 'Fiat Amount (Quote Currency)',
				value: 'quote',
			},
		],
		default: 'base',
		description: 'Whether to specify the amount in crypto or fiat',
	},
	{
		displayName: 'Base Currency Amount',
		name: 'baseCurrencyAmount',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getSellQuote'],
				amountType: ['base'],
			},
		},
		default: 0.01,
		description: 'Amount in cryptocurrency to sell',
	},
	{
		displayName: 'Quote Currency Amount',
		name: 'quoteCurrencyAmount',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getSellQuote'],
				amountType: ['quote'],
			},
		},
		default: 100,
		description: 'Amount in fiat currency to receive',
	},
];

// Get Swap Quote Fields
export const getSwapQuoteFields: INodeProperties[] = [
	{
		displayName: 'Base Currency Code',
		name: 'baseCurrencyCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getSwapQuote'],
			},
		},
		default: '',
		placeholder: 'eth',
		description: 'The source cryptocurrency code (e.g., eth)',
	},
	{
		displayName: 'Quote Currency Code',
		name: 'quoteCurrencyCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getSwapQuote'],
			},
		},
		default: '',
		placeholder: 'btc',
		description: 'The destination cryptocurrency code (e.g., btc)',
	},
	{
		displayName: 'Base Currency Amount',
		name: 'baseCurrencyAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getSwapQuote'],
			},
		},
		default: 1,
		description: 'Amount of source cryptocurrency to swap',
	},
];

export const quoteFields: INodeProperties[] = [
	...getBuyQuoteFields,
	...getSellQuoteFields,
	...getSwapQuoteFields,
];
