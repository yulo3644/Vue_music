<template>
  <div id="app">
    <!-- 头部 -->
    <navView />
    <!-- 组件界面 -->
    <router-view class="view" @bbb="play" />
    <!-- 底部 -->
    <div class="play">
      <div class="play-bottom">
        <div class="playLeft" @click="toggleFullScreen">
          <!-- 歌曲图片 -->
          <img
            class="playImg"
            :class="{
              img_playImg_pauesd: isBtnShow,
              img_playImg_active: !isBtnShow,
            }"
            :src="this.musicImg + '?param=60y60'"
          />
          <!-- 歌曲名 -->
          <div class="lyrics">
            <p>{{ music.name }}</p>
            <!-- <p>{{ musicdata.lyric }}</p> -->
          </div>
        </div>
        <div class="playRight">
          <!-- 播放图标 -->
          <svg
            v-if="isBtnShow"
            t="1687660329626"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9832"
            width="32"
            height="32"
            @click="bofang"
          >
            <path
              d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
              fill="#666666"
              p-id="9833"
            ></path>
            <path
              d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
              fill="#666666"
              p-id="9834"
            ></path>
          </svg>
          <svg
            v-else
            t="1687679446325"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3447"
            width="30"
            height="30"
            @click="bofang"
          >
            <path
              d="M512 1024C228.266667 1024 0 795.733333 0 512S228.266667 0 512 0s512 228.266667 512 512-228.266667 512-512 512z m0-42.666667c260.266667 0 469.333333-209.066667 469.333333-469.333333S772.266667 42.666667 512 42.666667 42.666667 251.733333 42.666667 512s209.066667 469.333333 469.333333 469.333333z m-106.666667-682.666666c12.8 0 21.333333 8.533333 21.333334 21.333333v384c0 12.8-8.533333 21.333333-21.333334 21.333333s-21.333333-8.533333-21.333333-21.333333V320c0-12.8 8.533333-21.333333 21.333333-21.333333z m213.333334 0c12.8 0 21.333333 8.533333 21.333333 21.333333v384c0 12.8-8.533333 21.333333-21.333333 21.333333s-21.333333-8.533333-21.333334-21.333333V320c0-12.8 8.533333-21.333333 21.333334-21.333333z"
              fill="#666666"
              fill-opacity=".9"
              p-id="3448"
            ></path>
          </svg>
          <!-- 列表图标 -->
          <svg
            t="1687659873106"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8701"
            width="32"
            height="32"
          >
            <path
              d="M42.666667 106.666667a21.333333 21.333333 0 0 1 21.333333-21.333334h896a21.333333 21.333333 0 0 1 0 42.666667H64a21.333333 21.333333 0 0 1-21.333333-21.333333z m21.333333 405.333333h597.333333a21.333333 21.333333 0 0 0 0-42.666667H64a21.333333 21.333333 0 0 0 0 42.666667z m384 341.333333H64a21.333333 21.333333 0 0 0 0 42.666667h384a21.333333 21.333333 0 0 0 0-42.666667z m532.853333-324.513333c-4.5-20.773333-14.666667-50.513333-37.466666-74.266667-11.04-11.493333-23.64-20.093333-37.493334-25.606666-10.306667-7.126667-19.44-16.58-27.153333-28.133334-19.64-29.393333-24.373333-64.04-25.446667-82.08A21.333333 21.333333 0 0 0 810.666667 320v479.586667c-1.413333-1.02-2.846667-2-4.326667-3.006667-27.64-18.433333-64-28.58-102.34-28.58s-74.666667 10.146667-102.34 28.58c-14.253333 9.5-25.56 20.746667-33.613333 33.44-8.88 14-13.38 29.013333-13.38 44.666667s4.5 30.666667 13.38 44.666666c8.053333 12.666667 19.333333 23.94 33.613333 33.44C629.333333 971.186667 665.646667 981.333333 704 981.333333s74.666667-10.146667 102.34-28.58c14.253333-9.5 25.56-20.746667 33.613333-33.44 8.88-14 13.38-29.013333 13.38-44.666666V438a140.893333 140.893333 0 0 0 30.966667 27.82A21.18 21.18 0 0 0 888.666667 468c8.713333 3.2 16.773333 8.606667 23.953333 16.086667 16.733333 17.42 23.806667 41.146667 26.533333 53.733333a21.333333 21.333333 0 1 0 41.706667-9.026667z"
              fill="#5C5C66"
              p-id="8702"
            ></path>
          </svg>
        </div>
      </div>
      <!-- 音频播放 -->
      <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${music.id}.mp3`"
        autoplay
      ></audio>

      <!-- 歌曲播放详情  -->
      <transition name="moveY">
        <fullScreen
          :music="currentMusic"
          @toggleFullScreen="toggleFullScreen"
          v-if="isFullScreen"
          :bofang="bofang"
          :isBtnShow="isBtnShow"
        ></fullScreen>
      </transition>
    </div>
  </div>
</template>

<script>
import navView from "./components/nav.vue";
import fullScreen from "./components/fullScreen.vue";
export default {
  data() {
    return {
      currentMusic: "",
      musicArray: [],
      isFullScreen: false,
      music: [],
      lyric: [],
      musicImg: "",
      isBtnShow: true,
    };
  },
  mounted() {
    console.log([this.$refs]);
  },
  components: {
    navView,
    fullScreen,
  },
  methods: {
    play(music) {
      this.currentMusic = music;
      this.music = music;
      this.getMusicImg();
    },
    getMusicImg() {
      if (this.music.picUrl) {
        this.musicImg = this.music.picUrl;
      } else {
        this.musicImg = this.music.al.picUrl;
      }
    },
    toggleFullScreen(val) {
      this.isFullScreen = val;
    },
    bofang() {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.isBtnShow = false;
      } else {
        this.$refs.audio.pause();
        this.isBtnShow = true;
      }
    },
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  .view {
    margin-top: 40px;
    margin-bottom: 50px;
  }
  .play {
    display: flex;
    position: fixed;
    height: 40px;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e2e2e3;
    z-index: 100;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 0px;
    .play-bottom {
      display: flex;
      position: fixed;
      height: 40px;
      bottom: 0;
      padding: 10px;
      width: 100%;
      .playLeft {
        display: flex;
        width: 70%;
        height: 100%;
        align-items: center;
        padding-right: 20px;
        .playImg {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
          border: 5px solid #000000;
          transform: rotateX(0deg);
          animation: xuanzhuan 5s linear infinite;
        }
        .img_playImg_active {
          animation-play-state: running;
        }
        .img_playImg_pauesd {
          animation-play-state: paused;
        }
        @keyframes xuanzhuan {
          0% {
            transform: rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg);
          }
        }
      }
      .playRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
.moveY-enter-active,
.moveY-leave-active {
  transition: all 0.6s linear;
}
.moveY-enter-to,
.moveY-leave {
  transform: translateY(0);
}
.moveY-enter,
.moveY-leave-to {
  transform: translateY(100%);
}
</style>
