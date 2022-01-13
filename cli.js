#!/usr/bin/env node

// https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
const fs = require('fs')
const path = require('path');

const componentName = process.argv[2]
const relativePath = process.argv[3]

if (!componentName) {
  console.log('Missing Component name (First Arguement)')
  return
}

if (!relativePath) {
  console.log('Missing file path (second arguement')
  return
}

const dir = path.join(process.cwd(), relativePath, componentName)

const files = [
  { 
    ext: '.ts',
    content: [
      "import { Component, Vue } from 'vue-property-decorator'",
      "",
      "@Component",
      `export default class ${componentName} extends Vue {`,
      "}",
    ]
  }, 
  { 
    ext: '.vue',
    content: [
      "<template>",
      "<div>",
      "</div>",
      "</template>",
      "",
      `<script lang=\"ts\" src=\"./${componentName}.ts\"></script>`,
      "",
      `<style lang=\"scss\" src=\"./${componentName}.scss\" scoped></style>`
    ]
  }, 
  { 
    ext: '.scss',
    content: [
      `.${kebabCase(componentName)} {`,
      "}"
    ]
  }, 
]

function init() {
  const success = createFolder()
  if (!success) return

  files.forEach(({ext, content}) => addFile(ext, content))
}

function createFolder() {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);

    return true
  } else {
    console.log(`Error - folder with name ${componentName} already exists`)
    return false
  }
}

function addFile(extension, content) {
  const fileName = componentName + extension 

  const writer = fs.createWriteStream(`${dir}/${fileName}`)
  content.forEach(line => writer.write(line + '\n'))
  writer.close()
}

function kebabCase (str) {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter;
  }).join('');
}

init()