/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { moonPayApiRequest } from '../../GenericFunctions';

export async function listCrypto(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const limit = this.getNodeParameter('limit', index, 50) as number;

	const response = await moonPayApiRequest.call(this, 'GET', '/v3/currencies');

	let currencies = Array.isArray(response) ? response : [];

	if (!returnAll) {
		currencies = currencies.slice(0, limit);
	}

	return currencies.map((currency) => ({
		json: currency as IDataObject,
		pairedItem: { item: index },
	}));
}

export async function getCrypto(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const currencyCode = this.getNodeParameter('currencyCode', index) as string;

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v3/currencies/${currencyCode.toLowerCase()}`,
	);

	return [
		{
			json: response as IDataObject,
			pairedItem: { item: index },
		},
	];
}

export async function listFiat(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const limit = this.getNodeParameter('limit', index, 50) as number;

	const response = await moonPayApiRequest.call(this, 'GET', '/v3/currencies/fiat');

	let currencies = Array.isArray(response) ? response : [];

	if (!returnAll) {
		currencies = currencies.slice(0, limit);
	}

	return currencies.map((currency) => ({
		json: currency as IDataObject,
		pairedItem: { item: index },
	}));
}

export async function getLimits(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const currencyCode = this.getNodeParameter('currencyCode', index) as string;
	const baseCurrencyCode = this.getNodeParameter('baseCurrencyCode', index, 'usd') as string;

	const query: IDataObject = {};
	if (baseCurrencyCode) {
		query.baseCurrencyCode = baseCurrencyCode.toLowerCase();
	}

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v3/currencies/${currencyCode.toLowerCase()}/limits`,
		{},
		query,
	);

	return [
		{
			json: response as IDataObject,
			pairedItem: { item: index },
		},
	];
}
