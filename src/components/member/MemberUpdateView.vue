<template>
  <div class="memberupdate">
    <h2 class="mt-4">회원수정</h2>
    <b-container>
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
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user_password" label="사용자 패스워드:" label-for="user_password">
          <b-form-input
            id="user_password"
            type="password"
            v-model="form.userPassword"
            placeholder="패스워드"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password_check" label="패스워드 확인:" label-for="password_check">
          <b-form-input
            id="password_check"
            type="password"
            placeholder="패스워드 확인"
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user_joindate" label="가입 일:" label-for="user_joindate">
          <b-form-input
            id="user_joindate"
            type="text"
            placeholder="가입 일"
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

        <b-button type="submit" variant="primary">수정하기</b-button>
        <b-button variant="white" class="btn-outline-danger" to="/memberinfo">뒤로가기</b-button>
      </b-form>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "MemberUpdateView",
  data() {
    return {
      form: {
        userId: "",
        userName: "",
        userPassword: "",
        userJoindate: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.userId = "";
      this.form.userName = "";
      this.form.userPassword = "";
      this.form.userJoindate = "";
    },
  },
};
</script>
<style></style>
