<template>
  <div class="login">
    <h2 class="mt-4">로그인</h2>
    <!--여기부터 새로 만들기-->
    <b-container>
      <b-form>
        <b-form-group>
          <b-form-checkbox
            class="mb-2 mr-sm-2 mb-sm-0"
            style="text-align: end"
            value="ok"
            id="saveid"
            name="saveid"
            >아이디 저장</b-form-checkbox
          >
        </b-form-group>

        <b-form-group label="사용자 아이디:" label-for="user_id">
          <b-form-input
            id="user_id"
            v-model="user.userId"
            type="text"
            placeholder="아이디 입력"
            @keyup.enter="confirm"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="사용자 패스워드:" label-for="user_password">
          <b-form-input
            id="user_password"
            type="password"
            v-model="user.userPassword"
            placeholder="패스워드 입력"
            @keyup.enter="confirm"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="reset" variant="white" class="btn-outline-danger">회원가입</b-button>
        <b-button type="submit" variant="primary" class="mb-2 mr-sm-2 mb-sm-0" @click="confirm"
          >로그인</b-button
        >
      </b-form>
    </b-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "LogInView",
  data() {
    return {
      user: {
        userId: null,
        userPassword: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    // onSubmit(event) {
    //   event.preventDefault();
    // },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.user.userPassword = "";
    },
    async confirm(event) {
      event.preventDefault();
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "home" });
      } else {
        alert("아이디와 비밀번호를 확인해주세요!");
        this.onReset(event);
      }
    },
    movePage() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style>
label {
  text-align: start;
}
</style>
