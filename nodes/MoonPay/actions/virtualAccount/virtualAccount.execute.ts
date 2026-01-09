/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { moonPaySignedRequest } from '../../GenericFunctions';

export async function getVirtualAccount(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const filterBy = this.getNodeParameter('filterBy', index) as string;
	
	const query: IDataObject = {};

	if (filterBy === 'virtualAccountId') {
		query.virtualAccountId = this.getNodeParameter('virtualAccountId', index) as string;
	} else {
		query.externalCustomerId = this.getNodeParameter('externalCustomerId', index) as string;
	}

	const response = await moonPaySignedRequest.call(
		this,
		'GET',
		'/v1/virtual-accounts',
		query,
	);

	return [
		{
			json: response as IDataObject,
			pairedItem: { item: index },
		},
	];
}

export async function listVirtualAccountTransactions(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const virtualAccountId = this.getNodeParameter('virtualAccountId', index) as string;
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;

	const transactions: IDataObject[] = [];
	let nextCursor: string | undefined;

	do {
		const query: IDataObject = {
			virtualAccountId,
		};

		if (!returnAll) {
			query.pageSize = this.getNodeParameter('pageSize', index, 50) as number;
		} else {
			query.pageSize = 100;
		}

		if (nextCursor) {
			query.nextCursor = nextCursor;
		}

		const response = await moonPaySignedRequest.call(
			this,
			'GET',
			'/v1/virtual-accounts/transactions/onramp',
			query,
		);

		const responseData = response as IDataObject;
		const items = (responseData.data as IDataObject[]) || [];
		transactions.push(...items);

		nextCursor = responseData.nextCursor as string | undefined;

		if (!returnAll) {
			break;
		}
	} while (nextCursor);

	return transactions.map((transaction) => ({
		json: transaction,
		pairedItem: { item: index },
	}));
}
