/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

// List Buy Transactions Fields
export const listBuyFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['listBuy'],
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
				resource: ['transaction'],
				operation: ['listBuy'],
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['listBuy'],
			},
		},
		options: [
			{
				displayName: 'External Customer ID',
				name: 'externalCustomerId',
				type: 'string',
				default: '',
				description: 'Filter by external customer ID',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions after this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions before this date',
			},
		],
	},
];

// Get Buy Transaction Fields
export const getBuyFields: INodeProperties[] = [
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['getBuy'],
			},
		},
		default: '',
		description: 'The ID of the buy transaction',
	},
];

// List Sell Transactions Fields
export const listSellFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['listSell'],
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
				resource: ['transaction'],
				operation: ['listSell'],
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['listSell'],
			},
		},
		options: [
			{
				displayName: 'External Customer ID',
				name: 'externalCustomerId',
				type: 'string',
				default: '',
				description: 'Filter by external customer ID',
			},
		],
	},
];

// Get Sell Transaction Fields
export const getSellFields: INodeProperties[] = [
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['getSell'],
			},
		},
		default: '',
		description: 'The ID of the sell transaction',
	},
];

// List Swap Transactions Fields
export const listSwapFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['listSwap'],
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
				resource: ['transaction'],
				operation: ['listSwap'],
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['listSwap'],
			},
		},
		options: [
			{
				displayName: 'External Customer ID',
				name: 'externalCustomerId',
				type: 'string',
				default: '',
				description: 'Filter by external customer ID',
			},
		],
	},
];

// Get Swap Transaction Fields
export const getSwapFields: INodeProperties[] = [
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['getSwap'],
			},
		},
		default: '',
		description: 'The ID of the swap transaction',
	},
];

export const transactionFields: INodeProperties[] = [
	...listBuyFields,
	...getBuyFields,
	...listSellFields,
	...getSellFields,
	...listSwapFields,
	...getSwapFields,
];
