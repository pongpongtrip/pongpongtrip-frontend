<template>
  <div class="memberlist">
    <h2 class="mt-4">회원 목록</h2>
    <b-container>
      <b-row class="d-flex justify-content-between">
        <b-button v-b-modal.modal-regist variant="outline-primary">회원등록</b-button>
        <!--form  start-->
        <b-form inline class="justify-content-md-center">
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
        <!--form  end-->
      </b-row>
      <!-- 회원 목록 list start -->
      <div class="mt-4">
        <b-table hover :items="member_list" :fields="fields">
          <template #cell(updateDelete)="row">
            <b-button-group>
              <b-button variant="outline-primary" size="sm" @click="handleUpdate(row.item)"
                >수정</b-button
              >
              <b-button variant="outline-danger" size="sm" @click="handleDelete(row.item)"
                >삭제</b-button
              >
            </b-button-group>
          </template></b-table
        >
      </div>
      <!-- 회원 목록 list end -->
    </b-container>

    <!-- 회원등록 모달 start -->
    <b-modal
      id="modal-regist"
      title="회원등록"
      @show="resetModal"
      @ok="handleOk"
      ok-title="회원가입"
    >
      <b-form @submit.stop.prevent="handleSubmit">
        <b-form-group
          id="user_id"
          label="사용자 아이디:"
          label-for="user_id"
          invalid-feedback="아이디를 입력해주세요"
        >
          <b-form-input
            id="user_id"
            v-model="form_regist.userId"
            type="text"
            placeholder="아이디 입력"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="user_name"
          label="사용자 이름:"
          label-for="user_name"
          invalid-feedback="이름을 입력해주세요"
        >
          <b-form-input
            id="user_name"
            type="text"
            v-model="form_regist.userName"
            placeholder="이름 입력"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="user_password"
          label="사용자 패스워드:"
          label-for="user_password"
          invalid-feedback="비밀번호를 입력해주세요"
        >
          <b-form-input
            id="user_password"
            type="password"
            v-model="form_regist.userPassword"
            placeholder="패스워드 입력"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="password_check"
          label="패스워드 확인:"
          label-for="password_check"
          invalid-feedback="비밀번호를 입력해주세요"
        >
          <b-form-input
            id="password_check"
            type="password"
            placeholder="패스워드 확인"
            required
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
      </b-form>
    </b-modal>
    <!-- 회원등록 모달 end -->
  </div>
</template>
<script>
export default {
  name: "MemberList",
  data() {
    return {
      form_regist: {
        userId: "",
        userName: "",
        userGrade: "",
      },
      form_search: {
        search_key: "",
        search_keyword: "",
      },
      search_keys: [
        { text: "검색조건", value: "" },
        { text: "아이디", value: "userid" },
        { text: "이름", value: "username" },
      ],
      fields: [
        //key 값 임시로 해둠  나중에 수정 필요
        { key: "userId", label: "아이디" },
        { key: "userPassword", label: "비밀번호" },
        { key: "userName", label: "이름" },
        { key: "joinDate", label: "가입일" },
        { key: "updateDelete", label: "수정/삭제" },
      ],
      member_list: [
        // 여기에 데이터 넘겨주기
        { userId: "ssafy1", userPassword: "1234", userName: "김싸피", joinDate: "2020-05-16" },
        { userId: "ssafy2", userPassword: "4567", userName: "이쌉피", joinDate: "2020-05-01" },
        { userId: "ssafy3", userPassword: "1111", userName: "뷰신이찬민", joinDate: "2020-05-20" },
      ],
    };
  },
  methods: {
    resetModal() {
      this.form.userId = "";
      this.form.userName = "";
      this.form.userGrade = "";
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return;
      // }
      // Push the name to submitted names
      //데이터 보냄
      // this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    handleUpdate(member) {
      // Handle update action for the member
      console.log("Update member:", member);
      // Implement your logic for updating the member
    },
    handleDelete(member) {
      // Handle delete action for the member
      console.log("Delete member:", member);
      // Implement your logic for deleting the member
    },
  },
};
</script>
