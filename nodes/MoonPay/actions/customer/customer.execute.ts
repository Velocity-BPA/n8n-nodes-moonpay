/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { moonPayApiRequest, moonPayApiRequestAllItems } from '../../GenericFunctions';

export async function listCustomers(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const filters = this.getNodeParameter('filters', index, {}) as IDataObject;

	const query: IDataObject = {};

	if (filters.email) {
		query.email = filters.email;
	}
	if (filters.externalCustomerId) {
		query.externalCustomerId = filters.externalCustomerId;
	}

	let customers: IDataObject[];

	if (returnAll) {
		customers = await moonPayApiRequestAllItems.call(
			this,
			'GET',
			'/v1/customers',
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
			'/v1/customers',
			{},
			query,
			true,
		);
		customers = Array.isArray(response) ? response : [];
	}

	return customers.map((customer) => ({
		json: customer,
		pairedItem: { item: index },
	}));
}

export async function getCustomer(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as string;

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v1/customers/${customerId}`,
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

export async function getCustomerLimits(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const customerId = this.getNodeParameter('customerId', index) as string;

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v1/customers/${customerId}/limits`,
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

export async function checkKyc(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const walletAddress = this.getNodeParameter('walletAddress', index) as string;

	const query: IDataObject = {
		walletAddress,
	};

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		'/v3/customers/check',
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
