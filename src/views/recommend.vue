<template>
    <div class="recommend">
        <titleBorder>编辑推荐</titleBorder>
        <div class="remd-lists">
            <div class="remd-list" v-for="item in recommendList.slice(0, 6)" :key="item.id">
                <!-- <img :src="item.picUrl+'?param=200y200'" alt=""> -->
                <router-link :to="'/musicDetails/'+item.id">
                <imgItem :item="item" />
                <div class="name">{{ item.name }}</div>
                </router-link>
            </div>
        </div>
        <titleBorder>最新音乐</titleBorder>
        <musicList :musicList="newSongs" @aaa="$emit('bbb',$event)"/>
    </div>
</template>


<script>
import imgItem from "../components/imgItem.vue"
import titleBorder from "../components/titleBorder.vue"
import musicList from "@/components/musicList.vue";
export default {
    name: "recommend",
    data() {
        return {
            //推荐音乐
            recommendList: [],

            //新音乐
            newSongs: [],
        };
    },
    methods: {
        getRecommendList() {
            this.$axios
                .get("https://apis.netstart.cn/music/personalized")
                .then((res) => {
                    console.log(res.data.result);
                    this.recommendList = res.data.result;
                    // console.log(this.recommendList);
                })
        },

        getNewsSongs() {
            this.$axios
                .get("https://apis.netstart.cn/music/personalized/newsong")
                .then((res) => {
                    // console.log(res.data.result);
                    this.newSongs = res.data.result;
                    // console.log(this.newSongs);
                })
        },
    },
    created() {
        this.getRecommendList();
        this.getNewsSongs();
    },

    components: {
        titleBorder,
        imgItem,
        musicList
    }
}
</script>
<style lang="scss" scoped>
.recommend {
    .remd-lists {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .remd-list {
            width: 33%;
            margin-bottom: 16px;

            .name {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-line-orient: vertical;
                overflow: hidden;
                padding: 6px 2px 0 6px;
                min-height: 30px;
                line-height: 1.2;
                font-size: 13px;
            }
        }
    }
}
</style>

