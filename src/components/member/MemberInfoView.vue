<template>
  <div class="memberinfo">
    <h2 class="mt-4">회원정보</h2>
    <b-container>
      <b-form @submit="onSubmit">
        <b-form-group id="user_id" label="사용자 아이디:" label-for="user_id">
          <b-form-input id="user_id" v-model="userInfo.userId" type="text" readonly> </b-form-input>
        </b-form-group>

        <b-form-group id="user_name" label="사용자 이름:" label-for="user_name">
          <b-form-input
            id="user_name"
            type="text"
            v-model="form.userName"
            placeholder="이름"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user_name" label="사용자 이메일:" label-for="email">
          <b-form-input
            id="email"
            type="text"
            v-model="form.email"
            placeholder="이메일"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user_grade" label="회원 등급:" label-for="user_grade">
          <b-form-input
            id="user_grade"
            type="text"
            v-model="form.userGrade"
            placeholder="회원 등급"
            readonly
          ></b-form-input>
        </b-form-group>
        <!-- 
					<b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
						<b-form-checkbox-group
							v-model="form.checked"
							id="checkboxes-4"
							:aria-describedby="ariaDescribedby"
						>
							<b-form-checkbox value="me">Check me out</b-form-checkbox>
							<b-form-checkbox value="that">Check that out</b-form-checkbox>
						</b-form-checkbox-group>
					</b-form-group> -->

        <b-button type="submit" variant="white" class="btn-outline-danger m-2">회원탈퇴</b-button>
        <b-button variant="primary" to="/memberupdate" class="m-2">수정하기</b-button>
      </b-form>
    </b-container>
  </div>
</template>
<script>
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberInfoView",
  data() {
    return {
      form: {
        userId: null,
        userName: null,
        userGrade: null,
        email: null,
      },
    };
  },
  mounted() {
    this.form.userId = this.userInfo.userId;
    this.form.userName = this.userInfo.userName;

    if (this.userInfo.email === null) {
      this.form.email = "이메일이 없습니다.";
    }
    if (this.userInfo.email != null) {
      this.form.email = this.userInfo.email;
    }
    if (this.userInfo.userId === "admin") {
      this.form.userGrade = "관리자";
    }
    if (this.userInfo.userId != "admin") {
      this.form.userGrade = "일반 회원";
    }
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
  },
};
</script>
<style></style>
