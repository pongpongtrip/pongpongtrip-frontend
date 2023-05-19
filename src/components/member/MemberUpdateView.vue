<template>
  <div class="memberupdate">
    <h2 class="mt-4">회원수정</h2>
    <b-container>
      <b-modal v-model="showModalPwd" title="비밀번호 확인" @ok="onPasswordConfirm">
        <b-form-input
          v-model="passwordCheck"
          type="password"
          placeholder="비밀번호를 입력하세요"
        ></b-form-input>
      </b-modal>
      <b-modal v-model="showModalCheck" title="확인😊" @ok="moveMemberInfo">
        <p class="my-4">수정완료</p>
      </b-modal>
      <b-form @submit="onSubmit">
        <b-form-group id="user_id" label="사용자 아이디:" label-for="user_id">
          <b-form-input
            id="user_id"
            v-model="form.userId"
            type="text"
            placeholder="아이디"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user_name" label="사용자 이름:" label-for="user_name">
          <b-form-input
            id="user_name"
            type="text"
            v-model="form.userName"
            placeholder="이름"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user_name" label="사용자 이메일:" label-for="user_email">
          <b-form-input
            id="user_email"
            type="text"
            v-model="form.email"
            placeholder="이메일"
          ></b-form-input>
        </b-form-group>

        <!-- <b-form-group id="user_password" label="사용자 패스워드:" label-for="user_password">
          <b-form-input
            id="user_password"
            type="password"
            v-model="form.userPassword"
            placeholder="패스워드"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password_check" label="패스워드 확인:" label-for="password_check">
          <b-form-input
            id="password_check"
            type="password"
            placeholder="패스워드 확인"
          ></b-form-input>
        </b-form-group> -->

        <b-form-group id="user_joindate" label="가입 일:" label-for="user_joindate">
          <b-form-input
            id="user_joindate"
            type="text"
            v-model="form.joinDate"
            placeholder="가입 일"
            readonly
          ></b-form-input>
        </b-form-group>
        <b-alert :show="showAlertId" :variant="alertVariantId">{{ alertMessageId }}</b-alert>

        <b-button variant="white" class="btn-outline-danger m-2" to="/memberinfo"
          >뒤로가기</b-button
        >
        <b-button type="submit" variant="primary" class="m-2">수정하기</b-button>
      </b-form>
    </b-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { isCorrectPwd, update } from "@/api/member";

const memberStore = "memberStore";

export default {
  name: "MemberUpdateView",
  data() {
    return {
      form: {
        userId: null,
        userName: null,
        email: null,
        joinDate: null,
      },
      user: {
        userId: null,
        userPassword: null,
      },
      showModalPwd: false,
      showModalCheck: false,
      passwordCheck: "",
      showAlertId: false,
      alertMessageId: "",
      alertVariantId: "danger",
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  mounted() {
    this.form.userId = this.userInfo.userId;
    this.form.userName = this.userInfo.userName;
    this.form.joinDate = this.userInfo.joinDate;

    if (this.userInfo.email != null) {
      this.form.email = this.userInfo.email;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.showModalPwd = true;
      this.passwordCheck = "";
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.userId = "";
      this.form.userName = "";
      this.form.userPassword = "";
      this.form.joinDate = "";
    },
    onPasswordConfirm() {
      const passwordCheck = this.passwordCheck;
      if (passwordCheck !== "") {
        this.user.userId = this.userInfo.userId;
        this.user.userPassword = passwordCheck;

        //백으로 아이디 랑 패스워드 보내서 같은지 확인 -> 같으면 1 , 다르면 0 받아오기
        isCorrectPwd(this.user, ({ data }) => {
          if (data === 1) {
            //같으면 업데이트
            update(this.form, ({ data }) => {
              console.log(data);
              //수정하면 memberinfo로 이동
              this.showModalCheck = true;
            });
          }
          if (data === 0) {
            //다르면 다르다고 출력
            this.alertMessageId = "비밀번호가 일치하지 않습니다.";
            this.alertVariantId = "danger";
            this.showAlertId = true;
          }
        });
      }
    },
    moveMemberInfo() {
      this.$router.push({ name: "memberinfo" });
    },
  },
};
</script>
<style></style>
