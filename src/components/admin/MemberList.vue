<template>
	<div class="memberlist">
		<h2 class="mt-4">회원 목록</h2>
		<b-container>
			<b-modal v-model="showModalDel" title="😭탈퇴😭" @ok="onClickDel">
				<p class="my-4">정말 탈퇴하시겠습니까? 😢</p>
			</b-modal>
			<b-modal v-model="showModalFin" title="확인😊" ok-only>
				<p class="my-4">{{ modalFinMessage }}</p>
			</b-modal>
			<b-modal v-model="showModalCheck" title="확인😊" @ok="fetchMemberList">
				<p class="my-4">수정완료</p>
			</b-modal>
			<b-modal v-model="showModalRegistSuccess" title="Regist😊" @ok="fetchMemberList" ok-only>
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
			<b-modal v-model="showModalRegistCheck" title="Check Please😊" ok-only>
				<p class="my-4">{{ ModalRegistMessage }}</p>
			</b-modal>
			<b-modal v-if="showModalUpdate" v-model="showModalUpdate" title="회원 수정">
				<b-form>
					<b-form-group id="update_user_id" label="사용자 아이디:" label-for="update_user_id">
						<b-form-input
							id="update_user_id"
							v-model="updateForm.userId"
							type="text"
							placeholder="아이디 입력"
							required
							readonly
						></b-form-input>
					</b-form-group>
					<b-form-group id="update_user_name" label="사용자 이름:" label-for="update_user_name">
						<b-form-input
							id="update_user_name"
							v-model="updateForm.userName"
							type="text"
							placeholder="이름 입력"
							required
						></b-form-input>
					</b-form-group>
					<b-form-group id="update_user_email" label="사용자 이메일:" label-for="update_user_email">
						<b-form-input
							id="update_user_email"
							v-model="updateForm.email"
							type="email"
							placeholder="이메일 입력"
							required
						></b-form-input>
					</b-form-group>
					<b-form-group id="update_joinDate" label="가입 일:" label-for="update_joinDate">
						<b-form-input
							id="update_joinDate"
							v-model="updateForm.joinDate"
							type="text"
							required
							readonly
						></b-form-input>
					</b-form-group>
				</b-form>
				<template #modal-footer="{ cancel }">
					<b-button @click="cancel()"> Cancel </b-button>
					<b-button variant="primary" type="submit" @click="handleUpdateSubmit"> 수정 </b-button>
				</template>
			</b-modal>
			<b-row class="d-flex justify-content-between">
				<b-button @click="handleRegist()" variant="outline-primary">회원등록</b-button>
				<!--search form  start-->
				<b-form inline class="justify-content-md-center" @submit.prevent="searchMembers">
					<b-form-group id="search-key" class="mb-2 mr-sm-2 mb-sm-0">
						<b-form-select
							id="search-key"
							v-model="form_search.search_key"
							:options="search_keys"
							required
						></b-form-select>
					</b-form-group>
					<b-form-group id="search-keyword" class="mb-2 mr-sm-2 mb-sm-0">
						<b-form-input
							id="search-keyword"
							v-model="form_search.search_keyword"
							type="search"
							placeholder="검색어"
							required
						></b-form-input>
					</b-form-group>
					<b-button type="submit" variant="primary">검색</b-button>
				</b-form>
				<!--search form  end-->
			</b-row>
			<!-- 회원 목록 list start -->
			<div class="mt-4">
				<b-table
					hover
					:items="member_list"
					:fields="fields"
					:per-page="perPage"
					:current-page="currentPage"
				>
					<template #cell(updateDelete)="row">
						<b-button-group>
							<b-button variant="outline-primary" size="sm" @click="handleUpdate(row.item)"
								>수정</b-button
							>
							<b-button variant="outline-danger" size="sm" @click="handleDelete(row.item)"
								>삭제</b-button
							>
						</b-button-group>
					</template>
				</b-table>
				<b-pagination
					v-model="currentPage"
					:total-rows="member_list.length"
					:per-page="perPage"
					align="center"
				>
					<template #first-text><b-icon icon="chevron-double-left"></b-icon></template>
					<template #prev-text><b-icon icon="chevron-compact-left"></b-icon></template>
					<template #next-text><b-icon icon="chevron-compact-right"></b-icon></template>
					<template #last-text><b-icon icon="chevron-double-right"></b-icon></template>
				</b-pagination>
			</div>
			<!-- 회원 목록 list end -->
		</b-container>

		<!-- 회원등록 모달 start -->
		<b-modal
			id="modal-regist"
			title="회원등록"
			@show="resetModal"
			ok-title="회원가입"
			v-if="showModalRegist"
			v-model="showModalRegist"
		>
			<b-form @submit="onSubmit">
				<b-form-group id="fuser_id" label="사용자 아이디:" label-for="user_id">
					<b-form-input
						id="user_id"
						v-model="form_regist.userId"
						type="text"
						placeholder="아이디 입력"
						required
						@input="idCheck"
					></b-form-input>
				</b-form-group>
				<b-alert :show="showAlertId" :variant="alertVariantId">{{ alertMessageId }}</b-alert>

				<b-form-group id="fuser_name" label="사용자 이름:" label-for="user_name">
					<b-form-input
						id="user_name"
						type="text"
						v-model="form_regist.userName"
						placeholder="이름 입력"
						required
					></b-form-input>
				</b-form-group>

				<b-form-group id="fuser_email" label="사용자 이메일:" label-for="user_email">
					<b-form-input
						id="user_email"
						type="text"
						v-model="form_regist.email"
						placeholder="이메일 입력"
						required
					></b-form-input>
				</b-form-group>

				<b-form-group id="fuser_password" label="사용자 패스워드:" label-for="user_password">
					<b-form-input
						id="user_password"
						type="password"
						v-model="form_regist.userPassword"
						placeholder="패스워드 입력"
						required
					></b-form-input>
				</b-form-group>

				<b-form-group id="fcheck_password" label="패스워드 확인:" label-for="check_password">
					<b-form-input
						id="check_password"
						type="password"
						v-model="form_regist.checkPassword"
						placeholder="패스워드 확인"
						required
						@input="pwdCheck"
					></b-form-input>
				</b-form-group>
				<b-alert :show="showAlertPwd" :variant="alertVariantPwd">{{ alertMessagePwd }}</b-alert>
			</b-form>
			<template #modal-footer="{ cancel }">
				<b-button @click="cancel()"> Cancel </b-button>
				<b-button variant="primary" type="submit" @click="onSubmit"> 회원가입 </b-button>
			</template>
		</b-modal>
		<!-- 회원등록 모달 end -->
	</div>
