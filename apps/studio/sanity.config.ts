import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorInput} from '@sanity/color-input'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Administration de Proud Us Drip',

  projectId: 'y4tmnyw3',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), colorInput(), structureTool({structure})],

  schema: {
    types: schemaTypes,
  },
})
