/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import * as crypto from 'crypto';

export interface IMoonPayCredentials {
	environment: 'sandbox' | 'production';
	publishableKey: string;
	secretKey: string;
	privateKey?: string;
}

/**
 * Get the base URL based on the environment
 */
export function getBaseUrl(environment: string): string {
	return environment === 'production'
		? 'https://api.moonpay.com'
		: 'https://api.sandbox.moonpay.com';
}

/**
 * Get the widget base URL based on the environment
 */
export function getWidgetBaseUrl(environment: string): string {
	return environment === 'production'
		? 'https://buy.moonpay.com'
		: 'https://buy-sandbox.moonpay.com';
}

/**
 * Make an API request to MoonPay
 */
export async function moonPayApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	useSecretKey = false,
): Promise<IDataObject | IDataObject[]> {
	const credentials = (await this.getCredentials('moonPayApi')) as IMoonPayCredentials;
	const baseUrl = getBaseUrl(credentials.environment);

	const options: IRequestOptions = {
		method,
		uri: `${baseUrl}${endpoint}`,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		qs: {
			...query,
			apiKey: credentials.publishableKey,
		},
		body,
		json: true,
	};

	if (useSecretKey) {
		options.headers = {
			...options.headers,
			Authorization: `Api-Key ${credentials.secretKey}`,
		};
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	try {
		const response = await this.helpers.request(options);
		return response as IDataObject | IDataObject[];
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make a signed API request to MoonPay (for Virtual Accounts API)
 */
export async function moonPaySignedRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	query: IDataObject = {},
): Promise<IDataObject | IDataObject[]> {
	const credentials = (await this.getCredentials('moonPayApi')) as IMoonPayCredentials;
	const privateKey = credentials.privateKey;

	if (!privateKey) {
		throw new NodeApiError(this.getNode(), {
			message: 'Private key is required for Virtual Accounts API operations',
		} as JsonObject);
	}

	const baseUrl = getBaseUrl(credentials.environment);
	const timestamp = Date.now();

	const queryParams = new URLSearchParams({
		...(query as Record<string, string>),
		apiKey: credentials.publishableKey,
		timestamp: timestamp.toString(),
	});

	const queryString = queryParams.toString();
	const payload = `${endpoint}?${queryString}`;

	// Create RSA-SHA256 signature
	const sign = crypto.createSign('SHA256');
	sign.update(payload);
	const signature = sign.sign(privateKey, 'base64');

	const options: IRequestOptions = {
		method,
		uri: `${baseUrl}${payload}`,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'x-signature': signature,
		},
		json: true,
	};

	try {
		const response = await this.helpers.request(options);
		return response as IDataObject | IDataObject[];
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an API request with pagination support
 */
export async function moonPayApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	useSecretKey = false,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let responseData: IDataObject[];

	query.limit = query.limit || 50;
	query.offset = 0;

	do {
		const response = await moonPayApiRequest.call(this, method, endpoint, body, query, useSecretKey);
		responseData = Array.isArray(response) ? response : [response];
		returnData.push(...responseData);
		query.offset = (query.offset as number) + responseData.length;
	} while (responseData.length === query.limit);

	return returnData;
}

/**
 * Generate a signed widget URL
 */
export function generateWidgetUrl(
	credentials: IMoonPayCredentials,
	_flow: 'buy' | 'sell',
	params: Record<string, string>,
): string {
	const baseUrl = getWidgetBaseUrl(credentials.environment);

	// Build query string
	const queryParams = new URLSearchParams({
		apiKey: credentials.publishableKey,
		...params,
	});

	const urlWithParams = `${baseUrl}?${queryParams.toString()}`;

	// Create HMAC-SHA256 signature of the query string
	const urlObj = new URL(urlWithParams);
	const signature = crypto
		.createHmac('sha256', credentials.secretKey)
		.update(urlObj.search)
		.digest('base64');

	return `${urlWithParams}&signature=${encodeURIComponent(signature)}`;
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
	body: string,
	signature: string,
	secretKey: string,
): boolean {
	const expectedSignature = crypto
		.createHmac('sha256', secretKey)
		.update(body)
		.digest('base64');

	return crypto.timingSafeEqual(
		Buffer.from(signature),
		Buffer.from(expectedSignature),
	);
}

/**
 * Handle MoonPay API errors
 */
export function handleMoonPayError(error: JsonObject): never {
	const errorType = (error.type as string) || 'UnknownError';
	const errorMessage = (error.message as string) || 'An unknown error occurred';
	const errors = error.errors as Array<{ field: string; message: string }> | undefined;

	let detailedMessage = `${errorType}: ${errorMessage}`;

	if (errors && errors.length > 0) {
		const fieldErrors = errors.map((e) => `${e.field}: ${e.message}`).join(', ');
		detailedMessage += ` (${fieldErrors})`;
	}

	throw new Error(detailedMessage);
}
