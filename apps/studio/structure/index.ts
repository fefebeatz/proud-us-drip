import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('slider').title('Bannière'),
      S.documentTypeListItem('category').title('Catégories'),
      S.documentTypeListItem('product').title('Articles'),
    ])
