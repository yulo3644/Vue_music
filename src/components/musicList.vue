<template>
    <div class="music-list">
        <!-- <h2>music列表</h2>
        {{musicList[0]}} -->
        <div class="song" v-for="(item,index) in musicList" :key="item.id">
            <!-- 左边 -->
            <div class="fl" @click="play(item)">
                <div :class="{ top3: index <=2 }" class="rank">
                    {{ index >= 9 ? index +1 : "0" + (index+1) }}
                </div>
                <div class="content">
                    <div class="name">
                    <span>{{item.name}}</span>
                    <span class="alias" v-if="item.song.alias.length">
                        ({{ item.song.alias[0] }})
                    </span>
                    </div>
                    <!-- 歌手和专辑 -->
                    <div class="artist">
                        <i class="maxBr" v-if="item.song.privilege.maxbr >320000"></i>
                        <span v-for="(artist,i) in item.song.artists" :key="i">
                            {{artist.name}}
                            <i v-if="i !==item.song.artists.length -1"></i>
                        </span>
                        - <span class="album-name">{{item.song.album.name}}</span>
                    </div>
                </div>
            </div>
            <!-- 右边播放 -->
            <div class="fr">
                <span @click="play(item)"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:"musicList",
    props:{
        musicList:{
            type:Array,
            default:()=>{
                return [];
            },
        },
        shouNum:{
            type:Boolean,
            default:false,
        },
    },
    methods:{
        play(music){
            this.$emit("aaa",music)
        }
        
    }
};
</script>

<style lang="scss" scoped>
.music-list{
    padding-left: 10px;
    .song{
        margin:10px 0;
        border-bottom: 1px solid rgba(199,171,171,0.2);
        display: flex;
        justify-content: space-between;

        &:last-child{
            border-bottom:0;
        }
        .fl{
            flex:1 1 auto;
            padding: 6px 0;
            display: flex;
            .rank{
                display: flex;
                align-items: center;
                width: 40px;
                font-size: 17px;
                color: #999;
                margin-left: -10px;
                justify-content: center;
            }
            .top3{
                color: #df3436;
            }
            .content{
                width:0px;
                flex:1 1 auto;
                .name{
                    font-size: 17px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-break: normal;
                }
                //歌手和专辑
                .artist{
                    font-size: 12px;
                    color:#888;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-break: normal;
                    .maxBr{
                        display: inline-block;
                        width: 12px;
                        height: 8px;
                        margin-right: 4px;
                        background: url(../assets/index_icon_2x.png) no-repeat;
                        background-size: 166px 97px;
                    }
                    // .album-name{}

                }
            }
        }
        .fr{
            padding:0 10px;
            display: flex;
            align-items: center;
            span{
                display: inline-block;
                width: 22px;
                height: 22px;
                background: url(../assets/index_icon_2x.png) no-repeat;
                background-position: -24px 0px;
                background-size: 166px 97px;
                //border: 1px solid red;
            }
        }
        
    }
}
</style>
