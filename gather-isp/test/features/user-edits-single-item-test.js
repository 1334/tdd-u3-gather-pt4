const {assert} = require('chai');
const {createItem, buildItemObject} = require('../test-utils');

describe('User edits a single item', () => {
  it('can view the item full info', () => {
    const itemToCreate = buildItemObject( { title: 'Some Title' } );
    const newTitle = 'New Title';
    createItem(itemToCreate)
    browser.click('.item-card a');
    // on the show page
    browser.click('a .update-button');
    // on the update page
    browser.setValue('#title-input', newTitle);
    browser.click('#submit-button');

    assert.include(browser.getText('body'), newTitle);
  });
});
