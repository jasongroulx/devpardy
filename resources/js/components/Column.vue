<template>
    <div class="px-4 py-10 text-center border-b border-white border-opacity-25 last:border-b-0 uppercase font-bold">
        <p>{{ title }}</p>
    </div>
    <game-tile
        v-for="(question, difficulty) in questions"
        :key="question.id"
        >
    </game-tile>
</template>
