<template>
    <div class="flex" >
        <div
            v-for="(questions, title) in topics"
            :key="title"
            class="flex flex-col bg-gray-200 w-32"
        >
            <div class="text-gray-700 text-center bg-gray-500 px-4 py-2 m-2 py-5">
                <p>{{ title }}</p>
            </div>
            <div
                v-for="(question, difficulty) in questions"
                @click="selectQuestion(question)"
                class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 py-5"
            >
                {{ difficulty }}
            </div>
        </div>
        <div v-if="currentQuestion">
            <h2>{{ currentQuestion }}</h2>
            <textarea cols="30" rows="10"></textarea>
        </div>
    </div>
</template>

<script>

export default {
    props: [
        'topics'
    ],
    data() {
        return {
            currentQuestion: null
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        selectQuestion(selected){
            this.currentQuestion = selected.question;
        }
    }
};
</script>
