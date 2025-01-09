<template>
    <NuxtLayout name="default">
        <UContainer>
        <div class="max-w-3xl mx-auto mt-24 mb-16">
            <div data-aos="fade-in">
            <h1 class="text-4xl font-bold text-primary mb-2">arnav sudhansh</h1>
            <div class="mb-4">
                <h2 class="text-xl text-neutral">
                strategist · developer · problem solver
                </h2>
            </div>
            
            <p class="text-neutral mb-8">
                I dabble in everything, but I'm no dabbler—I get things done. Great at
                solving problems and crunching numbers, but terrible at remembering
                where I put my keys. My experience spans from strategic planning to
                data analysis, with a bit of coding magic sprinkled in.
            </p>
            
            <p class="text-neutral mb-12">
                I'm always on the lookout for opportunities where my strategic mind
                can shine, where I can put my skills to work, occasionally dodge too
                many meetings, and still make it to bed by 10 PM. I'm a team player,
                ready to dive in and help out—just don't ask me to organize the office
                potluck.
            </p>
            
            <p class="text-primary font-medium mb-8">what i'm up to</p>
            </div>
    
            <div class="space-y-2">
              <NuxtLink
                v-for="page in pages"
                :key="page.title"
                :to="page.to"
                data-aos="fade-up"
                class="block p-4 -mx-4 transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:translate-y-[-2px] rounded-lg"
              >
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-medium text-primary">{{ page.title }}</h3>
                  <p class="text-neutral">{{ page.desc }}</p>
                </div>
              </NuxtLink>
            </div>
    
            <div class="flex justify-center mt-24 mb-16">
            <img
                draggable="false"
                loading="lazy"
                src="/polaroid.png"
                alt="me irl (fr)"
                class="w-64 rounded-lg"
            />
            </div>
        </div>
        </UContainer>
    </NuxtLayout>
  </template>
  
  <script setup>
  
  const pages = [
    {
      title: 'Projects',
      to: '/projects',
      desc: 'Showcasing my latest work.'
    },
    {
      title: 'Resume',
      to: '/cv',
      desc: 'A more serious look at what I do.'
    },
    {
      title: 'Explore',
      to: '/explore',
      desc: 'Dive into the many facets of my personal life'
    },
    {
      title: 'Blog',
      to: '/blog',
      desc: 'My thoughts, experiments, and random musings.'
    },
    {
      title: 'Contact',
      to: '/contact',
      desc: "Let's chat about how I can help you solve your next big challenge."
    }
  ]
  
  const calculateAge = () => {
    const birthDate = new Date(1994, 11, 12)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  
  const age = ref(calculateAge())
  const prefix = ref([8, 11, 18].includes(age.value) ? 'an' : 'a')
  </script>
  