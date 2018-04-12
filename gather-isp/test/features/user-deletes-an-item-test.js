const {assert} = require('chai');
const {createItem, buildItemObject} = require('../test-utils');

describe('User deletes an item', () => {
  it('can view the item full info', () => {
    const itemToCreate = buildItemObject();
    createItem(itemToCreate)
    browser.submitForm('.delete-button form');

    assert.notInclude(browser.getText('body'), itemToCreate.title);

  });
});
