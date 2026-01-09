/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import {
	resourceOptions,
	currencyOperations,
	quoteOperations,
	transactionOperations,
	customerOperations,
	virtualAccountOperations,
	countryOperations,
	networkOperations,
	widgetOperations,
} from './constants/resources';

import { currencyFields } from './actions/currency';
import { quoteFields } from './actions/quote';
import { transactionFields } from './actions/transaction';
import { customerFields } from './actions/customer';
import { virtualAccountFields } from './actions/virtualAccount';
import { countryFields } from './actions/country';
import { networkFields } from './actions/network';
import { widgetFields } from './actions/widget';

import * as currency from './actions/currency/currency.execute';
import * as quote from './actions/quote/quote.execute';
import * as transaction from './actions/transaction/transaction.execute';
import * as customer from './actions/customer/customer.execute';
import * as virtualAccount from './actions/virtualAccount/virtualAccount.execute';
import * as country from './actions/country/country.execute';
import * as network from './actions/network/network.execute';
import * as widget from './actions/widget/widget.execute';

export class MoonPay implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MoonPay',
		name: 'moonPay',
		icon: 'file:moonpay.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with MoonPay crypto payment infrastructure API',
		defaults: {
			name: 'MoonPay',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'moonPayApi',
				required: true,
			},
		],
		properties: [
			resourceOptions,
			// Operations
			currencyOperations,
			quoteOperations,
			transactionOperations,
			customerOperations,
			virtualAccountOperations,
			countryOperations,
			networkOperations,
			widgetOperations,
			// Fields
			...currencyFields,
			...quoteFields,
			...transactionFields,
			...customerFields,
			...virtualAccountFields,
			...countryFields,
			...networkFields,
			...widgetFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Log licensing notice once per execution
		this.logger.warn(
			'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.',
		);

		for (let i = 0; i < items.length; i++) {
			try {
				let result: INodeExecutionData[] = [];

				switch (resource) {
					case 'currency':
						switch (operation) {
							case 'listCrypto':
								result = await currency.listCrypto.call(this, i);
								break;
							case 'getCrypto':
								result = await currency.getCrypto.call(this, i);
								break;
							case 'listFiat':
								result = await currency.listFiat.call(this, i);
								break;
							case 'getLimits':
								result = await currency.getLimits.call(this, i);
								break;
							default:
								throw new NodeOperationError(
									this.getNode(),
									`Unknown operation: ${operation}`,
									{ itemIndex: i },
								);
						}
						break;

					case 'quote':
						switch (operation) {
							case 'getBuyQuote':
								result = await quote.getBuyQuote.call(this, i);
								break;
							case 'getSellQuote':
								result = await quote.getSellQuote.call(this, i);
								break;
							case 'getSwapQuote':
								result = await quote.getSwapQuote.call(this, i);
								break;
							default:
								throw new NodeOperationError(
									this.getNode(),
									`Unknown operation: ${operation}`,
									{ itemIndex: i },
								);
						}
						break;

					case 'transaction':
						switch (operation) {
							case 'listBuy':
								result = await transaction.listBuy.call(this, i);
								break;
							case 'getBuy':
								result = await transaction.getBuy.call(this, i);
								break;
							case 'listSell':
								result = await transaction.listSell.call(this, i);
								break;
							case 'getSell':
								result = await transaction.getSell.call(this, i);
								break;
							case 'listSwap':
								result = await transaction.listSwap.call(this, i);
								break;
							case 'getSwap':
								result = await transaction.getSwap.call(this, i);
								break;
							default:
								throw new NodeOperationError(
									this.getNode(),
									`Unknown operation: ${operation}`,
									{ itemIndex: i },
								);
						}
						break;

					case 'customer':
						switch (operation) {
							case 'list':
								result = await customer.listCustomers.call(this, i);
								break;
							case 'get':
								result = await customer.getCustomer.call(this, i);
								break;
							case 'getLimits':
								result = await customer.getCustomerLimits.call(this, i);
								break;
							case 'checkKyc':
								result = await customer.checkKyc.call(this, i);
								break;
							default:
								throw new NodeOperationError(
									this.getNode(),
									`Unknown operation: ${operation}`,
									{ itemIndex: i },
								);
						}
						break;

					case 'virtualAccount':
						switch (operation) {
							case 'get':
								result = await virtualAccount.getVirtualAccount.call(this, i);
								break;
							case 'listTransactions':
								result = await virtualAccount.listVirtualAccountTransactions.call(this, i);
								break;
							default:
								throw new NodeOperationError(
									this.getNode(),
									`Unknown operation: ${operation}`,
									{ itemIndex: i },
								);
						}
						break;

					case 'country':
						switch (operation) {
							case 'list':
								result = await country.listCountries.call(this, i);
								break;
							case 'get':
								result = await country.getCountry.call(this, i);
								break;
							case 'getIpAddress':
								result = await country.getIpAddress.call(this, i);
								break;
							default:
								throw new NodeOperationError(
									this.getNode(),
									`Unknown operation: ${operation}`,
									{ itemIndex: i },
								);
						}
						break;

					case 'network':
						switch (operation) {
							case 'list':
								result = await network.listNetworks.call(this, i);
								break;
							case 'getFee':
								result = await network.getNetworkFee.call(this, i);
								break;
							default:
								throw new NodeOperationError(
									this.getNode(),
									`Unknown operation: ${operation}`,
									{ itemIndex: i },
								);
						}
						break;

					case 'widget':
						switch (operation) {
							case 'generateBuyUrl':
								result = await widget.generateBuyUrl.call(this, i);
								break;
							case 'generateSellUrl':
								result = await widget.generateSellUrl.call(this, i);
								break;
							default:
								throw new NodeOperationError(
									this.getNode(),
									`Unknown operation: ${operation}`,
									{ itemIndex: i },
								);
						}
						break;

					default:
						throw new NodeOperationError(
							this.getNode(),
							`Unknown resource: ${resource}`,
							{ itemIndex: i },
						);
				}

				returnData.push(...result);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
