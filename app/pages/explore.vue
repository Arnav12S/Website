<template>
	<UContainer>
		<div>
			<h2 class="text-3xl font-fancy mb-2">Explore</h2>
			<p class="text-gray-600 mb-6">Dive into the many facets of my work and interests.</p>

			<div data-aos="fade-up">
				<a
					rel="noopener noreferrer"
					target="_blank"
				>
					<div class="p-8 rounded-2xl mb-5 transition-colors duration-300 bg-blue-100/30 hover:bg-blue-100/40">
						<div class="flex items-center">
							<h6 class="text-xl mb-1 mr-1 text-blue-800">Strategy & Design</h6>
							<span>
								<iconify-icon icon="bx:link-external" />
							</span>
						</div>
						<p class="m-0">
							(WIP) I'm passionate about strategic planning and product design, but I
							also enjoy dabbling in data analytics and coding, with a bit of AI exploration on the side.
						</p>
					</div>
				</a>
			</div>

			<div data-aos="fade-up" data-aos-delay="100">
				<a
					rel="noopener noreferrer"
					target="_blank"
				>
					<div class="p-8 rounded-2xl mb-5 transition-colors duration-300 bg-cyan-100/30 hover:bg-cyan-100/40">
						<div class="flex items-center">
							<h6 class="text-xl mb-1 mr-1 text-green-700">Achievements</h6>
							<span>
								<iconify-icon icon="bx:link-external" />
							</span>
						</div>
						<p class="m-0">
							I've tackled numerous challenges across various domains—from strategic initiatives to hackathons and everything in between. Check out some of my victories and milestones.
						</p>
					</div>
				</a>
			</div>

			<div data-aos="fade-up">
				<a
					rel="noopener noreferrer"
					href="https://arnav.blog/cv"
					target="_blank"
				>
					<div class="p-8 rounded-2xl mb-5 transition-colors duration-300 bg-purple-100/20 hover:bg-purple-100/30">
						<div class="flex items-center">
							<h6 class="text-xl mb-1 mr-1 text-purple-800">Résumé</h6>
							<span>
								<iconify-icon icon="bx:link-external" />
							</span>
						</div>
						<p class="m-0">
							Take a look at the projects I've been involved in and the roles I've played across different industries and countries.
						</p>
					</div>
				</a>
			</div>

			<div class="my-8"></div>

			<Top id="top-tracks" class="mb-16" />

			<Website data-aos="fade-in" />
		</div>
	</UContainer>
</template>
