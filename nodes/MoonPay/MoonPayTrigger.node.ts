/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { verifyWebhookSignature, IMoonPayCredentials } from './GenericFunctions';

export class MoonPayTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MoonPay Trigger',
		name: 'moonPayTrigger',
		icon: 'file:moonpay.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Starts the workflow when MoonPay events occur',
		defaults: {
			name: 'MoonPay Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'moonPayApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
						name: 'Buy Transaction - Completed',
						value: 'transaction.completed',
						description: 'Triggered when a buy transaction is completed',
					},
					{
						name: 'Buy Transaction - Created',
						value: 'transaction.created',
						description: 'Triggered when a new buy transaction is initiated',
					},
					{
						name: 'Buy Transaction - Failed',
						value: 'transaction.failed',
						description: 'Triggered when a buy transaction fails',
					},
					{
						name: 'Buy Transaction - Pending',
						value: 'transaction.pending',
						description: 'Triggered when a buy transaction is awaiting payment',
					},
					{
						name: 'Sell Transaction - Completed',
						value: 'sell_transaction.completed',
						description: 'Triggered when a sell transaction is completed',
					},
					{
						name: 'Sell Transaction - Created',
						value: 'sell_transaction.created',
						description: 'Triggered when a sell transaction is initiated',
					},
					{
						name: 'Sell Transaction - Failed',
						value: 'sell_transaction.failed',
						description: 'Triggered when a sell transaction fails',
					},
					{
						name: 'Sell Transaction - Waiting for Deposit',
						value: 'sell_transaction.waiting_for_deposit',
						description: 'Triggered when awaiting crypto deposit for sell',
					},
					{
						name: 'Swap - Completed',
						value: 'swap.completed',
						description: 'Triggered when a swap is completed',
					},
					{
						name: 'Swap - Created',
						value: 'swap.created',
						description: 'Triggered when a swap is initiated',
					},
					{
						name: 'Swap - Failed',
						value: 'swap.failed',
						description: 'Triggered when a swap fails',
					},
				],
				description: 'The events to listen to',
			},
			{
				displayName: 'Verify Signature',
				name: 'verifySignature',
				type: 'boolean',
				default: true,
				description: 'Whether to verify the webhook signature using your secret key',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// MoonPay webhooks are configured in the dashboard
				// We can't programmatically check if they exist
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// Log webhook URL for manual configuration
				const webhookUrl = this.getNodeWebhookUrl('default');
				this.logger.info(
					`MoonPay Trigger: Configure this webhook URL in your MoonPay Dashboard: ${webhookUrl}`,
				);
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// Webhooks must be manually removed from MoonPay dashboard
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = this.getBodyData() as IDataObject;
		const events = this.getNodeParameter('events') as string[];
		const verifySignature = this.getNodeParameter('verifySignature') as boolean;

		// Log licensing notice
		this.logger.warn(
			'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.',
		);

		// Verify webhook signature if enabled
		if (verifySignature) {
			const credentials = (await this.getCredentials('moonPayApi')) as IMoonPayCredentials;
			const signature = req.headers['moonpay-signature'] as string;

			if (!signature) {
				throw new NodeOperationError(
					this.getNode(),
					'Missing MoonPay-Signature header',
				);
			}

			const rawBody = JSON.stringify(body);
			const isValid = verifyWebhookSignature(rawBody, signature, credentials.secretKey);

			if (!isValid) {
				throw new NodeOperationError(
					this.getNode(),
					'Invalid webhook signature',
				);
			}
		}

		// Extract event type from the webhook payload
		const eventType = body.type as string;

		// Check if this event is one we're listening for
		if (!eventType || !events.includes(eventType)) {
			return {
				noWebhookResponse: true,
			};
		}

		// Return the webhook data
		return {
			workflowData: [
				this.helpers.returnJsonArray([
					{
						event: eventType,
						data: body.data || body,
						timestamp: new Date().toISOString(),
					},
				]),
			],
		};
	}
}
