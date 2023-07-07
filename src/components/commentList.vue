<template>
  <div>
    <div
      class="commentList"
      v-for="(item, index) in commentList.hotComments"
      :key="index"
    >
      <div class="cmtItem">
        <div class="cmt_head">
          <a class="lsthd_link" href="">
            <div class="user_img">
              <img class="u_img" :src="item.user.avatarUrl" alt="" />
              <span
                class="icon u_icon"
                v-if="item.user.userType === 200 || item.user.userType === 207"
              ></span>
              <span
                class="icon v_icon"
                v-if="item.user.userType === 2 || item.user.userType === 3"
              ></span>
              <span class="icon s_icon" v-if="item.user.userType === 4"></span>
            </div>
          </a>
        </div>
        <div class="cmt_wrap">
          <div class="cmt_header">
            <div class="cmt_meta">
              <span class="cmt_user"
                ><a href="" class="nickname">
                  {{ item.user.nickname }}
                </a>
                <img
                  src="../assets/vip.webp"
                  alt=""
                  class="vip"
                  v-if="item.user.vipType"
              /></span>
              <div class="cmt_time">
                <span>{{ item.timeStr }}</span>
              </div>
            </div>
            <div class="cmt_like">
              <span class="cmt_likeArea">
                <span class="cmt_count">{{ item.likedCount }}</span>
                <i class="cmt_likeIcon">
                  <svg
                    class="u-svg u-svg-unzancmt"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28 28"
                  >
                    <path
                      fill="#999"
                      d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"
                    ></path>
                  </svg>
                </i>
              </span>
            </div>
          </div>
          <div class="cmt_content">
            <span class="cmt_text" v-if="item.beReplied[0]">
              回复
              <a
                :href="`//music.163.com/m/user?id=${item.beReplied[0].user.userId}`"
                class="at"
                >@{{ item.beReplied[0].user.nickname }}</a
              >
              ：
            </span>
            <span class="cmt_text">
              {{ item.content }}
            </span>
          </div>
          <div class="cmt_replied" v-if="item.beReplied[0]">
            <span class="replied_user">
              @{{ item.beReplied[0].user.nickname }}：
            </span>
            <span class="replied_cnt">
              <span class="cmt_text">
                {{ item.beReplied[0].content }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentList",
  props: {
    commentList: {
      type: Object,
      default: {},
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.commentList {
  .cmtItem {
    padding-top: 10px;
    width: 100%;
    display: -webkit-flex;
    display: -webkit-box;
    display: flex;
    -webkit-flex-direction: row;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    .cmt_head {
      margin: 0 10px;
      //   height: 35px;
      display: block;
      position: relative;
      .lsthd_link {
        .user_img {
          display: inline-block;
          width: 30px;
          height: 30px;
          vertical-align: middle;
          margin-right: 5px;
          position: relative;
          .u_img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #333;
          }
          .icon {
            position: absolute;
            right: -5px;
            bottom: 0;
            width: 12px;
            height: 12px;
            background-image: url(../assets/usericn_2x.png);
            background-repeat: no-repeat;
            background-size: 75px auto;
          }
          .u_icon {
            background-position: -40px 0;
          }
          .v_icon {
            background-position: 0 0;
          }
          .s_icon {
            background-position: -20px 0;
          }
        }
      }
    }
    .cmt_wrap {
      padding-right: 10px;
      padding-bottom: 11px;
      -webkit-flex: auto;
      -webkit-box-flex: 1;
      flex: auto;
      border-bottom: 1px solid rgba(199, 171, 171, 0.2);
      .cmt_header {
        display: -webkit-flex;
        display: -webkit-box;
        display: flex;
        -webkit-flex-direction: row;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        .cmt_meta {
          -webkit-flex: auto;
          -webkit-box-flex: 1;
          flex: auto;
          width: 0;
          font-size: 0;
          .cmt_user {
            max-width: 100%;
            display: -webkit-inline-box;
            display: -webkit-inline-flex;
            display: inline-flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            .nickname {
              font-size: 14px;
              color: #666;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              -webkit-box-flex: 1;
              -webkit-flex: auto;
              flex: auto;
            }
            .vip {
              height: 12px;
              margin: 0 4px;
            }
          }
          .cmt_time {
            font-size: 9px;
            color: #999;
          }
        }
        .cmt_like {
          width: 65px;
          height: 22px;
          line-height: 22px;
          font-size: 11px;
          color: #999;
          -webkit-flex: none;
          -webkit-box-flex: 0;
          flex: none;
          text-align: right;
          .cmt_likeArea {
            display: inline-block;
            min-width: 30px;
            padding-left: 5px;
            .cmt_count {
              vertical-align: middle;
            }
            .cmt_likeIcon {
              display: inline-block;
              width: 14px;
              height: 14px;
              margin-left: 6px;
              line-height: 0;
              vertical-align: middle;
              cursor: pointer;
            }
          }
        }
      }
      .cmt_content {
        color: #333;
        font-size: 15px;
        line-height: 22px;
        margin-top: 5px;
        .cmt_text {
          vertical-align: middle;
          .at {
            color: #507daf;
          }
        }
      }
      .cmt_replied {
        margin: 5px 0;
        padding: 10px;
        color: #888;
        font-size: 14px;
        line-height: 21px;
        border: 1px solid rgba(199, 171, 171, 0.3);
        .replied_user {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
