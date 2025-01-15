import { serverQueryContent } from '#content/server'

export default eventHandler(async (event) => {
  const [projects, blogs] = await Promise.all([
    // Get project overviews
    serverQueryContent(event, 'projects')
      .where({ 
        _extension: 'md',
        _path: /\/overview$/
      })
      .find(),
    
    // Get blog posts
    serverQueryContent(event, 'blog')
      .where({ 
        _extension: 'md'
      })
      .find()
  ])

  // Transform project data to include full content but only expose overview paths
  const searchableProjects = projects.map(project => ({
    ...project,
    searchContent: project.body?.text, // Include full text for search
    _path: project._path.replace('/overview', ''), // Clean up path
    _type: 'project'
  }))

  const searchableBlogs = blogs.map(blog => ({
    ...blog,
    searchContent: blog.body?.text,
    _type: 'blog'
  }))

  return [...searchableProjects, ...searchableBlogs]
})
