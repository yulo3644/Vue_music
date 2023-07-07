<template>
    <div class="playListDetail">
        <section class="header">
            <div class="header_bg" v-bind:style="`background-image:url(${imgDetail.coverImgUrl}?param=170y170)`">               
            </div>
            <div class="header_wrap">
                    <div class="header_fl">
                        <img-item :item="imgDetail" />
                        <span class="icon">歌单</span>
                    </div>
                    <div class="header_fr">
                        <h2 class="header_title">{{imgDetail.name}}</h2>
                    </div>
                </div>
        </section>
        <div class="playlist">
            <h3 class="title">歌曲列表</h3>
            <music-list :musicList="playList" @aaa="$emit('bbb',$event)"/>
        </div>
        <div class="commentList">
            <h3 class="title">精彩评论</h3>
            <comment-list :commentList="commentList" />
        </div>
    </div>
</template>

<script>
import musicList from '@/components/musicList.vue';
import imgItem from '@/components/imgItem.vue';
import commentList from '@/components/commentList.vue';
export default {
    name:"musicDetails",
    props:['id'],
    data() {
        return{
            playList:[],
            imgDetail:{},
            picUrl:{},
            commentList:{},
            user:{}
        }
    },
    methods:{
        getPlayList(){
            console.log(this.$route.params.id);
            this.$axios
            .get("https://apis.netstart.cn/music/playlist/track/all?id="+this.$route.params.id+"&limit=10&offset=1")
            .then((res) => {
                // console.log(res.data);
                this.playList = res.data.songs.map((item, index) => {
                        item.song = {
                            // 歌曲别名
                            alias: item.alia,
                            // 歌曲码率
                            privilege: res.data.privileges[index],
                            //歌手
                            artists: item.ar,
                            // 专辑
                            album: item.al,
                        };

                        //把处理好的数据返回出去
                        return item;
                    });
            })
        },
        getImg(){
            this.$axios
            .get("https://apis.netstart.cn/music/playlist/detail?id="+this.$route.params.id)
            .then((res) => {
                // console.log(res.data);
                this.imgDetail = res.data.playlist;
                this.imgDetail.picUrl = res.data.playlist.coverImgUrl;
                this.$axios
                .get("https://apis.netstart.cn/music/user/detail?id="+this.$route.params.id)
                .then((res) => {
                    this.user = res.data.profile;
                    console.log(this.user);
                })
            })
        },
        getComment(){
            this.$axios
            .get("https://apis.netstart.cn/music/comment/playlist?id="+this.$route.params.id)
            .then((res) => {
                this.commentList = res.data;
                console.log(this.commentList)
            })
        }
    },
    created(){
        this.getPlayList();
        this.getImg();
        this.getComment()
    },
    components:{
        musicList,
        imgItem,
        commentList,
    },
}
</script>

<style lang="scss" scoped>
   .title{
        height: 23px;
        line-height: 23px;
        padding: 0 10px;
        font-size: 12px;
        color: #666;
        background-color: #eeeff0;
    }
    .playListDetail{
        .header{
            position: relative;
            padding: 30px 10px 30px 15px;
            margin-top: -20px;
            overflow: hidden;
            .header_bg{
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: 50%;
                -webkit-filter: blur(20px);
                filter: blur(20px);
                -webkit-transform: scale(1.5);
                -ms-transform: scale(1.5);
                transform: scale(1.5);

                &::after{
                    content: " ";
                    background-color: rgba(0,0,0,.25);
                }
            }
            .header_wrap{
                display: flex;
                position: relative;
                z-index: 2;
                .header_fl{
                    width: 126px;
                    height: 126px;
                    position: relative;
                    background-color: #e2e2e3;
                    .icon{
                        position: absolute;
                        z-index: 3;
                        top: 10px;
                        left: 0;
                        padding: 0 8px;
                        height: 17px;
                        color: #fff;
                        font-size: 9px;
                        text-align: center;
                        line-height: 17px;
                        background-color: rgba(217,48,48,.8);
                        border-top-right-radius: 17px;
                        border-bottom-right-radius: 17px;
                    }
                }   
                .header_fr{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1 1 auto;
                    -ms-flex: 1 1 auto;
                    flex: 1 1 auto;
                    width: 1%;
                    margin-left: 16px;
                    padding-top: 3px;
                    .header_title{
                        padding-top: 1px;
                        font-size: 17px;
                        line-height: 1.3;
                        color: #fefefe;
                        height: 44px;
                        display: -webkit-box;
                        -webkit-box-pack: center;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .user{
                        display: block;
                        position: relative;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-break: normal;
                        color: hsla(0,0%,100%,.7);
                        font-size: 17px;
                        .user_img{
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                            vertical-align: middle;
                            margin-right: 5px;
                            position: relative;
                            .u_img{
                                width: 100%;
                                border-radius: 50%;
                                
                            }
                            .u_icon{
                                position: absolute;
                                right: -5px;
                                bottom: 0;
                                width: 12px;
                                height: 12px;
                                // background-image: url(../assets/usericn_2x.png);
                                background-repeat: no-repeat;
                                background-size: 75px auto;
                                background-position: -40px 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>