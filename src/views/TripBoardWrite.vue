<template>
    <div>
      <!-- ======= Header ======= -->
      <header>
        <div><!-- Include your header content here --></div>
      </header>
  
      <main id="main" class="pt-5">
        <b-container>
          <div class="col justify-content-center">
            <div class="col pt-3 text-center text-decoration-underline">
              <h4>글쓰기</h4>
            </div>
            
            <div class="row justify-content-center">
              <b-form @submit.prevent="submitForm" id="form-register" enctype="multipart/form-data">
                <!-- <input type="hidden" name="pgno" v-model="pgno" />
                <input type="hidden" name="key" v-model="key" />
                <input type="hidden" name="word" v-model="word" /> -->
                <b-form-group id="subjectGroup" label="제목 : " label-for="subject">
                  <b-form-input
                    id="subject"
                    v-model="form.subject"
                    placeholder="제목..."
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="contentGroup" label="내용 : " label-for="content">
                  <b-form-textarea
                    id="content"
                    v-model="form.content"
                    rows="7"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group id="fileGroup" label="파일 : " label-for="file">
                  <b-form-file
                    id="upfile"
                    v-model="form.upfile"
                    multiple
                  ></b-form-file>
                </b-form-group>
                <div class="col-auto text-center">
                  <b-button type="submit" variant="outline-primary" class="mb-3">
                    글쓰기
                  </b-button>
                  <b-button
                    variant="outline-danger"
                    class="mb-3"
                    @click="goToList"
                  >
                    목록으로 이동...
                  </b-button>
                </div>
              </b-form>
            </div>
          </div>
          <!-- <form id="form-param" method="get" action="">
            <input type="hidden" id="pgno" name="pgno" v-model="pgno" />
            <input type="hidden" id="key" name="key" v-model="key" />
            <input type="hidden" id="word" name="word" v-model="word" />
          </form> -->
        </b-container>
      </main>
    </div>
  </template>

<script>
import http from "@/api/httpDefault.js";

export default {
    name: 'boardWrite',
    components: {},
    data() {
        return {
            form: {
				subject: "",
				content: "",
				upfile: "",
			},
            message: '',
        };
    },
    created() {},
    methods: {
        submitForm: function (event) {
            event.preventDefault();
            console.log(this.form.subject);
            console.log(this.form.content);
            console.log(this.form.upfile);
            http
              .post(`/board/write`, JSON.stringify(this.form))
              .then((response) => {
                console.log(response.data);
                          this.$router.push('/tripboard').catch(() => { console.log("화면 이동 에러") });
              });
            
        },
        goToList: function () {
            this.$router.push('/tripboard').catch(() => { console.log("화면 이동 에러") });
        }
    },
};
</script>

<style scoped>
#form-register {
    width: 60%;
}
button {
    margin: 2px;
}
</style>