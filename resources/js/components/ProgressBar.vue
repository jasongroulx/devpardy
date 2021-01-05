<template>
    <div class="flex items-center justify-center">
        <div class="w-64 bg-white rounded-full mb-12">
            <div
                class="rounded-full bg-green-500 h-2"
                :style="width"
            ></div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        reverse: {
            default: false,
            type: Boolean,
        },
        milliseconds: {
            required: true,
            type: Number,
        },
    },
    data() {
        return {
            value: 0,
        }
    },
    computed: {
        width() {
            return `width:${this.value}%`;
        }

    },
    mounted() {
        this.setInitalValue();
        this.reverse ? this.startCountdown() : this.startProgress();
    },
    created() {
    },
    methods: {
        setInitalValue() {
            this.value = this.reverse ? 100 : 0;
        },
        startProgress() {
            let interval = setInterval(function(){
                if (this.value == 100) {
                    clearInterval(interval);
                    this.$emit('completed');
                } else {
                    this.value += 1;
                }
            }.bind(this), this.milliseconds / 100);
        },
        startCountdown() {
            let interval = setInterval(function(){
                if (this.value == 0) {
                    clearInterval(interval);
                    this.$emit('completed');
                } else {
                    this.value -= 1;
                }
            }.bind(this), this.milliseconds / 100);
        },
        reset() {
            this.value = 0;
        }
    }
};
</script>
