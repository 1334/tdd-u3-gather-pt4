const {assert} = require('chai');
const {createItem, buildItemObject} = require('../test-utils');

describe('User visits a single item', () => {
  it('can view the item full info', () => {
    const itemToCreate = buildItemObject();
    createItem(itemToCreate)
    browser.click('.item-card a');

    assert.include(browser.getText('body'), itemToCreate.description);

  });
});
