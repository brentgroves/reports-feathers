const assert = require('assert');
const app = require('../../src/app');

describe('\'azure-auth\' service', () => {
  it('registered the service', () => {
    const service = app.service('azure-auth');

    assert.ok(service, 'Registered the service');
  });
});
