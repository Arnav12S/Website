import { serverQueryContent } from '#content/server'

export default eventHandler(async (event) => {
  const content = await serverQueryContent(event)
    .where({
      _type: { $in: ['markdown', 'json'] },
      navigation: { $ne: false }
    })
    .find()

  // Enhance the search content for CV
  const enhancedContent = content.map(item => {
    if (item._path === '/cv') {
      // Combine all relevant fields into a single searchable string
      const searchableContent = [
        item.title,
        item.description,
        item.summary,
        ...item.experience.flatMap(exp => [
          exp.title,
          exp.company,
          exp.duration,
          exp.location,
          ...exp.details
        ]),
        ...item.education.flatMap(edu => [
          edu.degree,
          edu.institution,
          edu.location,
          edu.year
        ]),
        ...item.skills
      ].join(' ').toLowerCase() // Convert to lowercase for case-insensitive search

      return {
        ...item,
        _searchContent: searchableContent
      }
    }
    return item
  })

  return enhancedContent
})
