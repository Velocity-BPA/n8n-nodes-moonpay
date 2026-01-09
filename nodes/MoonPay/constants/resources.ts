/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const resourceOptions: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Country',
			value: 'country',
			description: 'Get supported countries and payment methods',
		},
		{
			name: 'Currency',
			value: 'currency',
			description: 'Retrieve supported cryptocurrencies and fiat currencies',
		},
		{
			name: 'Customer',
			value: 'customer',
			description: 'Manage customer records and KYC status',
		},
		{
			name: 'Network',
			value: 'network',
			description: 'Get blockchain network information',
		},
		{
			name: 'Quote',
			value: 'quote',
			description: 'Get price quotes for buy, sell, and swap transactions',
		},
		{
			name: 'Transaction',
			value: 'transaction',
			description: 'Manage buy, sell, and swap transactions',
		},
		{
			name: 'Virtual Account',
			value: 'virtualAccount',
			description: 'Manage virtual accounts for automated on-ramps',
		},
		{
			name: 'Widget URL',
			value: 'widget',
			description: 'Generate signed widget URLs',
		},
	],
	default: 'currency',
};

// Currency Operations
export const currencyOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['currency'],
		},
	},
	options: [
		{
			name: 'Get Cryptocurrency',
			value: 'getCrypto',
			description: 'Get details for a specific cryptocurrency',
			action: 'Get cryptocurrency',
		},
		{
			name: 'Get Currency Limits',
			value: 'getLimits',
			description: 'Get transaction limits for a currency',
			action: 'Get currency limits',
		},
		{
			name: 'List Cryptocurrencies',
			value: 'listCrypto',
			description: 'List all supported cryptocurrencies',
			action: 'List cryptocurrencies',
		},
		{
			name: 'List Fiat Currencies',
			value: 'listFiat',
			description: 'List all supported fiat currencies',
			action: 'List fiat currencies',
		},
	],
	default: 'listCrypto',
};

// Quote Operations
export const quoteOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['quote'],
		},
	},
	options: [
		{
			name: 'Get Buy Quote',
			value: 'getBuyQuote',
			description: 'Get a price quote for buying cryptocurrency',
			action: 'Get buy quote',
		},
		{
			name: 'Get Sell Quote',
			value: 'getSellQuote',
			description: 'Get a price quote for selling cryptocurrency',
			action: 'Get sell quote',
		},
		{
			name: 'Get Swap Quote',
			value: 'getSwapQuote',
			description: 'Get a price quote for swapping cryptocurrencies',
			action: 'Get swap quote',
		},
	],
	default: 'getBuyQuote',
};

// Transaction Operations
export const transactionOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
		},
	},
	options: [
		{
			name: 'Get Buy Transaction',
			value: 'getBuy',
			description: 'Get details of a buy transaction',
			action: 'Get buy transaction',
		},
		{
			name: 'Get Sell Transaction',
			value: 'getSell',
			description: 'Get details of a sell transaction',
			action: 'Get sell transaction',
		},
		{
			name: 'Get Swap Transaction',
			value: 'getSwap',
			description: 'Get details of a swap transaction',
			action: 'Get swap transaction',
		},
		{
			name: 'List Buy Transactions',
			value: 'listBuy',
			description: 'List all buy transactions',
			action: 'List buy transactions',
		},
		{
			name: 'List Sell Transactions',
			value: 'listSell',
			description: 'List all sell transactions',
			action: 'List sell transactions',
		},
		{
			name: 'List Swap Transactions',
			value: 'listSwap',
			description: 'List all swap transactions',
			action: 'List swap transactions',
		},
	],
	default: 'listBuy',
};

// Customer Operations
export const customerOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['customer'],
		},
	},
	options: [
		{
			name: 'Check KYC Status',
			value: 'checkKyc',
			description: 'Check KYC verification status for a wallet',
			action: 'Check KYC status',
		},
		{
			name: 'Get Customer',
			value: 'get',
			description: 'Get details of a customer',
			action: 'Get customer',
		},
		{
			name: 'Get Customer Limits',
			value: 'getLimits',
			description: 'Get transaction limits for a customer',
			action: 'Get customer limits',
		},
		{
			name: 'List Customers',
			value: 'list',
			description: 'List all customers',
			action: 'List customers',
		},
	],
	default: 'list',
};

// Virtual Account Operations
export const virtualAccountOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['virtualAccount'],
		},
	},
	options: [
		{
			name: 'Get Virtual Account',
			value: 'get',
			description: 'Get virtual account details',
			action: 'Get virtual account',
		},
		{
			name: 'List Transactions',
			value: 'listTransactions',
			description: 'List transactions for a virtual account',
			action: 'List virtual account transactions',
		},
	],
	default: 'get',
};

// Country Operations
export const countryOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['country'],
		},
	},
	options: [
		{
			name: 'Get Country',
			value: 'get',
			description: 'Get details of a country',
			action: 'Get country',
		},
		{
			name: 'Get IP Address Info',
			value: 'getIpAddress',
			description: 'Get country based on IP address',
			action: 'Get IP address info',
		},
		{
			name: 'List Countries',
			value: 'list',
			description: 'List all supported countries',
			action: 'List countries',
		},
	],
	default: 'list',
};

// Network Operations
export const networkOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['network'],
		},
	},
	options: [
		{
			name: 'Get Network Fee',
			value: 'getFee',
			description: 'Get current network fee estimates',
			action: 'Get network fee',
		},
		{
			name: 'List Networks',
			value: 'list',
			description: 'List all supported blockchain networks',
			action: 'List networks',
		},
	],
	default: 'list',
};

// Widget Operations
export const widgetOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['widget'],
		},
	},
	options: [
		{
			name: 'Generate Buy Widget URL',
			value: 'generateBuyUrl',
			description: 'Generate a signed URL for the buy widget',
			action: 'Generate buy widget URL',
		},
		{
			name: 'Generate Sell Widget URL',
			value: 'generateSellUrl',
			description: 'Generate a signed URL for the sell widget',
			action: 'Generate sell widget URL',
		},
	],
	default: 'generateBuyUrl',
};
