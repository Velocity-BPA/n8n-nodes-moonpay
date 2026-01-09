/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

// List Customers Fields
export const listCustomerFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
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
				resource: ['customer'],
				operation: ['list'],
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
				resource: ['customer'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Filter by customer email',
			},
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

// Get Customer Fields
export const getCustomerFields: INodeProperties[] = [
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the customer',
	},
];

// Get Customer Limits Fields
export const getCustomerLimitsFields: INodeProperties[] = [
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getLimits'],
			},
		},
		default: '',
		description: 'The ID of the customer',
	},
];

// Check KYC Status Fields
export const checkKycFields: INodeProperties[] = [
	{
		displayName: 'Wallet Address',
		name: 'walletAddress',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['checkKyc'],
			},
		},
		default: '',
		placeholder: '0x...',
		description: 'The wallet address to check KYC status for',
	},
];

export const customerFields: INodeProperties[] = [
	...listCustomerFields,
	...getCustomerFields,
	...getCustomerLimitsFields,
	...checkKycFields,
];
