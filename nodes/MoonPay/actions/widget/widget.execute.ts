/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { generateWidgetUrl, IMoonPayCredentials } from '../../GenericFunctions';

export async function generateBuyUrl(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = (await this.getCredentials('moonPayApi')) as IMoonPayCredentials;
	const options = this.getNodeParameter('options', index, {}) as IDataObject;

	const params: Record<string, string> = {};

	// Add all provided options to params
	if (options.currencyCode) {
		params.currencyCode = (options.currencyCode as string).toLowerCase();
	}
	if (options.walletAddress) {
		params.walletAddress = options.walletAddress as string;
	}
	if (options.baseCurrencyCode) {
		params.baseCurrencyCode = (options.baseCurrencyCode as string).toLowerCase();
	}
	if (options.baseCurrencyAmount && (options.baseCurrencyAmount as number) > 0) {
		params.baseCurrencyAmount = String(options.baseCurrencyAmount);
	}
	if (options.email) {
		params.email = options.email as string;
	}
	if (options.externalTransactionId) {
		params.externalTransactionId = options.externalTransactionId as string;
	}
	if (options.externalCustomerId) {
		params.externalCustomerId = options.externalCustomerId as string;
	}
	if (options.paymentMethod) {
		params.paymentMethod = options.paymentMethod as string;
	}
	if (options.lockAmount !== undefined) {
		params.lockAmount = String(options.lockAmount);
	}
	if (options.showWalletAddressForm !== undefined) {
		params.showWalletAddressForm = String(options.showWalletAddressForm);
	}
	if (options.colorCode) {
		params.colorCode = (options.colorCode as string).replace('#', '');
	}
	if (options.theme) {
		params.theme = options.theme as string;
	}
	if (options.language) {
		params.language = options.language as string;
	}
	if (options.redirectURL) {
		params.redirectURL = options.redirectURL as string;
	}

	const widgetUrl = generateWidgetUrl(credentials, 'buy', params);

	return [
		{
			json: {
				url: widgetUrl,
				flow: 'buy',
				environment: credentials.environment,
				parameters: params,
			},
			pairedItem: { item: index },
		},
	];
}

export async function generateSellUrl(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = (await this.getCredentials('moonPayApi')) as IMoonPayCredentials;
	const options = this.getNodeParameter('options', index, {}) as IDataObject;

	const params: Record<string, string> = {
		flow: 'sell',
	};

	// Add all provided options to params
	if (options.baseCurrencyCode) {
		params.baseCurrencyCode = (options.baseCurrencyCode as string).toLowerCase();
	}
	if (options.quoteCurrencyCode) {
		params.quoteCurrencyCode = (options.quoteCurrencyCode as string).toLowerCase();
	}
	if (options.baseCurrencyAmount && (options.baseCurrencyAmount as number) > 0) {
		params.baseCurrencyAmount = String(options.baseCurrencyAmount);
	}
	if (options.refundWalletAddress) {
		params.refundWalletAddress = options.refundWalletAddress as string;
	}
	if (options.externalTransactionId) {
		params.externalTransactionId = options.externalTransactionId as string;
	}
	if (options.externalCustomerId) {
		params.externalCustomerId = options.externalCustomerId as string;
	}
	if (options.email) {
		params.email = options.email as string;
	}
	if (options.colorCode) {
		params.colorCode = (options.colorCode as string).replace('#', '');
	}
	if (options.theme) {
		params.theme = options.theme as string;
	}
	if (options.language) {
		params.language = options.language as string;
	}
	if (options.redirectURL) {
		params.redirectURL = options.redirectURL as string;
	}

	const widgetUrl = generateWidgetUrl(credentials, 'sell', params);

	return [
		{
			json: {
				url: widgetUrl,
				flow: 'sell',
				environment: credentials.environment,
				parameters: params,
			},
			pairedItem: { item: index },
		},
	];
}
