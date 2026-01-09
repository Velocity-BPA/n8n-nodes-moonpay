/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { moonPayApiRequest } from '../../GenericFunctions';

export async function getBuyQuote(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const currencyCode = this.getNodeParameter('currencyCode', index) as string;
	const baseCurrencyCode = this.getNodeParameter('baseCurrencyCode', index) as string;
	const amountType = this.getNodeParameter('amountType', index) as string;
	const additionalOptions = this.getNodeParameter('additionalOptions', index, {}) as IDataObject;

	const query: IDataObject = {
		baseCurrencyCode: baseCurrencyCode.toLowerCase(),
	};

	if (amountType === 'base') {
		query.baseCurrencyAmount = this.getNodeParameter('baseCurrencyAmount', index) as number;
	} else {
		query.quoteCurrencyAmount = this.getNodeParameter('quoteCurrencyAmount', index) as number;
	}

	if (additionalOptions.paymentMethod) {
		query.paymentMethod = additionalOptions.paymentMethod;
	}

	if (additionalOptions.areFeesIncluded !== undefined) {
		query.areFeesIncluded = additionalOptions.areFeesIncluded;
	}

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v3/currencies/${currencyCode.toLowerCase()}/buy_quote`,
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

export async function getSellQuote(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const currencyCode = this.getNodeParameter('currencyCode', index) as string;
	const baseCurrencyCode = this.getNodeParameter('baseCurrencyCode', index) as string;
	const amountType = this.getNodeParameter('amountType', index) as string;

	const query: IDataObject = {
		baseCurrencyCode: baseCurrencyCode.toLowerCase(),
	};

	if (amountType === 'base') {
		query.baseCurrencyAmount = this.getNodeParameter('baseCurrencyAmount', index) as number;
	} else {
		query.quoteCurrencyAmount = this.getNodeParameter('quoteCurrencyAmount', index) as number;
	}

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v3/currencies/${currencyCode.toLowerCase()}/sell_quote`,
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

export async function getSwapQuote(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const baseCurrencyCode = this.getNodeParameter('baseCurrencyCode', index) as string;
	const quoteCurrencyCode = this.getNodeParameter('quoteCurrencyCode', index) as string;
	const baseCurrencyAmount = this.getNodeParameter('baseCurrencyAmount', index) as number;

	const query: IDataObject = {
		baseCurrencyCode: baseCurrencyCode.toLowerCase(),
		quoteCurrencyCode: quoteCurrencyCode.toLowerCase(),
		baseCurrencyAmount,
	};

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		'/v4/swap/quote',
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
