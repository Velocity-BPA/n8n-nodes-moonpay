/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { moonPayApiRequest } from '../../GenericFunctions';

export async function listNetworks(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const limit = this.getNodeParameter('limit', index, 50) as number;

	const response = await moonPayApiRequest.call(this, 'GET', '/v1/networks');

	let networks = Array.isArray(response) ? response : [];

	if (!returnAll) {
		networks = networks.slice(0, limit);
	}

	return networks.map((network) => ({
		json: network as IDataObject,
		pairedItem: { item: index },
	}));
}

export async function getNetworkFee(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const networkCode = this.getNodeParameter('networkCode', index) as string;

	const response = await moonPayApiRequest.call(
		this,
		'GET',
		`/v1/networks/${networkCode.toLowerCase()}/fee`,
	);

	return [
		{
			json: response as IDataObject,
			pairedItem: { item: index },
		},
	];
}