</template>
<script>
import {
	userlist,
	deleteMember,
	update,
	isPossibleId,
	regist,
	userlistById,
	userlistByName,
} from '@/api/member';

export default {
	name: 'MemberList',
	data() {
		return {
			form_regist: {
				userId: '',
				userName: '',
				userPassword: '',
				checkPassword: '',
				email: '',
			},
			form_search: {
				search_key: '',
				search_keyword: '',
			},
			search_keys: [
				{ text: '검색조건', value: '' },
				{ text: '아이디', value: 'userid' },
				{ text: '이름', value: 'username' },
			],
			fields: [
				{ key: 'userId', label: '아이디' },
				{ key: 'userPassword', label: '비밀번호' },
				{ key: 'userName', label: '이름' },
				{ key: 'email', label: '이메일' },
				{ key: 'joinDate', label: '가입일' },
				{ key: 'updateDelete', label: '수정/삭제' },
			],
			member_list: null,
			showModalDel: false,
			showModalFin: false,
			modalFinMessage: '',
			selectedMember: null,
			showModalUpdate: false,
			showModalCheck: false,

			updateForm: {
				userId: null,
				userName: null,
				email: null,
				joinDate: null,
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
			showModalRegistCheck: false,
			ModalRegistMessage: '',
			currentPage: 1,
			perPage: 10,
		};
	},
	created() {
		this.fetchMemberList();
	},

	methods: {
		resetModal() {
			this.form_regist.userId = '';
			this.form_regist.userName = '';
			this.form_regist.userPassword = '';
			this.form_regist.checkPassword = '';
			this.form_regist.email = '';
		},
		handleRegist() {
			this.showModalRegist = true;
		},
		handleUpdate(member) {
			console.log('Update member:', member);
			this.updateForm = { ...member };
			this.showModalUpdate = true;
		},
		handleDelete(member) {
			this.showModalDel = true;
			this.selectedMember = member.userId;
			console.log('Delete member:', member);
		},
		onClickDel() {
			//delflag 바꾸고
			console.log(this.selectedMember);
			deleteMember(this.selectedMember, ({ data }) => {
				if (data === 'success') {
					//삭제완료 모달
					this.modalFinMessage = '탈퇴 완료';
					this.showModalFin = true;
					this.fetchMemberList();
				}
				if (data === 'fail') {
					this.modalFinMessage = '탈퇴 실패';
					this.showModalFin = true;
				}
			});
		},
		fetchMemberList() {
			userlist(({ data }) => {
				this.member_list = data;
				console.log(this.member_list);
			});
			this.showAlertId = false;
			this.showAlertPwd = false;
		},
		handleUpdateSubmit() {
			console.log('Update form submitted:', this.updateForm);
			update(this.updateForm, ({ data }) => {
				console.log(data);
			});
			this.showModalUpdate = false;
			this.showModalCheck = true;
		},
		idCheck() {
			if (this.form_regist.userId.length < 6 || this.form_regist.userId.length > 16) {
				this.alertMessageId = '아이디는 6자 이상 16자 이하 입니다.';
				this.alertVariantId = 'danger';
				this.showAlertId = true;
			} else {
				isPossibleId(this.form_regist.userId, ({ data }) => {
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
			if (this.form_regist.userPassword === this.form_regist.checkPassword) {
				this.alertMessagePwd = '비밀번호가 일치합니다.';
				this.alertVariantPwd = 'primary';
				this.showAlertPwd = true;
			} else {
				this.alertMessagePwd = '비밀번호가 일치하지 않습니다.';
				this.alertVariantPwd = 'danger';
				this.showAlertPwd = true;
			}
		},
		onSubmit(event) {
			event.preventDefault();
			if (this.form_regist.userId.length < 6 || this.form_regist.userId.length > 16) {
				this.ModalRegistMessage = '아이디를 확인해주세요!';
				this.showModalRegistCheck = true;
				return;
			}
			if (this.form_regist.userPassword != this.form_regist.checkPassword) {
				this.ModalRegistMessage = '비밀번호를 확인해주세요!';
				this.showModalRegistCheck = true;
				return;
			}
			regist(this.form_regist, ({ data }) => {
				if (data === 'success') {
					this.showModalRegist = false;
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
		searchMembers() {
			if (this.form_search.search_key === 'userid') {
				userlistById(this.form_search.search_keyword, ({ data }) => {
					this.member_list = data;
					console.log(this.member_list);
				});
			}

			if (this.form_search.search_key === 'username') {
				userlistByName(this.form_search.search_keyword, ({ data }) => {
					this.member_list = data;
					console.log(this.member_list);
				});
			}
		},
	},
};
</script>
