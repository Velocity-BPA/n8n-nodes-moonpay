# n8n-nodes-moonpay

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for MoonPay crypto payment infrastructure, enabling fiat-to-crypto (on-ramp) and crypto-to-fiat (off-ramp) transactions. This node provides seamless integration with MoonPay's API for managing currencies, quotes, transactions, customers, and more.

![n8n](https://img.shields.io/badge/n8n-community%20node-orange)
![MoonPay](https://img.shields.io/badge/MoonPay-API%20v1%2Fv3%2Fv4-purple)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)

## Features

- **Multi-Currency Support**: Access 100+ cryptocurrencies and multiple fiat currencies
- **Quote Management**: Get real-time quotes for buy, sell, and swap transactions
- **Transaction Tracking**: Monitor buy, sell, and swap transactions with full details
- **Customer Management**: Manage customer records and KYC verification status
- **Virtual Accounts**: Handle automated on-ramp transactions with RSA-SHA256 signing
- **Widget Integration**: Generate signed widget URLs for embedded payment flows
- **Webhook Triggers**: React to transaction events in real-time
- **Environment Support**: Seamlessly switch between sandbox and production environments

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-moonpay`
5. Accept the risks and click **Install**

### Manual Installation

```bash
npm install n8n-nodes-moonpay
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-moonpay.git
cd n8n-nodes-moonpay

# Install dependencies
npm install

# Build the project
npm run build

# Link to n8n
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-moonpay

# Restart n8n
n8n start
```

## Credentials Setup

To use this node, you need to configure MoonPay API credentials:

| Field | Description | Required |
|-------|-------------|----------|
| Environment | Select Sandbox or Production | Yes |
| Publishable API Key | Public key for client-side operations | Yes |
| Secret API Key | Secret key for server-side operations | Yes |
| Private Key (PEM) | RSA private key for Virtual Accounts API | No |

**Getting Your API Keys:**

1. Log in to your [MoonPay Dashboard](https://dashboard.moonpay.com)
2. Navigate to **Developers** > **API Keys**
3. Copy your Publishable and Secret keys
4. For Virtual Accounts, generate an RSA key pair and register the public key

## Resources & Operations

### Currency

| Operation | Description |
|-----------|-------------|
| List Cryptocurrencies | Get all supported cryptocurrencies |
| Get Cryptocurrency | Get details for a specific cryptocurrency |
| List Fiat Currencies | Get all supported fiat currencies |
| Get Currency Limits | Get transaction limits for a currency |

### Quote

| Operation | Description |
|-----------|-------------|
| Get Buy Quote | Get price quote for buying crypto |
| Get Sell Quote | Get price quote for selling crypto |
| Get Swap Quote | Get price quote for swapping crypto |

### Transaction

| Operation | Description |
|-----------|-------------|
| List Buy Transactions | List all buy transactions |
| Get Buy Transaction | Get details of a buy transaction |
| List Sell Transactions | List all sell transactions |
| Get Sell Transaction | Get details of a sell transaction |
| List Swap Transactions | List all swap transactions |
| Get Swap Transaction | Get details of a swap transaction |

### Customer

| Operation | Description |
|-----------|-------------|
| List Customers | List all customers |
| Get Customer | Get customer details |
| Get Customer Limits | Get transaction limits for a customer |
| Check KYC Status | Check KYC verification for a wallet |

### Virtual Account

| Operation | Description |
|-----------|-------------|
| Get Virtual Account | Get virtual account details |
| List Transactions | List virtual account transactions |

### Country

| Operation | Description |
|-----------|-------------|
| List Countries | List all supported countries |
| Get Country | Get country details and payment methods |
| Get IP Address Info | Get country based on IP address |

### Network

| Operation | Description |
|-----------|-------------|
| List Networks | List all blockchain networks |
| Get Network Fee | Get current network fee estimates |

### Widget URL

| Operation | Description |
|-----------|-------------|
| Generate Buy Widget URL | Create signed URL for buy widget |
| Generate Sell Widget URL | Create signed URL for sell widget |

## Trigger Node

The MoonPay Trigger node listens for webhook events:

| Event | Description |
|-------|-------------|
| transaction.created | New buy transaction initiated |
| transaction.pending | Buy transaction awaiting payment |
| transaction.completed | Buy transaction completed |
| transaction.failed | Buy transaction failed |
| sell_transaction.created | Sell transaction initiated |
| sell_transaction.waiting_for_deposit | Awaiting crypto deposit |
| sell_transaction.completed | Sell transaction completed |
| sell_transaction.failed | Sell transaction failed |
| swap.created | Swap initiated |
| swap.completed | Swap completed |
| swap.failed | Swap failed |

**Webhook Setup:**

1. Deploy your n8n workflow and copy the webhook URL
2. Go to MoonPay Dashboard > Developers > Webhooks
3. Add the webhook URL and select events

## Usage Examples

### Get a Buy Quote

```javascript
// Input parameters
{
  "resource": "quote",
  "operation": "getBuyQuote",
  "currencyCode": "btc",
  "baseCurrencyCode": "usd",
  "baseCurrencyAmount": 100
}

// Returns quote with rates, fees, and totals
```

### Generate Buy Widget URL

```javascript
// Input parameters
{
  "resource": "widget",
  "operation": "generateBuyUrl",
  "options": {
    "currencyCode": "eth",
    "baseCurrencyCode": "usd",
    "baseCurrencyAmount": 500,
    "walletAddress": "0x...",
    "externalCustomerId": "user_123"
  }
}

// Returns signed widget URL
```

### Check Customer KYC

```javascript
// Input parameters
{
  "resource": "customer",
  "operation": "checkKyc",
  "walletAddress": "0x..."
}

// Returns KYC status and verification details
```

## MoonPay Concepts

### On-Ramp (Buy)
The process of converting fiat currency (USD, EUR, etc.) to cryptocurrency. Users pay with credit cards, bank transfers, or other payment methods to receive crypto in their wallet.

### Off-Ramp (Sell)
The process of converting cryptocurrency back to fiat currency. Users send crypto to MoonPay and receive fiat in their bank account.

### Swap
Exchange one cryptocurrency for another without going through fiat currency.

### KYC (Know Your Customer)
Verification process required for transactions. MoonPay handles identity verification to comply with regulations.

### Virtual Accounts
Automated on-ramp solution where customers receive dedicated bank accounts for recurring crypto purchases.

## Supported Networks

| Network | Code | Description |
|---------|------|-------------|
| Ethereum | ethereum | Ethereum mainnet |
| Bitcoin | bitcoin | Bitcoin network |
| Polygon | polygon | Polygon/Matic network |
| Solana | solana | Solana network |
| Arbitrum | arbitrum | Arbitrum L2 |
| Optimism | optimism | Optimism L2 |
| Base | base | Base L2 |
| And many more... | | |

## Error Handling

The node handles common MoonPay API errors:

| Status | Error | Description |
|--------|-------|-------------|
| 400 | BadRequestError | Invalid parameters |
| 401 | Unauthorized | Invalid API key |
| 403 | Forbidden | IP not whitelisted |
| 404 | NotFound | Resource doesn't exist |
| 429 | RateLimited | Too many requests |

## Security Best Practices

1. **Keep Secret Keys Secure**: Never expose your secret API key in client-side code
2. **Use Environment Switching**: Test in sandbox before production
3. **Verify Webhooks**: Always verify webhook signatures
4. **IP Whitelisting**: Configure allowed IPs in MoonPay Dashboard
5. **Rotate Keys**: Regularly rotate API keys for security

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint

# Fix linting issues
npm run lint:fix

# Watch mode for development
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to the repository.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Documentation**: [MoonPay Developer Docs](https://dev.moonpay.com/)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-moonpay/issues)
- **Commercial Support**: licensing@velobpa.com

## Acknowledgments

- [MoonPay](https://www.moonpay.com/) for their comprehensive crypto payment infrastructure
- [n8n](https://n8n.io/) for the excellent workflow automation platform
