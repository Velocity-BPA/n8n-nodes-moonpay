/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

// Get Virtual Account Fields
export const getVirtualAccountFields: INodeProperties[] = [
	{
		displayName: 'Filter By',
		name: 'filterBy',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['get'],
			},
		},
		options: [
			{
				name: 'Virtual Account ID',
				value: 'virtualAccountId',
			},
			{
				name: 'External Customer ID',
				value: 'externalCustomerId',
			},
		],
		default: 'virtualAccountId',
		description: 'How to filter the virtual account',
	},
	{
		displayName: 'Virtual Account ID',
		name: 'virtualAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['get'],
				filterBy: ['virtualAccountId'],
			},
		},
		default: '',
		description: 'The ID of the virtual account',
	},
	{
		displayName: 'External Customer ID',
		name: 'externalCustomerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['get'],
				filterBy: ['externalCustomerId'],
			},
		},
		default: '',
		description: 'The external customer ID',
	},
];

// List Virtual Account Transactions Fields
export const listVirtualAccountTransactionsFields: INodeProperties[] = [
	{
		displayName: 'Virtual Account ID',
		name: 'virtualAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['listTransactions'],
			},
		},
		default: '',
		description: 'The ID of the virtual account',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['listTransactions'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['virtualAccount'],
				operation: ['listTransactions'],
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

export const virtualAccountFields: INodeProperties[] = [
	...getVirtualAccountFields,
	...listVirtualAccountTransactionsFields,
];
