<template>
    <div
        :completed="question.completed"
        @click="selectQuestion(question)"
        class="px-4 py-6 text-center border-b border-white border-opacity-25 last:border-b-0 text-3xl font-bold"
        :class="{'cursor-default': question.completed, 'cursor-pointer': !question.completed}"
        >
        <span :class="{'opacity-0' : question.completed}">
            ${{ difficulty }}
        </span>
    </div>
</template>
