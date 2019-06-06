<template>
    <div class="tesla-car">
        <div class="tesla-wheels">
            <div :class="`tesla-wheel tesla-wheel--front tesla-wheel--${wheels}--${speed}`"></div>
            <div :class="`tesla-wheel tesla-wheel--rear tesla-wheel--${wheels}--${speed}`"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tesla-car',
        props: {
            wheels: {
                type: Number,
                required: true,
            },
            speed: {
                type: Number,
                required: true,
            }
        }
    };
</script>