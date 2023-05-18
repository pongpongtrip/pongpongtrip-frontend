<template>
  <div class="memberinfo">
    <h2 class="mt-4">회원정보</h2>
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

        <b-button variant="primary" to="/memberupdate">수정하기</b-button>
        <b-button type="submit" variant="white" class="btn-outline-danger">회원탈퇴</b-button>
      </b-form>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "MemberInfoView",
  data() {
    return {
      form: {
        userId: "",
        userName: "",
        userGrade: "",
      },
    };
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
