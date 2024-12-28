<script setup lang="ts">
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"
import { onBeforeUpdate, onMounted, ref, watch, type ComponentPublicInstance } from "vue"
import { Filter } from "./types/filter.enum"
import DetailIcon from "./components/DetailIcon.vue"
import LinkIcon from "./components/LinkIcon.vue"
import EmailIcon from "./components/EmailIcon.vue"
import DocIcon from "./components/DocIcon.vue"
import Card from "./components/Card.vue"
import github from "./assets/images/icons/github.webp"
import logo from "./assets/images/icons/logo.webp"
import me from "./assets/images/media/me.webp"
import lycoris from "./assets/images/media/lycoris.webp"
import makioze from "./assets/images/media/makioze.webp"
import anohana from "./assets/images/media/anohana.webp"
import quizImg from "./assets/images/projects/quiz.webp"
import pumpImg from "./assets/images/projects/pump.webp"
import saeedImg from "./assets/images/projects/saeed.webp"

gsap.registerPlugin(Flip)

const currentFilter = ref(Filter.All)
const cardListRefs = ref<Array<ComponentPublicInstance | null>>([])
const gitLink = ref<HTMLAnchorElement>()
const resumeLink = ref<HTMLAnchorElement>()
const sendEmail = ref<HTMLAnchorElement>()

const triggerLink = (link: HTMLAnchorElement) => {
  link.click()
}

onBeforeUpdate(() => {
  cardListRefs.value = []
})

function setCardRef(el: ComponentPublicInstance | null) {
  cardListRefs.value.push(el)
}

onMounted(() => {
  const elements = cardListRefs.value
    .map((component) => component?.$el as HTMLElement | undefined)
    .filter((el): el is HTMLElement => el !== undefined)
  
  var initTL = gsap.timeline()
  initTL.from(elements, {
    opacity: 0,
    y: 100,
    duration: 0.3,
    stagger: 0.1,
    ease: "power1.inOut",
    onComplete: () => {
      initTL.revert()
    }
  })

  elements.forEach((element) => {

    const span = element.dataset.span
    const icon: any = element.querySelector(".icon")
    const text: any = element.querySelector(".body")
    const isOpen = ref(false)
    const closeBtn: any = element.querySelector(".close")
    const closeTxt: any = element.querySelector(".closeTxt")

    const openCloseHandler = () => {
      let state = Flip.getState(elements)
      isOpen.value = !isOpen.value

      element.classList.toggle(span!)

      if (text) text.classList.toggle("hidden")

      if (icon) icon.classList.toggle("-rotate-180")

      Flip.from(state, {
        absolute: true,
        duration: 0.3,
        onComplete: () => {
          closeBtn.classList.toggle("group-hover:ring-4")
          closeBtn.classList.toggle("hover:ring-4")
          closeBtn.classList.toggle('cursor-pointer')
          if (isOpen.value) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            })
            closeTxt.innerText = "Close"
            element.classList.remove('cursor-pointer')
            element.removeEventListener("click", openCloseHandler)
            closeBtn.addEventListener("click", openCloseHandler)
          } else {
            closeTxt.innerText = "Details"
            element.classList.add('cursor-pointer')
            element.addEventListener("click", openCloseHandler)
            closeBtn.removeEventListener("click", openCloseHandler)
          }
        }
      })
    }

    if (span) {
      element.classList.add('cursor-pointer')
      element.addEventListener("click", openCloseHandler)
    }
  })
})

watch(currentFilter, async (newFilter) => {
  const elements = cardListRefs.value
    .map((component) => component?.$el as HTMLElement | undefined)
    .filter((el): el is HTMLElement => el !== undefined)
  
  elements.forEach((element) => {
    let state = Flip.getState(elements)
    const span = element.dataset.span
   
    element.classList.remove('order-first', 'pointer-cursor', 'pointer-events-none', 'opacity-50');

    if (newFilter === Filter.All) {
    } else if (newFilter === element.dataset.filter) {
      element.classList.add('order-first')
      if (span) element.classList.add('pointer-cursor')
    } else {
      element.classList.add('pointer-events-none', 'opacity-50')
    }

    Flip.from(state, {
      absolute: true,
      duration: 0.3,
      ease: "out"
    })

  })
})

const navBtns = [
  {
    style: 'col-span-4 lg:col-span-1 btn btn-sm btn-info',
    filterType: Filter.All
  },
  {
    style: 'btn-primary',
    filterType: Filter.About
  },
  {
    style: 'btn-accent',
    filterType: Filter.Projects
  },
  {
    style: 'btn-secondary',
    filterType: Filter.Media
  },
  {
    style: 'btn-warning',
    filterType: Filter.Contacts
  },
]
</script>

