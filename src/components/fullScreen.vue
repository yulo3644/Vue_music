<template>
  <div class="fullScreen">
    <div class="header">
      <!-- 关闭 -->
      <div class="close" @click="$emit('toggleFullScreen', false)">
        <svg
          t="1687854067823"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1750"
          width="25"
          height="25"
        >
          <path
            d="M195.2 828.791q-22.628-22.628 0-45.255l588.313-588.313q22.627-22.627 45.254 0 22.628 22.627 0 45.255L240.454 828.79q-22.627 22.627-45.254 0z"
            fill="#026BFF"
            p-id="1751"
          ></path>
          <path
            d="M195.2 195.223q22.627-22.627 45.254 0l588.313 588.313q22.628 22.627 0 45.255-22.627 22.627-45.254 0L195.2 240.478q-22.628-22.628 0-45.255z"
            fill="#026BFF"
            p-id="1752"
          ></path>
        </svg>
      </div>
      <div class="title">
        <div class="name">{{ music.name }} - {{ music.id }}</div>
        <span v-for="(artist, i) in music.song.artists" :key="i">
          {{ artist.name }}
          <i v-if="i !== music.song.artists.length - 1">/</i>
        </span>
      </div>
      <!-- 转发 -->
      <div class="share">
        <svg
          t="1687848125309"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1006"
          width="30"
          height="30"
        >
          <path
            d="M589.312 825.6l371.2-296.96a21.333 21.333 0 0 0 0-33.28l-371.2-296.96a21.333 21.333 0 0 0-34.645 16.64V384C319.019 384 128 575.019 128 810.667c0 11.648 0.427 23.168 1.365 34.56A384 384 0 0 1 469.333 640h85.334v168.96a21.333 21.333 0 0 0 34.645 16.64z"
            fill="#7978F6"
            p-id="1007"
          ></path>
        </svg>
      </div>
    </div>
    <div class="lyricArray">
      <ul class="lyric">
        <li v-for="(lyric, i) in lyricArray" :key="i">
          {{ lyric.lyric }}
        </li>
      </ul>
    </div>
    <!-- 操作页面 -->
    <div class="opera">
    <!-- 进度条 -->
      <div class="jindutiao"><input type="range" max="100" /></div>
      <!-- 播放顺序 -->
      <div class="all">
        <select name="" id="">
          <option value="">顺序</option>
          <option value="">随机</option>
          <option value="">单曲</option>
        </select>
        <div class="togglePlay">
          <!-- 上一首 -->
          <svg
            t="1687848888776"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1274"
            width="30"
            height="30"
          >
            <path
              d="M512 62.39C263.688 62.39 62.39 263.688 62.39 512S263.688 961.61 512 961.61 961.61 760.312 961.61 512 760.312 62.39 512 62.39z m274.507 724.117c-35.672 35.672-77.196 63.672-123.417 83.222-47.821 20.227-98.656 30.483-151.091 30.483s-103.27-10.256-151.091-30.483c-46.22-19.549-87.745-47.55-123.417-83.222-35.673-35.672-63.672-77.196-83.222-123.417-20.227-47.821-30.483-98.656-30.483-151.09 0-52.435 10.256-103.27 30.483-151.091 19.549-46.22 47.55-87.745 83.222-123.417s77.196-63.672 123.417-83.222c47.821-20.227 98.655-30.483 151.091-30.483 52.435 0 103.269 10.256 151.091 30.483 46.22 19.549 87.745 47.55 123.417 83.222s63.672 77.196 83.222 123.417c20.227 47.821 30.483 98.656 30.483 151.091s-10.256 103.269-30.483 151.09c-19.55 46.22-47.55 87.745-83.222 123.417z"
              p-id="1275"
            ></path>
            <path
              d="M715.83 305.668L448.346 507.98c-3.094 1.787-3.094 6.253 0 8.04L715.83 718.332c3.095 1.787 6.962-0.446 6.962-4.02V309.688c0-3.573-3.867-5.806-6.962-4.02zM398.078 306.05h-92.23c-2.563 0-4.64 2.365-4.64 5.283v401.334c0 2.918 2.078 5.284 4.64 5.284h92.23c2.564 0 4.642-2.366 4.642-5.284V311.333c0-2.918-2.078-5.284-4.642-5.284z"
              p-id="1276"
            ></path>
          </svg>
          <!-- 暂停/播放 -->
          <svg 
            t="1687936155919" 
            class="icon" 
            viewBox="0 0 1025 1024" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            p-id="2069" 
            width="30" 
            height="30">
              <path 
              d="M512.61025 48.820024a463.790226 463.790226 0 1 0 463.790227 463.790226A463.790226 463.790226 0 0 0 512.61025 48.820024z m0 854.350417a390.560191 390.560191 0 1 1 390.560191-390.560191 390.560191 390.560191 0 0 1-390.560191 390.560191z m166.720382-414.970203l-120.341359-70.300834-127.908463-74.694636a22.945411 22.945411 0 0 0-32.465315 24.410011v288.526341a22.945411 22.945411 0 0 0 32.465315 24.410012l127.908463-74.694636 120.341359-70.056734a28.559714 28.559714 0 0 0 0-47.599524z" 
              p-id="2070">
            </path>
          </svg>
          <!-- 下一首 -->
          <svg
            t="1687848915449"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1543"
            width="30"
            height="30"
          >
            <path
              d="M512 62.39C263.688 62.39 62.39 263.688 62.39 512S263.688 961.61 512 961.61 961.61 760.312 961.61 512 760.312 62.39 512 62.39z m274.507 724.117c-35.672 35.672-77.196 63.672-123.417 83.222-47.821 20.227-98.656 30.483-151.091 30.483s-103.27-10.256-151.091-30.483c-46.22-19.549-87.745-47.55-123.417-83.222-35.673-35.672-63.672-77.196-83.222-123.417-20.227-47.821-30.483-98.656-30.483-151.09 0-52.435 10.256-103.27 30.483-151.091 19.549-46.22 47.55-87.745 83.222-123.417s77.196-63.672 123.417-83.222c47.821-20.227 98.655-30.483 151.091-30.483 52.435 0 103.269 10.256 151.091 30.483 46.22 19.549 87.745 47.55 123.417 83.222s63.672 77.196 83.222 123.417c20.227 47.821 30.483 98.656 30.483 151.091s-10.256 103.269-30.483 151.09c-19.55 46.22-47.55 87.745-83.222 123.417z"
              p-id="1544"
            ></path>
            <path
              d="M575.654 507.98L308.17 305.668c-3.095-1.787-6.962 0.446-6.962 4.02v404.625c0 3.572 3.868 5.806 6.962 4.02L575.654 516.02c3.093-1.787 3.093-6.253 0-8.04zM718.151 306.05h-92.23c-2.563 0-4.64 2.365-4.64 5.283v401.334c0 2.918 2.078 5.284 4.64 5.284h92.23c2.564 0 4.64-2.366 4.64-5.284V311.333c0-2.918-2.076-5.284-4.64-5.284z"
              p-id="1545"
            ></path>
          </svg>
        </div>
        <div class="lists">
          <!-- 播放列表 -->
          <span class="liebiao">播放列表</span>

          <svg
            t="1687849151971"
            class="icon"
            viewBox="0 0 1034 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1678"
            width="25"
            height="25"
          >
            <path
              d="M302.639 932.678v-93.091h709.026v93.09z m0-297.472v-93.091h709.026v93.09z m-256-291.468l68.794-62.697 98.071 107.707 261.679-295.61L545 154.81 214.528 528.012z m592.663-6.05v-93.092h372.363v93.091z"
              p-id="1679"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fullScreen",
  props: {
    music: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      lyricArray: [],
    };
  },
  methods: {
    getLyricData() {
      this.$axios
        .get("https://apis.netstart.cn/music/lyric?id=" + this.music.id)
        .then((res) => {
          console.log(res.data);
          //   console.log(res.data.lrc.lyric);
          var lyric = res.data.lrc.lyric;
          var str = lyric.split("\n");
          str.pop();
          console.log(str);
          var reg = /\[(\d+):(\d+\.\d+)]([\s\S.]*)/;
          var lyricArray = str.map((_, index) => {
            if (reg.test(_)) {
              let min = Number(RegExp.$1);
              let s = parseFloat(RegExp.$2);
              let lyric = RegExp.$3;
              return {
                time: min * 60 + s,
                lyric: lyric,
              };
            }
          });
          this.lyricArray = lyricArray;
        });
    },
  },
  created() {
    this.getLyricData();
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
  // watch: {
  //     "music.id"(newVal, oldVal){}
  // }
};
</script>

<style lang="scss" scoped>
.fullScreen {
  padding: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255);
  color: black;
  .header {
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    border-bottom: 1px solid rgb(248, 174, 174);
    padding-bottom: 10px;
  }

  .lyricArray {
    .lyric {
      width: 80%;
      height: 500px;
      margin: 10px auto;
      //   border: 1px solid orange;
      overflow: auto;
      text-align: center;

      li {
        &.active {
          color: orangered;
          font-size: 17px;
        }
      }
    }
  }

  .opera {
    //   width: 100%;
    display: flex;
    position: absolute;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    padding-bottom: 10px;
    background: rgb(255, 255, 255);
    border-top: 1px solid rgb(0, 0, 0);
    .jindutiao {
      display: flex;
      position: absolute;
      width: 100%;
      top: 5px;
      input {
        width: 100%;
      }
    }
    .all {
      margin-top: 20px;
      display: flex;
      position: absolute;
      justify-content: space-around;
      width: 100%;
      bottom: 2px;
      select {
        height: 27px;
      }
      .togglePlay {
        display: flex;
      }

      .lists {
        display: flex;
        .liebiao {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>