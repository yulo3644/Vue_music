<template>
  <div class="search">
    <van-search
      v-model="keywords"
      @keydown.enter="searchResult"
      shape="round"
      background="#ff756c"
      @input="inputFn"
      placeholder="搜索歌曲、歌手、专辑"
    />
      <musicList
        v-if="show == 'result'"
        :musicList="searchSongs"
        @aaa="$emit('bbb', $event)"
      />

      <div v-else-if="show == 'history'">
        <span class="searchdiv"> 热门搜索：</span>
        <div class="searchHot" v-for="item in searchHotSongs" :key="item.id">
          <span @click="fn(item.first)">{{ item.first }}</span>
        </div>

        <div class="srarch_main">
          <span>历史记录：</span>
          <div class="eye" @click="handleToggle">
            <van-icon name="eye-o" v-if="isShow" />
            <van-icon name="closed-eye" v-if="!isShow" />
          </div>
          <ul v-if="isShow">
            <li
              v-for="(item, index) in historyList"
              :key="index"
              @click="goSearchDetail(item)"
            >
              <van-icon name="underway-o" />
              <span class="historyname">{{ item }}</span>
              <span class="del"
                ><van-icon name="delete-o" @click="empty(index)"
              /></span>
            </li>
          </ul>
        </div>
      </div>

      <div class="search-list" v-else-if="show == 'suggest'">
        <div class="name">搜索"{{ keywords }}"</div>
        <div
          class="info"
          v-for="(item, index) in lists"
          :key="index"
          @click="toSearch(item)"
        >
          <van-icon name="search" /> {{ item.keyword }}
        </div>
        <div>{{ info }}</div>
      </div>
    
  </div>
</template>


<script>
import musicList from "@/components/musicList.vue";
export default {
  name: "search",
  methods: {},
  data() {
    return {
      keywords: "",
      searchSongs: [],
      searchHotSongs: [],
      historyList: [],
      isShow: true,
      show: 'history', // history suggest result
      info: "",
      lists: [],
    };
  },

  components: {
    musicList,
    isShow() {
      // 根据点击次数决定元素是否显示
      return this.clickCount % 2 === 0;
    },
  },

  methods: {
    searchResult() {
      this.$axios
        .get(
          "https://apis.netstart.cn/music/cloudsearch?keywords=" + this.keywords
        )
        .then((res) => {
          //console.log(res.data.result.songs);

          // 因为这里返回的数据比较乱，跟搜索页面和推荐模块共用
          // 但接口不一样，所以数据要整理成相类似
          if (res.data.result.songs) {
            this.searchSongs = res.data.result.songs.map((item) => {
              item.song = {
                // 歌曲别名
                alias: item.alia,
                // 歌曲码率
                privilege: item.privilege,
                // 歌手
                artists: item.ar,
                // 专辑
                album: item.al,
              };
              // 把处理好的数据返回出去
              return item;
            });
          }
          this.show = "result";
          this.history();
          //   console.log(this.searchSongs);
        });
    },
    history() {
      this.historyList.push(this.keywords.toString());
      this.historyList = [...new Set(this.historyList)];
      console.log(this.historyList);
    },
    getSearch() {
      this.$axios
        .get(
          "https://apis.netstart.cn/music/search/suggest?keywords=" +
            this.keywords +
            "&type=mobile"
        )
        .then((res) => {
          if (res.data.result) {
            console.log(res.data.result.allMatch);
            this.lists = res.data.result.allMatch;
            this.info = "";
          } else {
            this.lists = [];
            this.info = "换个词试试";
          }
        });
    },
    toSearch(item) {
      this.keywords = item.keyword;
      this.searchResult(this.keywords);
    },
    searchHot() {
      this.$axios
        .get("https://apis.netstart.cn/music/search/hot")
        .then((res) => {
          //console.log(res.data.result.hots);
          this.searchHotSong = res.data.result;
          this.searchHotSongs = res.data.result.hots.map((item) => {
            item.hots = {
              frist: item.frist,
            };
            return item;
          });
        });
    },
    handleToggle() {
      this.isShow = !this.isShow;
    },
    async fn(val) {
      // 点击热搜关键词
      this.keywords = val; // 选中的关键词显示到搜索框
      this.searchResult(this.keywords);
    },
    goSearchDetail(item) {
      this.keywords = item;
      this.searchResult(this.keywords);
    },
    async inputFn() {
      // 输入框值改变
      if (this.keywords.length === 0) {
        // 搜索关键词如果没有, 就把搜索结果清空阻止网络请求发送(提前return)
        this.searchSongs = [];
        this.show = "history";
        return;
      } else {
        this.show = "suggest";
        this.getSearch();
      }
    },
    empty(index) {
      const temp = this.historyList;
      temp.splice(index, 1);
      this.historyList = temp;
    },
    //数组去重
  },
  created() {
    this.searchHot();
  },
  // watch:{
  //   keywords(keywords) {
  //     if(keywords.length!=0) {
  //       this.Show = false;
  //       this.getSearch(keywords);
  //     }
  //  else {
  //   this.Show = ture;
  // }
  //   },
  // },
};
</script>
<style lang="scss" scoped>
.searchdiv {
  padding-left: 10px;
}
.search span {
  margin-left: 10px;
}
.search :nth-child(2) {
  z-index: 2;
}
.searchHot {
  display: inline-block;
  z-index: 1;
}
.searchHot span {
  border: solid 1px pink;
  border-radius: 15px;
  height: 30px;
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 2px 14px;
  font-size: 14px;
  line-height: 30px;
}
.srarch_main {
  margin-left: 10px;
  margin-top: 10px;
}
.eye {
  float: right;
  margin: 2px 30px;
  height: 16px;
  width: 16px;
  display: inline;
}
.del {
  height: 20px;
  width: 20px;
  margin: 0px 11px 0px;
  float: right;
  //flex: auto;
}
// ul{
//   margin-left: 12px;
// }
li {
  height: 22px;
  width: 96%;
  padding-top: 10px;
  //display: flex;
  //justify-content: space-between;
  border-bottom: 1px solid pink;
}
li:last-child {
  border-bottom: none;
}
.historyname {
  margin-top: -3px;
}
.search-list {
  margin-left: 20px;
  width: 90%;
}
.name {
  font-size: 16px;
  padding: 10px 0;
  color: lightskyblue;
}
.info {
  font-size: 16px;
  padding: 10px 0;
  border-top: 1px solid #c0c0c0;
}
</style>