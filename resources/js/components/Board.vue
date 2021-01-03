<template>
    <div class="mx-auto max-w-screen-xl px-4 pb-4 -mt-8 z-10 relative">
        <div v-if="!currentQuestion" class="bg-purple-900 border-2 border-white rounded-lg flex flex-wrap overflow-hidden">
            <column v-for="(questions, title) in topics" :key="title"></column>
        </div>
    </div>
</template>

<script>


</script>
