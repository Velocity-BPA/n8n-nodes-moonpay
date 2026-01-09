/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MoonPayApi implements ICredentialType {
	name = 'moonPayApi';

	displayName = 'MoonPay API';

	documentationUrl = 'https://dev.moonpay.com/';

	icon = 'file:moonpay.svg' as const;

	properties: INodeProperties[] = [
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
				{
					name: 'Production',
					value: 'production',
				},
			],
			default: 'sandbox',
			description: 'Select the MoonPay environment to use',
		},
		{
			displayName: 'Publishable API Key',
			name: 'publishableKey',
			type: 'string',
			default: '',
			required: true,
			description: 'Public API key for client-side operations. Found in MoonPay Dashboard > Developers.',
		},
		{
			displayName: 'Secret API Key',
			name: 'secretKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Secret key for server-side operations. Found in MoonPay Dashboard > Developers.',
		},
		{
			displayName: 'Private Key (PEM)',
			name: 'privateKey',
			type: 'string',
			typeOptions: {
				password: true,
				rows: 5,
			},
			default: '',
			description: 'RSA private key for Virtual Accounts API signature. Required only for Virtual Accounts operations.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Api-Key {{$credentials.secretKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "production" ? "https://api.moonpay.com" : "https://api.sandbox.moonpay.com"}}',
			url: '/v3/currencies',
			qs: {
				apiKey: '={{$credentials.publishableKey}}',
			},
		},
	};
}
