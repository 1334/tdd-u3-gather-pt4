const {jsdom} = require('jsdom');

const Item = require('../models/item');

// Create and return a sample Item object
const buildItemObject = (options = {}) => {
  const title = options.title || 'My favorite item';
  const imageUrl = options.imageUrl || 'http://placebear.com/g/200/300';
  const description = options.description || 'Just the best item';
  return {title, imageUrl, description};
};

// Add a sample Item object to mongodb
const seedItemToDatabase = async (options = {}) => {
  const item = await Item.create(buildItemObject(options));
  return item;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

const createItem = (item) => {
  browser.url('/items/create');
  browser.setValue('#title-input', item.title);
  browser.setValue('#description-input', item.description);
  browser.setValue('#imageUrl-input', item.imageUrl);
  browser.click('#submit-button');
};

module.exports = {
  createItem,
  buildItemObject,
  seedItemToDatabase,
  parseTextFromHTML,
};
