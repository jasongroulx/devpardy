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
            <h2>{{ currentQuestion.question }}</h2>
            <input type="text" v-model="currentAnswer" @keydown.enter="submitAnswer" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: [
        'topics'
    ],
    data() {
        return {
            currentQuestion: null,
            currentAnswer: null,
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        selectQuestion(selected){
            this.currentQuestion = selected;
        },

        submitAnswer() {
            let payload = {
                id: this.currentQuestion.id,
                answer: this.currentAnswer,
            };
console.log(this.currentQuestion);
            axios.post('answer', payload).then(response => {
                console.log(response);
            });
        }
    }
};
</script>
