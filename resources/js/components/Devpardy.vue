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
                :key="question.id"
                @click="selectQuestion(question)"
                class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 py-5"
            >
            <span :class="{'opacity-0' : question.completed}">
                    ${{ difficulty }}
                </span>
            </div>
        </div>
        <div>
            <p v-for="(score, user) in scores" :key="user">{{ user }} - ${{ score }}</p>
        </div>
        <div v-if="currentQuestion">
            <progress-bar
                key="quetionProgress"
                ref="quetionProgress"
                v-if="!showInput" :milliseconds="4000"
                @completed="showInput = true"/>
            <h2>{{ currentQuestion.question }}</h2>
            <input v-if="showInput" type="text" v-model="currentAnswer" @keydown.enter="submitAnswer" autofocus/>
            <progress-bar
                key="answerProgress"
                v-if="showInput"
                :milliseconds="7000"
                :reverse="true"
                @completed=""/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProgressBar from './ProgressBar'

export default {
    components: {
        ProgressBar,
    },
    props: [
        'topics'
    ],
    data() {
        return {
            showInput: false,
            currentQuestion: null,
            currentAnswer: null,
            currentUser: 'Jason',
            scores: {
                'Jason': 0,
                'Jesse': 0,
            }
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

            axios.post('answer', payload).then(response => {
                this.handleAnswer(response.data);
                console.log(response.data.correct)
            });
        },
        handleAnswer(response) {
            if (response.correct) {
                this.scores[this.currentUser] += this.currentQuestion.difficulty;
            } else {
                // Show correct answer
            }
            this.currentQuestion.completed = true;
            this.currentAnswer = null;
            this.currentQuestion = null;
            this.showInput = false;
            this.$refs.quetionProgress.reset()
        }
    }
};
</script>
