<template>
    <div class="hotRank">
      <!-- 头部标题 -->
      <div class="hotop">
        <div class="hotopct">
          <div class="u-hmsprt hoticon"></div>
          <div class="hottime">更新日期:&nbsp;&nbsp;&nbsp;{{nowDate >= 9 ? nowDate + "" : "0" + (nowDate)}}</div>
        </div>
      </div>
      <music-list :showNum="true" @aaa="$emit('bbb',$event)" :musicList="showLists"/>
      <div class="loading" ref="loading">{{loadingText}}</div>
    </div>
  </template>
  <script>
  import musicList from "../components/musicList.vue";
  export default {
    name: "hotRank",
    data() {
      return {
        //热歌榜数据
        hotSongList: [],
        // 当前页码
        page: 1,
        // 请求是否结束
        isFinish: true,
        // 请求提示词
        loadingText: "加载更多...",
        nowDate: "",    // 当前日期
        nowTime: "",    // 当前时间
        nowWeek: "",     // 当前星期
      };
    },
  
    components: {
      musicList
    },
  
    methods: {
      async getHotSong() {
        await this.$axios
          .get("https://apis.netstart.cn/music/playlist/detail?id=3778678")
          .then(res => {
            console.log(res.data);
            // 因为这里返回的数据比较乱，跟搜索页面和推荐模块共用
            // 但接口不一样，所以数据要整理成相类似
            this.hotSongList = res.data.playlist.tracks.map((item, index) => {
              item.song = {
                // 歌曲别名
                alias: item.alia,
                // 歌曲码率
                privilege: res.data.privileges[index],
                // 歌手
                artists: item.ar,
                // 专辑
                album: item.al
              };
  
              // 把处理好的数据返回出去
              return item;
            });
            console.log(this.hotSongList);
          });
      },
  
      scrollBottomRefresh() {
        // 判断是否触底的条件
        // 加载标签（页面最底部的标签）距离最顶部的distance + 本身的高度 === 本视图的高度 + 被滚动条卷去的高度
        // console.log("------")
        // console.log(this.$refs.loading.offsetTop);
        // console.log(this.$refs.loading.offsetHeight);
        // console.log(window.innerHeight);
  
        // 兼容性问题
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollTop);
        if (
          this.$refs.loading.offsetTop + this.$refs.loading.offsetHeight <=
          scrollTop + window.innerHeight + 5
        ) {
          // console.log("触底了！！！");
          // 因为正常情况下，有没有数据是后台前端返回，但是在这里，是个人模拟器
          if (this.page > this.hotSongList.length / 20) {
            this.loadingText = "没有更多数据了";
            return;
          }
          // this.page ++
          // 这里只是模拟后台请求，请求时异步，是需要时间的，并且如果限定时间内，只能请求一次（之前的数据请求还没有完成）
          if (this.isFinish) {
            this.isFinish = false;
            this.loadingText = "数据请求中...";
            setTimeout(() => {
              this.page++;
              this.isFinish = true;
              this.loadingText = "加载更多...";
            }, 1500);
          }
        }
      },
      dealWithTime(data) { // 获取当前时间
        let formatDateTime;
        let Y = data.getFullYear();
        let M = data.getMonth() + 1;
        let D = data.getDate();
        let H = data.getHours();
        let Min = data.getMinutes();
        let S = data.getSeconds();
        let W = data.getDay();
        H = H < 10 ? "0" + H : H;
        Min = Min < 10 ? "0" + Min : Min;
        S = S < 10 ? "0" + S : S;
        switch (W) {
          case 0:
            W = "日";
            break;
          case 1:
            W = "一";
            break;
          case 2:
            W = "二";
            break;
          case 3:
            W = "三";
            break;
          case 4:
            W = "四";
            break;
          case 5:
            W = "五";
            break;
          case 6:
            W = "六";
            break;
          default:
            break;
        }
      //   this.nowDate = Y + "年" + M + "月" + D + "日 ";
        this.nowDate =  M + "月" + D + "日 ";
        this.nowWeek = "周" + W ; 
        this.nowTime = H + ":" + Min + ":" + S;
        // formatDateTime = Y + "年" + M + "月" + D + "日 " + " 周" +W + H + ":" + Min + ":" + S;
      },
    },
  
    created() {
      this.getHotSong();
    },
    computed: {
      showLists() {
        let end = this.page * 20;
        return this.hotSongList.slice(0, end);
      }
    },
  
    // 在页面渲染 完毕后进行滚动事件监听
    mounted() {
      this.$nextTick(() => {
        window.addEventListener("scroll", this.scrollBottomRefresh);
      });
       // 页面加载完后显示当前时间
      this.dealWithTime(new Date())
      // 定时刷新时间
      this.timer = setInterval(()=> {
         this.dealWithTime(new Date()) // 修改数据date
      }, 500)
    },
    destroyed() {
      // 在组件销毁前，移除事件监听
      window.removeEventListener("scroll", this.scrollBottomRefresh);
      if (this.timer) {  // 注意在vue实例销毁前，清除我们的定时器
        clearInterval(this.timer);
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .hotRank {
    margin: 0 auto;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    .hotop {
      position: relative;
      padding-top: 38.9%;
      overflow: hidden;
      background: url(../assets/hot_music_bg_2x.jpg)
        no-repeat;
      background-size: contain;
      .hotopct {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        padding-left: 20px;
        box-sizing: border-box;
        .u-hmsprt {
          background: url(../assets/index_icon_2x.png)
            no-repeat;
          background-size: 166px 97px;
        }
        .hoticon {
          width: 142px;
          height: 67px;
          background-position: -24px -30px;
        }
        .hottime {
          margin-top: 10px;
          color: hsla(0, 0%, 100%, 0.8);
          font-size: 12px;
          -webkit-transform: scale(0.91);
          -ms-transform: scale(0.91);
          transform: scale(0.91);
          -webkit-transform-origin: left top;
          -ms-transform-origin: left top;
          transform-origin: left top;
        }
      }
    }
    .loading {
      text-align: center;
      color: #888;
      padding: 10px 0;
    }
  }
  </style>