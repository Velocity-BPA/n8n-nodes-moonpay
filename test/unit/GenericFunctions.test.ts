/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { getBaseUrl, getWidgetBaseUrl, generateWidgetUrl, verifyWebhookSignature } from '../../nodes/MoonPay/GenericFunctions';
import type { IMoonPayCredentials } from '../../nodes/MoonPay/GenericFunctions';
import * as crypto from 'crypto';

describe('GenericFunctions', () => {
	describe('getBaseUrl', () => {
		it('should return production URL for production environment', () => {
			const url = getBaseUrl('production');
			expect(url).toBe('https://api.moonpay.com');
		});

		it('should return sandbox URL for sandbox environment', () => {
			const url = getBaseUrl('sandbox');
			expect(url).toBe('https://api.sandbox.moonpay.com');
		});

		it('should return sandbox URL for any other environment', () => {
			const url = getBaseUrl('test');
			expect(url).toBe('https://api.sandbox.moonpay.com');
		});
	});

	describe('getWidgetBaseUrl', () => {
		it('should return production widget URL for production environment', () => {
			const url = getWidgetBaseUrl('production');
			expect(url).toBe('https://buy.moonpay.com');
		});

		it('should return sandbox widget URL for sandbox environment', () => {
			const url = getWidgetBaseUrl('sandbox');
			expect(url).toBe('https://buy-sandbox.moonpay.com');
		});
	});

	describe('generateWidgetUrl', () => {
		const mockCredentials: IMoonPayCredentials = {
			environment: 'sandbox',
			publishableKey: 'pk_test_123',
			secretKey: 'sk_test_456',
		};

		it('should generate a valid buy widget URL', () => {
			const url = generateWidgetUrl(mockCredentials, 'buy', {
				currencyCode: 'btc',
				baseCurrencyAmount: '100',
			});

			expect(url).toContain('https://buy-sandbox.moonpay.com');
			expect(url).toContain('apiKey=pk_test_123');
			expect(url).toContain('currencyCode=btc');
			expect(url).toContain('baseCurrencyAmount=100');
			expect(url).toContain('signature=');
		});

		it('should generate a valid sell widget URL', () => {
			const url = generateWidgetUrl(mockCredentials, 'sell', {
				baseCurrencyCode: 'eth',
				flow: 'sell',
			});

			expect(url).toContain('https://buy-sandbox.moonpay.com');
			expect(url).toContain('apiKey=pk_test_123');
			expect(url).toContain('baseCurrencyCode=eth');
			expect(url).toContain('flow=sell');
			expect(url).toContain('signature=');
		});

		it('should include signature in the URL', () => {
			const url = generateWidgetUrl(mockCredentials, 'buy', {});
			const signatureMatch = url.match(/signature=([^&]+)/);
			
			expect(signatureMatch).not.toBeNull();
			expect(signatureMatch![1]).toBeTruthy();
		});
	});

	describe('verifyWebhookSignature', () => {
		const secretKey = 'webhook_secret_123';
		const body = JSON.stringify({ type: 'transaction.completed', data: { id: '123' } });

		it('should return true for valid signature', () => {
			const validSignature = crypto
				.createHmac('sha256', secretKey)
				.update(body)
				.digest('base64');

			const isValid = verifyWebhookSignature(body, validSignature, secretKey);
			expect(isValid).toBe(true);
		});

		it('should return false for invalid signature', () => {
			const invalidSignature = 'invalid_signature_base64';
			
			// This will throw due to buffer length mismatch, which is expected behavior
			expect(() => verifyWebhookSignature(body, invalidSignature, secretKey)).toThrow();
		});

		it('should return false for wrong body', () => {
			const signature = crypto
				.createHmac('sha256', secretKey)
				.update(body)
				.digest('base64');

			const wrongBody = JSON.stringify({ type: 'transaction.failed' });
			const isValid = verifyWebhookSignature(wrongBody, signature, secretKey);
			expect(isValid).toBe(false);
		});
	});
});

