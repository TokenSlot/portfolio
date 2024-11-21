<script setup lang="ts">
import { onMounted, ref, useAttrs, watch } from 'vue'
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"

gsap.registerPlugin(Flip)

const props = defineProps({
    span: {
        type: String,
        default: ''
    }
})

const attrs = useAttrs()

const filter = ref(attrs['data-filter'])

</script>

<template>
    <div :class="[span, filter]" ref="card" class="card card-compact shadow-lg bg-base-100">
        <slot></slot>
    </div>  
</template>

<style>
.About {
    @apply border border-primary
}
.Projects {
    @apply border border-accent
}
.Media {
    @apply border border-secondary
}
.Contacts {
    @apply border border-warning
}
</style>
