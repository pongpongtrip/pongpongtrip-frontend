<template>
	<div class="login">
		<h2 class="mt-4">로그인</h2>
		<!--여기부터 새로 만들기-->
		<b-container>
			<b-form @submit="onSubmit" @reset="onReset">
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

				<b-form-group id="user_id" label="사용자 아이디:" label-for="user_id">
					<b-form-input
						id="user_id"
						v-model="form.userId"
						type="text"
						placeholder="아이디 입력"
						required
					></b-form-input>
				</b-form-group>

				<b-form-group id="user_password" label="사용자 패스워드:" label-for="user_password">
					<b-form-input
						id="user_password"
						type="password"
						v-model="form.userPassword"
						placeholder="패스워드 입력"
						required
					></b-form-input>
				</b-form-group>

				<b-button type="submit" variant="primary" class="mb-2 mr-sm-2 mb-sm-0">로그인</b-button>
				<b-button type="reset" variant="white" class="btn-outline-danger">회원가입</b-button>
			</b-form>
		</b-container>
	</div>
</template>
<script>
export default {
	name: 'LogInView',
	data() {
		return {
			form: {
				userId: '',
				userPassword: '',
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
			this.form.userId = '';
			this.form.userPassword = '';
		},
	},
};
</script>
<style>
label {
	text-align: start;
}
</style>
