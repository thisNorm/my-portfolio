import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { tag } from './tag'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, project, tag],
}
