#!/usr/bin/env node

// https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e

const fs = require('fs');
const path = require('path');
const { EOL } = require('os');
const snippetsJson = require('./snippets');

const componentName = process.argv[2];
const relativePath = process.argv[3];
const snippets = snippetsJson(componentName);

if (!componentName) {
  console.log('Missing Component name (First Arguement)');
  return;
}

if (!relativePath) {
  console.log('Missing file path (second arguement');
  return;
}

const dir = path.join(process.cwd(), relativePath, componentName);

function init() {
  const success = createFolder();
  if (!success) return;

  snippets.forEach(({ ext, content }) => addFile(ext, content));
}

function createFolder() {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);

    return true;
  } else {
    console.log(`Error - folder with name ${componentName} already exists`);
    return false;
  }
}

function addFile(extension, content) {
  const fileName = componentName + extension;

  const writer = fs.createWriteStream(`${dir}/${fileName}`);
  content.forEach((line) => writer.write(line + EOL));
  writer.close();
}

init();
