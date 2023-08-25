import { createEnvTestSdk } from './common/create-env-test-skd';

describe('Test Authenticator', () => {
  const { sdk, address } = createEnvTestSdk();

  it('Test  Blur Authenticator', async () => {
    const blurAuth = await sdk.utils.blurAuthenticator.authorize({ address });
    expect(typeof blurAuth).toBe('string');
  });

  it('Test X2Y2 Authenticator', async () => {
    const response = await sdk.utils.x2y2Authenticator.authorize({ address });

    expect(response).toHaveProperty('message');
    expect(typeof response.message).toBe('string');
    expect(response).toHaveProperty('signature');
    expect(typeof response.signature).toHaveProperty('signature');
  });
});
