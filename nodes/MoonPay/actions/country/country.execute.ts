/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { moonPayApiRequest } from '../../GenericFunctions';

export async function listCountries(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const limit = this.getNodeParameter('limit', index, 50) as number;

	const response = await moonPayApiRequest.call(this, 'GET', '/v1/countries');

	let countries = Array.isArray(response) ? response : [];

	if (!returnAll) {
		countries = countries.slice(0, limit);
	}

	return countries.map((country) => ({
		json: country as IDataObject,
		pairedItem: { item: index },
	}));
}

export async function getCountry(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const countryCode = this.getNodeParameter('countryCode', index) as string;

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v1/countries/${countryCode.toUpperCase()}`,
	);

	return [
		{
			json: response as IDataObject,
			pairedItem: { item: index },
		},
	];
}

export async function getIpAddress(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const response = await moonPayApiRequest.call(
		this,
		'GET',
		'/v1/ip_address',
	);

	return [
		{
			json: response as IDataObject,
			pairedItem: { item: index },
		},
	];
}
