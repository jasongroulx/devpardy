<template>

  <div class="absolute inset-0 flex flex-col p-2 bg-purple-900" v-if="currentQuestion">
      <div class="flex items-center flex-grow">
          <div class="w-full p-16">
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
              <h2 class="text-5xl font-bold leading-tight text-center">{{ currentQuestion.question }}</h2>
          </div>
      </div>
       <input
          class="w-full p-6 text-3xl font-bold text-white bg-transparent bg-white outline-none bg-opacity-5 rounded-md opacity-1"
          :class="{'opacity-1': showInput, 'opacity-0': !showInput}"
          placeholder="Enter your answer"
          type="text"
          v-model="currentAnswer"
          @keydown.enter="submitAnswer"
          autofocus
      />
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
        'currentQuestion',
        'submitAnswer',
        'handleAnswer',
        'handleTimesUp',
        'resetState',
        'showInput',
        'currentAnswer',
        'currentUser',
        'scores',
    ],
};
</script>
