/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

// Generate Buy Widget URL Fields
export const generateBuyUrlFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['widget'],
				operation: ['generateBuyUrl'],
			},
		},
		options: [
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				placeholder: 'btc',
				description: 'Pre-select cryptocurrency',
			},
			{
				displayName: 'Wallet Address',
				name: 'walletAddress',
				type: 'string',
				default: '',
				placeholder: '0x...',
				description: 'Pre-fill wallet address',
			},
			{
				displayName: 'Base Currency Code',
				name: 'baseCurrencyCode',
				type: 'string',
				default: '',
				placeholder: 'usd',
				description: 'Pre-select fiat currency',
			},
			{
				displayName: 'Base Currency Amount',
				name: 'baseCurrencyAmount',
				type: 'number',
				default: 0,
				description: 'Pre-fill fiat amount',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Pre-fill email address',
			},
			{
				displayName: 'External Transaction ID',
				name: 'externalTransactionId',
				type: 'string',
				default: '',
				description: 'Custom reference ID for tracking',
			},
			{
				displayName: 'External Customer ID',
				name: 'externalCustomerId',
				type: 'string',
				default: '',
				description: 'Custom customer ID for tracking',
			},
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
				description: 'Pre-select payment method',
			},
			{
				displayName: 'Lock Amount',
				name: 'lockAmount',
				type: 'boolean',
				default: false,
				description: 'Whether to prevent user from changing amount',
			},
			{
				displayName: 'Show Wallet Address Form',
				name: 'showWalletAddressForm',
				type: 'boolean',
				default: true,
				description: 'Whether to show wallet address input',
			},
			{
				displayName: 'Color Code',
				name: 'colorCode',
				type: 'string',
				default: '',
				placeholder: '#7B3FE4',
				description: 'Custom widget color (hex code)',
			},
			{
				displayName: 'Theme',
				name: 'theme',
				type: 'options',
				options: [
					{ name: 'Light', value: 'light' },
					{ name: 'Dark', value: 'dark' },
				],
				default: 'light',
				description: 'Widget theme',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				placeholder: 'en',
				description: 'Widget language (ISO code)',
			},
			{
				displayName: 'Redirect URL',
				name: 'redirectURL',
				type: 'string',
				default: '',
				placeholder: 'https://yoursite.com/success',
				description: 'URL to redirect after completion',
			},
		],
	},
];

// Generate Sell Widget URL Fields
export const generateSellUrlFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['widget'],
				operation: ['generateSellUrl'],
			},
		},
		options: [
			{
				displayName: 'Base Currency Code',
				name: 'baseCurrencyCode',
				type: 'string',
				default: '',
				placeholder: 'eth',
				description: 'Pre-select cryptocurrency to sell',
			},
			{
				displayName: 'Quote Currency Code',
				name: 'quoteCurrencyCode',
				type: 'string',
				default: '',
				placeholder: 'usd',
				description: 'Pre-select fiat currency to receive',
			},
			{
				displayName: 'Base Currency Amount',
				name: 'baseCurrencyAmount',
				type: 'number',
				default: 0,
				description: 'Pre-fill crypto amount to sell',
			},
			{
				displayName: 'Refund Wallet Address',
				name: 'refundWalletAddress',
				type: 'string',
				default: '',
				placeholder: '0x...',
				description: 'Wallet address for refunds',
			},
			{
				displayName: 'External Transaction ID',
				name: 'externalTransactionId',
				type: 'string',
				default: '',
				description: 'Custom reference ID for tracking',
			},
			{
				displayName: 'External Customer ID',
				name: 'externalCustomerId',
				type: 'string',
				default: '',
				description: 'Custom customer ID for tracking',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Pre-fill email address',
			},
			{
				displayName: 'Color Code',
				name: 'colorCode',
				type: 'string',
				default: '',
				placeholder: '#7B3FE4',
				description: 'Custom widget color (hex code)',
			},
			{
				displayName: 'Theme',
				name: 'theme',
				type: 'options',
				options: [
					{ name: 'Light', value: 'light' },
					{ name: 'Dark', value: 'dark' },
				],
				default: 'light',
				description: 'Widget theme',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				placeholder: 'en',
				description: 'Widget language (ISO code)',
			},
			{
				displayName: 'Redirect URL',
				name: 'redirectURL',
				type: 'string',
				default: '',
				placeholder: 'https://yoursite.com/success',
				description: 'URL to redirect after completion',
			},
		],
	},
];

export const widgetFields: INodeProperties[] = [
	...generateBuyUrlFields,
	...generateSellUrlFields,
];
