<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"

gsap.registerPlugin(Flip)

const props = defineProps({
    span: {
        type: String,
        default: ''
    },
    background: {
      type: String,
      default: 'bg-card'  
    },
})

const attrs = useAttrs()

const filter = ref(attrs['data-filter'])
const colorTheme = computed(() => {
    if (filter.value == "About") {
        return "border-primary"
    } else if (filter.value == "Projects") {
        return "border-accent"
    } else if (filter.value == "Media") {
        return "border-secondary"
    } else if (filter.value == "Contacts") {
        return "border-warning"
    }
})

</script>

<template>
    <div :class="[span, colorTheme, background]" ref="card" class="border card card-compact shadow-lg">
        <slot></slot>
    </div>  
</template>
