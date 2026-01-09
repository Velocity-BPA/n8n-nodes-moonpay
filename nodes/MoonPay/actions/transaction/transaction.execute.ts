/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { moonPayApiRequest, moonPayApiRequestAllItems } from '../../GenericFunctions';

export async function listBuy(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const filters = this.getNodeParameter('filters', index, {}) as IDataObject;

	const query: IDataObject = {};

	if (filters.externalCustomerId) {
		query.externalCustomerId = filters.externalCustomerId;
	}
	if (filters.startDate) {
		query.startDate = filters.startDate;
	}
	if (filters.endDate) {
		query.endDate = filters.endDate;
	}

	let transactions: IDataObject[];

	if (returnAll) {
		transactions = await moonPayApiRequestAllItems.call(
			this,
			'GET',
			'/v1/transactions',
			{},
			query,
			true,
		);
	} else {
		const limit = this.getNodeParameter('limit', index, 50) as number;
		query.limit = limit;

		const response = await moonPayApiRequest.call(
			this,
			'GET',
			'/v1/transactions',
			{},
			query,
			true,
		);
		transactions = Array.isArray(response) ? response : [];
	}

	return transactions.map((transaction) => ({
		json: transaction,
		pairedItem: { item: index },
	}));
}

export async function getBuy(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const transactionId = this.getNodeParameter('transactionId', index) as string;

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v1/transactions/${transactionId}`,
		{},
		{},
		true,
	);

	return [
		{
			json: response as IDataObject,
			pairedItem: { item: index },
		},
	];
}

export async function listSell(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const filters = this.getNodeParameter('filters', index, {}) as IDataObject;

	const query: IDataObject = {};

	if (filters.externalCustomerId) {
		query.externalCustomerId = filters.externalCustomerId;
	}

	let transactions: IDataObject[];

	if (returnAll) {
		transactions = await moonPayApiRequestAllItems.call(
			this,
			'GET',
			'/v1/sell_transactions',
			{},
			query,
			true,
		);
	} else {
		const limit = this.getNodeParameter('limit', index, 50) as number;
		query.limit = limit;

		const response = await moonPayApiRequest.call(
			this,
			'GET',
			'/v1/sell_transactions',
			{},
			query,
			true,
		);
		transactions = Array.isArray(response) ? response : [];
	}

	return transactions.map((transaction) => ({
		json: transaction,
		pairedItem: { item: index },
	}));
}

export async function getSell(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const transactionId = this.getNodeParameter('transactionId', index) as string;

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v1/sell_transactions/${transactionId}`,
		{},
		{},
		true,
	);

	return [
		{
			json: response as IDataObject,
			pairedItem: { item: index },
		},
	];
}

export async function listSwap(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const filters = this.getNodeParameter('filters', index, {}) as IDataObject;

	const query: IDataObject = {};

	if (filters.externalCustomerId) {
		query.externalCustomerId = filters.externalCustomerId;
	}

	let transactions: IDataObject[];

	if (returnAll) {
		transactions = await moonPayApiRequestAllItems.call(
			this,
			'GET',
			'/v4/swap/transactions',
			{},
			query,
			true,
		);
	} else {
		const limit = this.getNodeParameter('limit', index, 50) as number;
		query.limit = limit;

		const response = await moonPayApiRequest.call(
			this,
			'GET',
			'/v4/swap/transactions',
			{},
			query,
			true,
		);
		transactions = Array.isArray(response) ? response : [];
	}

	return transactions.map((transaction) => ({
		json: transaction,
		pairedItem: { item: index },
	}));
}

export async function getSwap(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const transactionId = this.getNodeParameter('transactionId', index) as string;

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v4/swap/transactions/${transactionId}`,
		{},
		{},
		true,
	);

	return [
		{
			json: response as IDataObject,
			pairedItem: { item: index },
		},
	];
}
