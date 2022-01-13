const { kebabCase } = require('./utils');

module.exports = (componentName) => [
  {
    ext: '.ts',
    content: [
      "import { Component, Vue } from 'vue-property-decorator';",
      '',
      '@Component',
      `export default class ${componentName} extends Vue {`,
      '}',
    ],
  },
  {
    ext: '.vue',
    content: [
      '<template>',
      '<div>',
      '</div>',
      '</template>',
      '',
      `<script lang=\"ts\" src=\"./${componentName}.ts\"></script>`,
      '',
      `<style lang=\"scss\" src=\"./${componentName}.scss\" scoped></style>`,
    ],
  },
  {
    ext: '.scss',
    content: [`.${kebabCase(componentName)} {`, '}'],
  },
];
