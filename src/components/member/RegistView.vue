<template>
	<div class="regist">
		<h2 class="mt-4">회원가입</h2>
		<b-container>
			<b-modal v-model="showModalRegistSuccess" title="Regist😊" @ok="moveLogin" ok-only>
				<p class="my-4">
					회원가입 완료!😉<br /><br />
					환영합니다
				</p>
			</b-modal>
			<b-modal v-model="showModalRegistFail" title="Regist😊" @ok="onResetAll" ok-only>
				<p class="my-4">
					회원가입 실패!😥 <br /><br />
					다시 가입해주세요!
				</p>
			</b-modal>
			<b-modal v-model="showModalRegist" title="Check Please😊" ok-only>
				<p class="my-4">{{ ModalRegistMessage }}</p>
			</b-modal>
			<b-form @submit="onSubmit">
				<b-form-group id="fuser_id" label="사용자 아이디:" label-for="user_id">
					<b-form-input
						id="user_id"
						v-model="form.userId"
						type="text"
						placeholder="아이디 입력"
						required
						@input="idCheck"
						@keydown="removeSlash"
					></b-form-input>
				</b-form-group>
				<b-alert :show="showAlertId" :variant="alertVariantId">{{ alertMessageId }}</b-alert>

				<b-form-group id="fuser_name" label="사용자 이름:" label-for="user_name">
					<b-form-input
						id="user_name"
						type="text"
						v-model="form.userName"
						placeholder="이름 입력"
						required
					></b-form-input>
				</b-form-group>

				<b-form-group id="fuser_email" label="사용자 이메일:" label-for="user_email">
					<b-form-input
						id="user_email"
						type="text"
						v-model="form.email"
						placeholder="이메일 입력"
						required
					></b-form-input>
				</b-form-group>

				<b-form-group id="fuser_password" label="사용자 패스워드:" label-for="user_password">
					<b-form-input
						id="user_password"
						type="password"
						v-model="form.userPassword"
						placeholder="패스워드 입력"
						required
					></b-form-input>
				</b-form-group>

				<b-form-group id="fcheck_password" label="패스워드 확인:" label-for="check_password">
					<b-form-input
						id="check_password"
						type="password"
						v-model="form.checkPassword"
						placeholder="패스워드 확인"
						required
						@input="pwdCheck"
					></b-form-input>
				</b-form-group>
				<b-alert :show="showAlertPwd" :variant="alertVariantPwd">{{ alertMessagePwd }}</b-alert>

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

				<b-button variant="white" class="btn-outline-danger m-2" to="/login">로그인</b-button>
				<b-button type="submit" variant="primary" class="m-2">회원가입</b-button>
			</b-form>
		</b-container>
	</div>
</template>
<script>
import { isPossibleId, regist } from '@/api/member';

export default {
	name: 'RegistView',
	data() {
		return {
			form: {
				userId: '',
				userName: '',
				userPassword: '',
				checkPassword: '',
				email: '',
			},
			showAlertId: false,
			alertMessageId: '',
			alertVariantId: 'danger',
			showAlertPwd: false,
			alertMessagePwd: '',
			alertVariantPwd: 'danger',
			showModalRegistSuccess: false,
			showModalRegistFail: false,
			showModalRegist: false,
			ModalRegistMessage: '',
		};
	},
	methods: {
		onSubmit(event) {
			event.preventDefault();
			if (this.form.userId.length < 6 || this.form.userId.length > 16) {
				this.ModalRegistMessage = '아이디를 확인해주세요!';
				this.showModalRegist = true;
				return;
			}
			if (this.form.userPassword != this.form.checkPassword) {
				this.ModalRegistMessage = '비밀번호를 확인해주세요!';
				this.showModalRegist = true;
				return;
			}
			regist(this.form, ({ data }) => {
				if (data === 'success') {
					this.showModalRegistSuccess = true;
				} else {
					this.showModalRegistFail = true;
				}
			});
		},
		onResetAll() {
			// Reset our form values
			this.showAlertId = false;
			this.showAlertPwd = false;
			this.form.userId = '';
			this.form.userName = '';
			this.form.userPassword = '';
			this.form.checkPassword = '';
			this.form.email = '';
		},
		moveLogin() {
			this.$router.push(`/login`);
		},
		removeSlash(event) {
			if (event.key === '/') {
				event.preventDefault();
				this.alertMessageId = "/ 입력이 불가능 합니다.";
				this.alertVariantId = 'danger';
				this.showAlertId = true;
				this.form.userId = this.form.userId.replace(/\//g, '');
			}
		},
		idCheck() {
			var regex = /[!@#$%^&*()/,.?":{}|<>]/;
			if(regex.test(this.form.userId.test)) {
				this.alertMessageId = "문자열에 특수 문자가 포함되어 있습니다.";
				this.alertVariantId = 'danger';
				this.showAlertId = true;
			}
			else if (this.form.userId.length < 6 || this.form.userId.length > 16) {
				this.alertMessageId = '아이디는 6자 이상 16자 이하 입니다.';
				this.alertVariantId = 'danger';
				this.showAlertId = true;
			} else {
				isPossibleId(this.form.userId, ({ data }) => {
					if (data == 0) {
						this.alertVariantId = 'primary';
						this.alertMessageId = '사용가능한 아이디 입니다.';
					} else {
						this.alertVariantId = 'danger';
						this.alertMessageId = '중복된 아이디 입니다.';
					}
				});
			}
		},
		pwdCheck() {
			if (this.form.userPassword === this.form.checkPassword) {
				this.alertMessagePwd = '비밀번호가 일치합니다.';
				this.alertVariantPwd = 'primary';
				this.showAlertPwd = true;
			} else {
				this.alertMessagePwd = '비밀번호가 일치하지 않습니다.';
				this.alertVariantPwd = 'danger';
				this.showAlertPwd = true;
			}
		},
	},
};
</script>
<style></style>
