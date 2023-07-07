<template>
    <div class="nav">
        <router-link to="/"><span>推荐音乐</span></router-link>
        <router-link to="/hotRank"><span>热歌榜</span></router-link>
        <router-link to="/search"><span>搜索</span></router-link>
    </div>
</template>

<style lang="scss" scoped>
.nav {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;width: 100%;
    z-index: 99;
    background-color: #fff;
    margin-bottom: 40px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rbg(247, 244, 244);
    
    a {
        flex: 1;
        text-align: center;
        font-size: 15px;
        
        span {
            height: 40px;
            display: inline-block;
            padding: 0 5px;
            box-sizing: border-box;
        }

        &.router-link-exact-active span{
            color: #dd001b;
            border-bottom: 1px solid #dd001b;
        }
    }
}</style>