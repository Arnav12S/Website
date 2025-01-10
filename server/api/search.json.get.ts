import { serverQueryContent } from '#content/server'

export default eventHandler(async (event) => {
  // Query all content
  return serverQueryContent(event)
    .where({ 
      _type: 'markdown',
      navigation: { $ne: false },
      // Exclude draft content if needed
      draft: { $ne: true }
    })
    // Select only the fields we need for search
    .only([
      'title',
      'description',
      '_path',
      '_type',
      'navigation',
      // Add any other fields you want to search through
      'badge',
      'date'
    ])
    // Sort by date if available, otherwise by title
    .sort({ date: -1, title: 1 })
    .find()
})
