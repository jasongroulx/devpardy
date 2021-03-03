<template>
    <div class="relative z-10 px-4 pb-4 mx-auto -mt-8 max-w-screen-xl">
        <div class="p-1 overflow-hidden rounded-lg bg-gradient-to-r from-yellow-500 to-pink-600">
            <div class="relative flex flex-wrap overflow-hidden bg-purple-900 rounded-md">
                <div
                    v-for="(questions, title) in topics"
                    :key="title"
                    class="w-1/6 border-r border-purple-600 last:border-r-0 even:bg-purple-800"
                    >
                    <div class="px-4 py-6 font-bold text-center uppercase border-b border-purple-600">
                        <p>{{ title }}</p>
                    </div>
                    <div
                        v-for="(question, difficulty) in questions"
                        :key="question.id"
                        :completed="question.completed"
                        @click="selectQuestion(question)"
                        class="px-4 py-6 text-3xl font-bold text-center border-b border-purple-600"
                        :class="{'cursor-default': question.completed, 'cursor-pointer': !question.completed}"
                        >
                        <span :class="{'opacity-0' : question.completed}">
                            ${{ difficulty }}
                        </span>
                    </div>
                </div>
                <question-pane
                  :currentQuestion="currentQuestion"
                  :showInput="showInput"
                  :submitAnswer="submitAnswer"
                  :handleAnswer="handleAnswer"
                  :handleTimesUp="handleTimesUp"
                  :resetState="resetState"
                  :currentAnswer="currentQuestion"
                  :currentUser="currentUser"
                  :scores="scores"
                ></question-pane>
            </div>
            <div class="flex w-full text-sm text-center uppercase">
                <div v-for="(score, user) in scores" :key="user"
                class="flex-grow pt-1"
                >
                    <div
                    class="p-1 rounded-lg"
                    :class="{'bg-purple-900': currentUser == user, '': !currentUser == user}"
                    >
                        <div class="py-4">
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
import QuestionPane from './QuestionPane'

export default {
    components: {
        ProgressBar,
        QuestionPane
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
