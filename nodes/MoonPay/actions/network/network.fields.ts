/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

// List Networks Fields
export const listNetworkFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['network'],
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
				resource: ['network'],
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
];

// Get Network Fee Fields
export const getNetworkFeeFields: INodeProperties[] = [
	{
		displayName: 'Network Code',
		name: 'networkCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['network'],
				operation: ['getFee'],
			},
		},
		default: '',
		placeholder: 'ethereum',
		description: 'The network code (e.g., ethereum, bitcoin, polygon)',
	},
];

export const networkFields: INodeProperties[] = [
	...listNetworkFields,
	...getNetworkFeeFields,
];
