<template>
    <div>
        <h1>pageD</h1>
        <button @click="add">加1</button>
        <h2>vuex共享数据计数器的值：{{count}}</h2>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        computed: {
            count() {
                return this.$store.state.count
            }
        },
        methods: {
            changeRoute(name) {
                this.$router.push({name})
            },
            add(){
                this.$store.commit('increment')
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
