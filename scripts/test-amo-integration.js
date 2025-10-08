/**
 * Test script for AmoCRM integration
 * Run with: node scripts/test-amo-integration.js
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function testAmoCRMIntegration() {
  console.log('🧪 Testing AmoCRM Integration...\n');

  // Test 1: OAuth callback endpoint
  console.log('1. Testing OAuth callback endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/amo/oauth-callback?code=test_code&state=test_state`);
    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 2: Create lead endpoint
  console.log('2. Testing create lead endpoint...');
  try {
    const leadData = {
      email: 'test@example.com',
      name: 'Test User',
      phone: '+1234567890',
      bouquetCategory: 'Romantic',
      deliveryAddress: '123 Test Street',
      deliveryDate: '2024-12-25',
      deliveryInterval: 'Weekly',
      bouquetWishes: 'Red roses preferred',
      accountSum: 5000,
      referralLink: 'https://example.com/ref/test123'
    };

    const response = await fetch(`${BASE_URL}/api/amo/create-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 3: Get lead endpoint
  console.log('3. Testing get lead endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/amo/get-lead?email=test@example.com`);
    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 4: Create contact endpoint
  console.log('4. Testing create contact endpoint...');
  try {
    const contactData = {
      email: 'contact@example.com',
      name: 'Contact User',
      phone: '+1234567890',
      bouquetCategory: 'Seasonal',
      deliveryAddress: '456 Contact Avenue',
      referralLink: 'https://example.com/ref/contact123'
    };

    const response = await fetch(`${BASE_URL}/api/amo/create-contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }

  // Test 5: Webhook endpoint
  console.log('5. Testing webhook endpoint...');
  try {
    const webhookData = {
      leads: {
        update: [{
          id: 123,
          name: 'Updated Test Lead',
          custom_fields_values: [
            {
              field_name: 'Account Sum',
              values: [{ value: '6000' }]
            }
          ]
        }]
      }
    };

    const response = await fetch(`${BASE_URL}/api/webhooks/amo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }

  console.log('✅ AmoCRM integration tests completed!');
  console.log('\n📝 Notes:');
  console.log('- Some tests may fail if AmoCRM is not configured');
  console.log('- Check environment variables and AmoCRM setup');
  console.log('- See docs/amo-setup.md for configuration guide');
}

// Run tests
testAmoCRMIntegration().catch(console.error);
