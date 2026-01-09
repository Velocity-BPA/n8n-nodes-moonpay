/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

// List Countries Fields
export const listCountryFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['country'],
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
				resource: ['country'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 250,
		},
		default: 50,
		description: 'Max number of results to return',
	},
];

// Get Country Fields
export const getCountryFields: INodeProperties[] = [
	{
		displayName: 'Country Code',
		name: 'countryCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['country'],
				operation: ['get'],
			},
		},
		default: '',
		placeholder: 'USA',
		description: 'The ISO country code (e.g., USA, GBR, DEU)',
	},
];

// Get IP Address Info Fields - no additional fields needed

export const countryFields: INodeProperties[] = [
	...listCountryFields,
	...getCountryFields,
];
