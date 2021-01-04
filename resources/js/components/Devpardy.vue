<template>
    <div class="mx-auto max-w-screen-xl px-4 pb-4 -mt-8 z-10 relative">
        <div class="bg-purple-900 border-2 border-white rounded-lg flex flex-wrap overflow-hidden">
            <div
                v-if="!currentQuestion"
                v-for="(questions, title) in topics"
                :key="title"
                class="w-1/6 last:border-r-0 border-r border-white border-opacity-25 even:bg-purple-800"
                >
                <div class="px-4 py-10 text-center border-b border-white border-opacity-25 last:border-b-0 uppercase font-bold">
                    <p>{{ title }}</p>
                </div>
                <div
                    v-for="(question, difficulty) in questions"
                    :key="question.id"
                    :completed="question.completed"
                    @click="selectQuestion(question)"
                    class="px-4 py-6 text-center border-b border-white border-opacity-25 last:border-b-0 text-3xl font-bold"
                    :class="{'cursor-default': question.completed, 'cursor-pointer': !question.completed}"
                    >
                    <span :class="{'opacity-0' : question.completed}">
                        ${{ difficulty }}
                    </span>
                </div>
            </div>
                <div class="p-20" v-if="currentQuestion">
                    <progress-bar
                        key="quetionProgress"
                        v-if="!showInput" :milliseconds="4000"
                        @completed="showInput = true"/>
                        <h2 class="text-3xl text-center">{{ currentQuestion.question }}</h2>
                        <input class="text-black" v-if="showInput" type="text" v-model="currentAnswer" @keydown.enter="submitAnswer" autofocus/>
                        <progress-bar
                            key="answerProgress"
                            v-if="showInput"
                            :milliseconds="7000"
                            :reverse="true"
                            @completed="handleTimesUp"/>
                </div>
            <div class="flex w-full text-center uppercase text-sm bg-gradient-to-r from-orange-300 via-pink-500 to-purple-600">
                <div v-for="(score, user) in scores" :key="user" class="w-1/3 p-2 last:border-r-0 border-r border-white border-opacity-25">
                    <div class="p-2 rounded-lg">
                        {{ user }}
                        <div class="text-4xl font-bold">{{ score }}</div>
                    </div>
                </div>
            </div>
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
                'Dan': 0,
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