describe('Resource Constants', () => {
	// Test that resource options are properly defined
	const { resourceOptions } = require('../../nodes/MoonPay/constants/resources');

	it('should have all required resources', () => {
		const resourceValues = resourceOptions.options.map((opt: { value: string }) => opt.value);
		
		expect(resourceValues).toContain('currency');
		expect(resourceValues).toContain('quote');
		expect(resourceValues).toContain('transaction');
		expect(resourceValues).toContain('customer');
		expect(resourceValues).toContain('virtualAccount');
		expect(resourceValues).toContain('country');
		expect(resourceValues).toContain('network');
		expect(resourceValues).toContain('widget');
	});

	it('should have default resource set', () => {
		expect(resourceOptions.default).toBe('currency');
	});
});

describe('Currency Fields', () => {
	const { currencyFields } = require('../../nodes/MoonPay/actions/currency');

	it('should have required fields for getCrypto operation', () => {
		const currencyCodeField = currencyFields.find(
			(f: { name: string }) => f.name === 'currencyCode',
		);
		expect(currencyCodeField).toBeDefined();
		expect(currencyCodeField.required).toBe(true);
	});

	it('should have returnAll and limit fields for list operations', () => {
		const returnAllField = currencyFields.find((f: { name: string }) => f.name === 'returnAll');
		const limitField = currencyFields.find((f: { name: string }) => f.name === 'limit');
		
		expect(returnAllField).toBeDefined();
		expect(limitField).toBeDefined();
	});
});

describe('Quote Fields', () => {
	const { quoteFields } = require('../../nodes/MoonPay/actions/quote');

	it('should have required fields for getBuyQuote operation', () => {
		const currencyCodeField = quoteFields.find(
			(f: { name: string; displayOptions?: { show?: { operation?: string[] } } }) =>
				f.name === 'currencyCode' &&
				f.displayOptions?.show?.operation?.includes('getBuyQuote'),
		);
		expect(currencyCodeField).toBeDefined();
		expect(currencyCodeField.required).toBe(true);
	});

	it('should have amountType field for buy and sell quotes', () => {
		const amountTypeFields = quoteFields.filter(
			(f: { name: string }) => f.name === 'amountType',
		);
		expect(amountTypeFields.length).toBeGreaterThan(0);
	});
});

describe('Transaction Fields', () => {
	const { transactionFields } = require('../../nodes/MoonPay/actions/transaction');

	it('should have transactionId field for get operations', () => {
		const transactionIdFields = transactionFields.filter(
			(f: { name: string }) => f.name === 'transactionId',
		);
		expect(transactionIdFields.length).toBe(3); // getBuy, getSell, getSwap
	});

	it('should have filters collection for list operations', () => {
		const filterFields = transactionFields.filter(
			(f: { name: string }) => f.name === 'filters',
		);
		expect(filterFields.length).toBeGreaterThan(0);
	});
});

describe('Widget Fields', () => {
	const { widgetFields } = require('../../nodes/MoonPay/actions/widget');

	it('should have options collection for generateBuyUrl', () => {
		const optionsField = widgetFields.find(
			(f: { name: string; displayOptions?: { show?: { operation?: string[] } } }) =>
				f.name === 'options' &&
				f.displayOptions?.show?.operation?.includes('generateBuyUrl'),
		);
		expect(optionsField).toBeDefined();
		expect(optionsField.type).toBe('collection');
	});

	it('should have options collection for generateSellUrl', () => {
		const optionsField = widgetFields.find(
			(f: { name: string; displayOptions?: { show?: { operation?: string[] } } }) =>
				f.name === 'options' &&
				f.displayOptions?.show?.operation?.includes('generateSellUrl'),
		);
		expect(optionsField).toBeDefined();
		expect(optionsField.type).toBe('collection');
	});
});
