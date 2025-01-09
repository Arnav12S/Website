<script>
import { useColorMode } from '@nuxtjs/color-mode'

const colorMode = useColorMode()

export default {
    data() {
        return {
            isLoading: true
        };
    },
    mounted() {
        this.loadCalendlyWidget();
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.loadCalendlyWidget();
        });
    },
    methods: {
        loadCalendlyWidget() {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            script.onload = () => {
                this.isLoading = false;
            };
            this.$refs.calendlyWidget.appendChild(script);
        }
    },
    computed: {
        calendlyUrl() {
            const colorMode = useColorMode();
            const backgroundColor = colorMode.preference === 'dark' ? 'eef7fc' : '030c11';
            const primaryColor = colorMode.preference === 'dark' ? '3597d4' : '2b8dca';
            return `https://calendly.com/arnavs/45min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=${backgroundColor}&primary_color=${primaryColor}`;
        }
    }
}

useHead({
    titleTemplate: () => `Arnav Sudhansh | Contact`,
    meta: [
        { name: 'description', content: 'Arnav Sudhansh — strategist · developer · problem solver' },
        { name: 'theme-color', content: colorMode.preference === 'dark' ? '#030c11' : '#eef7fc' }
    ]
})
</script>

<template>
    <main class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
        <h1 class="text-4xl font-bold text-center my-8">Contact</h1>
        <div class="max-w-4xl mx-auto">
            <div class="mb-8">
                <h2 class="text-3xl font-serif mb-4">Reach Out</h2>
                <h6 id="support" class="text-lg font-medium">
                    Ready to Collaborate? 🤝 Block my Time!! 🗓️
                </h6>
            </div>
            
            <!-- Loading animation -->
            <div v-if="isLoading" class="flex flex-col items-center justify-center h-screen">
                <div class="relative text-5xl text-blue-500">
                    <i class="mdi mdi-timer-sand"></i>
                    <div class="absolute top-1/2 left-1/2 w-0.5 h-6 bg-blue-500 origin-top animate-sandFlow"></div>
                </div>
                <span class="mt-3 text-base">Getting my schedule for you...</span>
            </div>
            
            <!-- Calendly inline widget -->
            <div v-show="!isLoading" 
                 class="min-w-[320px] h-[700px] mx-auto" 
                 ref="calendlyWidget" 
                 :data-url="calendlyUrl">
            </div>
            
            <div class="mt-8">
                <Contact data-aos="fade-in" class="mt-8" />
            </div>
        </div>
    </main>
</template>

<style scoped>
@keyframes sandFlow {
    0%, 100% { transform: scaleY(0); }
    50% { transform: scaleY(1); }
}
</style>