<template>
  <div class="w-screen min-h-screen">
      <div class="flex flex-col lg:relative">
        <div class="lg:absolute left-10 top-1.5 lg:px-0 mx-auto">
          <img class="w-20" :src="logo" alt="Roman Paltera Jr">
        </div>
        <div class="grid grid-cols-4 lg:grid-cols-5 gap-2 justify-center px-3 pt-0 pb-5 lg:pt-5 lg:px-0 mx-auto w-fit lg:w-2/3 ">
          <button
            v-for="btn in navBtns"
            class="join-item btn lg:btn-md"
            :class="[btn.style, currentFilter === btn.filterType ? 'btn-active' : 'btn-outline']"
            @click="() => currentFilter = btn.filterType">
              {{ btn.filterType }}
          </button>
        </div>
      </div>
      
      <div class="px-3 lg:px-0 grid grid-cols-2 lg:grid-cols-5 grid-flow-dense gap-2 mx-auto w-fit lg:w-2/3 pb-5">

        <Card span="col-span-2" :ref="(el: any) => setCardRef(el)" :data-filter="Filter.About">
          <div class="card-body">
            <h2 class="card-title text-2xl text-primary">Roman Paltera Jr.</h2>
            <p class="text-base"><span class="font-bold">Web Developer</span> based in the Philippines.</p>
            <p class="text-base">Skilled in <span class="font-bold">Vue/Nuxt</span> and <span class="font-bold">UI/UX Design</span>, with a keen interest in <span class="font-bold">Game Development.</span></p>
            <p class="text-base">Outside of coding, I stay updated on the latest gaming trends and occasionally create Pixel Art as a creative outlet.</p>
          </div>
        </Card>

        <Card :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Media" data-span="col-span-2">
          <div class="card-body">
            <img class="w-[120px] mx-auto" :src="me" alt="Me">
            <h2 class="card-title mx-auto text-secondary">It's Me!</h2>
            <div class="body hidden mx-auto">Despite everything it's still me.</div>
          </div>
        </Card>

        <Card span="col-span-2 group" :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Projects" data-span="col-span-full">
          <figure>
            <img :src="quizImg" alt="Quiz Sample">
          </figure>
          <div class="card-body">
            <h2 class="card-title text-accent">Real-Time Quiz Bee Web App</h2>
            <div class="body hidden text-base">
              A web application created for my school to facilitate fun and interactive quiz sessions in real-time. Designed to make learning more engaging, it allows students to compete in a lively and enjoyable environment.
              I was responsible for both designing the app&#39;s user interface and developing the backend, ensuring a seamless experience and efficient functionality for all users.
              <p class="font-bold">Contributions:</p>
              <ul class="list-disc px-5">
                <li><span class="font-bold">UI Design:</span> Designed the app's user interface.</li>
                <li><span class="font-bold">API Development:</span> Developed APIs to enable efficient data handling and seamless communication between the frontend and backend.</li>
              </ul>
            </div>
          </div>
          <div class="cards-action flex gap-1 p-2">
            <div class="flex-1">
              <div class="close badge badge-accent flex justify-center items-center group-hover:ring-4 ring-purple-500"><span class="closeTxt">Details</span> <DetailIcon class="icon transition-transform duration-300 ease-out"></DetailIcon></div>
            </div>
            
            <div class="badge badge-outline">Nuxt 3</div>
            <div class="badge badge-outline">NestJS</div>
            <div class="badge badge-outline">DaisyUI</div>
          </div>
        </Card>

        <Card :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Contacts">
          <div class="card-body">
            <div class="m-auto">
              <p class="text-center">Current Work</p>
              <h2 class="card-title text-warning mx-auto text-center">Freelance Web Developer</h2>
            </div>
          </div>
        </Card>

        <Card span="col-span-2 group" :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Projects" data-span="col-span-full">
          <figure>
            <img :src="pumpImg" alt="Pump Sample">
          </figure>
          <div class="card-body">
            <h2 class="card-title text-accent">Lil Pump Mosh Pit Madness</h2>
            <div class="body hidden text-base">
              <p>This project is a 2D endless runner game built using PixiJS for dynamic gameplay mechanics and Nuxt.js as the web framework. The game challenges players to navigate a three-lane highway, dodge obstacles, and collect money to achieve high scores. Players' performance is showcased on a global leaderboard for competitive engagement.</p>
              <p class="font-bold">Contributions:</p>
              <ul class="list-disc px-5">
                <li><span class="font-bold">Game Mechanics:</span> Programmed core functionalities, including lane switching, obstacle avoidance, and money collection mechanics, ensuring responsive and fluid gameplay.</li>
              </ul>
            </div>
          </div>
          <div class="cards-action flex gap-1 p-2">
            <div class="flex-1">
              <div class="close badge badge-accent flex justify-center items-center group-hover:ring-4 ring-purple-500"><span class="closeTxt">Details</span> <DetailIcon class="icon transition-transform duration-300 ease-out"></DetailIcon></div>
            </div>
            
            <div class="badge badge-outline">Nuxt 3</div>
            <div class="badge badge-outline">PixiJS</div>
          </div>
        </Card>

        <Card class="group" @click="triggerLink(sendEmail!)" :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Contacts" data-span="col-span-1">
          <a href="mailto:palteraromanjr@gmail.com" ref="sendEmail"></a>
          <div class="card-body">
            <div class="m-auto">
              <EmailIcon class="mx-auto"></EmailIcon>
              <h2 class="card-title flex flex-col justify-center gap-0"><span class="text-warning">palteraromanjr</span><span class="text-base">@gmail.com</span></h2>
            </div>
          </div>
          <div class="cards-action flex flex-col justify-end p-2">
            <div class="close badge badge-warning flex gap-1 items-center group-hover:ring-4 ring-yellow-500"><span>Send Email</span> <LinkIcon></LinkIcon></div>
          </div>
        </Card>

        <Card class="group" @click="triggerLink(resumeLink!)" :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Contacts" data-span="col-span-1">
          <a href="/portfolio/RomanPalteraJr-Resume.pdf" ref="resumeLink" target="_blank"></a>
          <div class="card-body">
            <div class="m-auto">
              <DocIcon class="mx-auto mb-2"></DocIcon>
              <h2 class="card-title text-center text-warning">View My Resume</h2>
            </div>
          </div>
          <div class="cards-action flex flex-col justify-end p-2">
            <div class="close badge badge-warning flex gap-1 items-center group-hover:ring-4 ring-yellow-500"><span>Link</span> <LinkIcon></LinkIcon></div>
          </div>
        </Card>

        <Card class="image-full"  :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Media">
          <figure>
            <img :src="lycoris" alt="Lycoris">
          </figure>
        </Card>

        <Card class="group" background="bg-white" @click="triggerLink(gitLink!)" :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Projects" data-span="col-span-1">
          <a href="https://github.com/TokenSlot" ref="gitLink" target="_blank"></a>
          <div class="card-body">
            <img :src="github" alt="Github">
          </div>
          <div class="cards-action h-full flex flex-col justify-end p-2">
            <div class="close badge badge-outline badge-neutral flex gap-1 items-center group-hover:ring-4 ring-purple-500"><span>Link</span> <LinkIcon></LinkIcon></div>
          </div>
        </Card>

        <Card span="col-span-2 group" :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Projects" data-span="col-span-full">
          <figure>
            <img :src="saeedImg" alt="Saeed">
          </figure>
          <div class="card-body">
            <h2 class="card-title text-accent">Saeed Digital Advertising</h2>
            <div class="body hidden text-base">
              <p class="p-0">Developed a modern and responsive website for Saeed Digital Advertising using Nuxt.js. The site highlights the company's services and portfolio with a user-friendly interface.</p>
              <p class="font-bold">Contributions:</p>
              <ul class="list-disc px-5">
                <li><span class="font-bold">UI/UX Design:</span> Created a clean, intuitive layout to enhance user experience and showcase the company&#39;s offerings effectively.</li>
                <li><span class="font-bold">Responsive Design:</span> Ensured the site was fully responsive and accessible across various devices.</li>
              </ul>
              <a class="btn btn-link p-0" href="https://saeed-ads.pages.dev/" target="_blank">Visit Website</a>
            </div>
          </div>
          <div class="cards-action flex gap-1 p-2">
            <div class="flex-1">
              <div class="close badge badge-accent flex justify-center items-center group-hover:ring-4 ring-purple-500"><span class="closeTxt">Details</span> <DetailIcon class="icon transition-transform duration-300 ease-out"></DetailIcon></div>
            </div>
            <div class="badge badge-outline">Nuxt 3</div>
          </div>
        </Card>

        <Card class="row-span-2 image-full" :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Media">
          <figure>
            <img :src="anohana" alt="Anohana">
          </figure>
        </Card>

        <Card class="image-full" :ref="(el: any) => setCardRef(el)" :data-filter="Filter.Media">
            <figure>
              <img :src="makioze" alt="Maki Oze">
            </figure>
        </Card>
      </div>
  </div>
</template>

<style>
.image-full::before {
  background-color: transparent !important;
}
</style>
