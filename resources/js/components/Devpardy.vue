<template>
    <div class="mx-auto max-w-screen-xl px-4 pb-4 -mt-8 z-10 relative">
        <div class="rounded-lg overflow-hidden p-1 bg-gradient-to-r from-yellow-500 to-pink-600">
            <div class="relative flex flex-wrap overflow-hidden bg-purple-900 rounded-md">
                <div
                    v-for="(questions, title) in topics"
                    :key="title"
                    class="w-1/6 last:border-r-0 border-r border-purple-600 even:bg-purple-800"
                    >
                    <div class="px-4 py-10 text-center border-b border-purple-600 uppercase font-bold">
                        <p>{{ title }}</p>
                    </div>
                    <div
                        v-for="(question, difficulty) in questions"
                        :key="question.id"
                        :completed="question.completed"
                        @click="selectQuestion(question)"
                        class="px-4 py-6 text-center border-b border-purple-600 text-3xl font-bold"
                        :class="{'cursor-default': question.completed, 'cursor-pointer': !question.completed}"
                        >
                        <span :class="{'opacity-0' : question.completed}">
                            ${{ difficulty }}
                        </span>
                    </div>
                </div>
                <div class="p-2 absolute inset-0 bg-purple-900 flex flex-col" v-if="currentQuestion">
                    <div class="flex items-center flex-grow">
                        <div class="p-16 w-full">
                            <progress-bar
                                key="quetionProgress"
                                v-if="!showInput" :milliseconds="4000"
                                @completed="showInput = true"
                            />
                            <progress-bar
                                key="answerProgress"
                                v-if="showInput"
                                :milliseconds="7000"
                                :reverse="true"
                                @completed="handleTimesUp"
                            />
                            <h2 class="text-5xl text-center leading-tight font-bold">{{ currentQuestion.question }}</h2>
                        </div>
                    </div>
                     <input
                        class="outline-none bg-white bg-opacity-5 rounded-md text-white w-full bg-transparent text-3xl font-bold opacity-1 p-6"
                        :class="{'opacity-1': showInput, 'opacity-0': !showInput}"
                        placeholder="Enter your answer"
                        type="text"
                        v-model="currentAnswer"
                        @keydown.enter="submitAnswer"
                        autofocus
                    />
                </div>
            </div>
            <div class="flex w-full text-center uppercase text-sm">
                <div v-for="(score, user) in scores" :key="user"
                class="flex-grow pt-1"
                >
                    <div
                    class="p-1 rounded-lg"
                    :class="{'bg-purple-900': currentUser == user, '': !currentUser == user}"
                    >
                        <div class="py-2">
                            {{ user }}
                            <div class="text-4xl font-bold">{{ score }}</div>
                        </div>
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
