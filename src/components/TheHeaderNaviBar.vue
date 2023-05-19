<template>
  <!--slide start  -->
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="custom-navbar">
      <!-- <b-navbar-brand href="#">Trip</b-navbar-brand> -->
      <b-navbar-brand>
        <!-- <img src="@/assets/logo1.png" alt="사진" style="height: 50px; width: auto" /> -->
        <img src="@/assets/logo3.png" alt="사진" style="height: 50px; width: auto" />
        <img src="@/assets/logo2.png" alt="사진" style="height: 50px; width: auto" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">홈</b-nav-item>
          <b-nav-item to="/tripsearch">지역별 여행지</b-nav-item>
          <b-nav-item to="/myplan">나의여행계획</b-nav-item>
          <b-nav-item to="/tripboard">여행정보 공유</b-nav-item>
          <b-nav-item to="/hotplace">핫 플레이스</b-nav-item>

          <!-- after login -->
          <b-nav-item-dropdown right v-if="userInfo">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              {{ userInfo.userName }}({{ userInfo.userId }})님.
              <b-icon icon="person-circle"></b-icon>
              <!-- <em>User</em> -->
            </template>
            <b-dropdown-item to="/memberinfo"> 회원정보</b-dropdown-item>
            <b-dropdown-item to="/memberlist" v-if="isAdmin"> 회원관리</b-dropdown-item>
            <b-dropdown-item @click.prevent="onClickLogout"> 로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- before login -->
          <b-nav-item-dropdown right v-else>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-icon icon="person-circle"></b-icon>
              <!-- <em>User</em> -->
            </template>
            <b-dropdown-item to="/login"> 로그인</b-dropdown-item>
            <b-dropdown-item to="/regist"> 회원가입</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <!--slide end  -->
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "TheHeaderNaviBar",
  components: {},
  data() {
    return {
      message: "",
      isAdmin: false,
    };
  },
  mounted() {
    if (this.userInfo != null) {
      this.isAdmin = this.checkUserIsAdmin();
    }
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });

      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
    checkUserIsAdmin() {
      if (this.userInfo.userId === "admin") return true;
      else false;
    },
  },
};
</script>
<style>
.custom-navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
