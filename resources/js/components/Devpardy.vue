<template>
    <div>
        <div v-if="!currentQuestion" class="flex board">
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
                    :completed="question.completed"
                    @click="selectQuestion(question)"
                    class="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 py-5"
                    :class="{'cursor-default': question.completed, 'cursor-pointer': !question.completed}"
                    >
                    <span :class="{'opacity-0' : question.completed}">
                        ${{ difficulty }}
                    </span>
                </div>
            </div>
        </div>
        <div class="question">
            <div v-if="currentQuestion">
                <progress-bar
                    key="quetionProgress"
                    v-if="!showInput" :milliseconds="4000"
                    @completed="showInput = true"/>
                    <h2>{{ currentQuestion.question }}</h2>
                    <input v-if="showInput" type="text" v-model="currentAnswer" @keydown.enter="submitAnswer" autofocus/>
                    <progress-bar
                        key="answerProgress"
                        v-if="showInput"
                        :milliseconds="7000"
                        :reverse="true"
                        @completed="handleTimesUp"/>
            </div>
        </div>
        <div>
            <p v-for="(score, user) in scores" :key="user">{{ user }} - ${{ score }}</p>
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
            if (selected.completed) {
               return;
            }

            this.currentQuestion = selected;
        },

        submitAnswer() {
            let payload = {
                id: this.currentQuestion.id,
                answer: this.currentAnswer,
            };

            axios.post('answer', payload).then(response => {
                this.handleAnswer(response.data);
            });
        },
        handleAnswer(response) {
            if (response.correct) {
                this.scores[this.currentUser] += this.currentQuestion.difficulty;
            } else {
                // Show correct answer
            }
            this.resetState();
        },
        handleTimesUp() {
            // Show correct answer
            this.resetState();
        },
        resetState() {
            this.currentQuestion.completed = true;
            this.currentAnswer = null;
            this.currentQuestion = null;
            this.showInput = false;
        }
    }
};
</script>
