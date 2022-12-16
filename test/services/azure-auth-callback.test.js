const assert = require('assert');
const app = require('../../src/app');

describe('\'azure-auth-callback\' service', () => {
  it('registered the service', () => {
    const service = app.service('azure-auth/callback');

    assert.ok(service, 'Registered the service');
  });
});
