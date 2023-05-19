<template>
  <div>
    <header></header>
    <main id="main" class="pt-5">
      <div class="container">
        <div class="row pt-3 text-center text-decoration-underline">
          <h4>수정하기</h4>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10 col-sm-12">
            <b-form @submit.prevent="submitForm">
              <input type="hidden" name="articleNo" v-model="article.articleNo" />
              <b-form-group label="제목 : " label-for="subject" class="mb-3">
                <b-form-input id="subject" name="subject" v-model="article.subject"></b-form-input>
              </b-form-group>
              <b-form-group label="내용 : " label-for="content" class="mb-3">
                <b-form-textarea id="content" name="content" v-model="article.content" rows="7"></b-form-textarea>
              </b-form-group>
              <div class="col-auto text-center">
                <b-button type="submit" variant="outline-primary" class="mb-3">글수정</b-button>
                <b-button @click="goToList" variant="outline-danger" class="mb-3">목록으로 이동...</b-button>
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import http from "@/api/httpDefault.js";

export default {
  data() {
    return {
      // pgno: '',
      // key: '',
      // word: '',
      article: {
        articleNo: '',
        subject: '',
        content: '',
      },
    };
  },
  created() {
    http
              .get("/board/view", {params: {
					articleNo:this.$store.state.articleNo,
				}})
              .then((response) => {
                    console.log(response.data);
                    this.article.articleNo = response.data.articleNo;
                    this.article.subject = response.data.subject;
                    // this.article.userId = response.data.userId;
                    // this.article.registerTime = response.data.registerTime;
                    // this.article.hit = response.data.hit;
                    this.article.content = response.data.content;
                    // this.article.fileInfos = response.data.fileInfos;

                    // this.userinfo.userId = response.data.userId;
              });
  },
  methods: {
    submitForm() {
      event.preventDefault();
      if (!this.article.subject) {
        alert('제목 입력!!');
        return;
      } else if (!this.article.content) {
        alert('내용 입력!!');
        return;
      } else {
        console.log(JSON.stringify(this.article));
        http
          .post('/board/modify', JSON.stringify(this.article))
          .then((response) => { 
            console.log(response.data);
            this.$router.push("/tripboard").catch(() => { });
        });
      }
    },
    goToList() {
            this.$router.push("/tripboard").catch(() => { });
    },
  },
};
</script>
