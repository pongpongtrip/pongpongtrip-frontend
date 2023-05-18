<template>
    <div>
      <header></header>
      <main id="main" class="pt-5">
        <div class="container">
          <div class="col justify-content-center">
            <div class="col pt-3 text-center text-decoration-underline">
              <h4>상세보기</h4>
            </div>
            <div class="col">
              <div class="row my-2">
                <h2 class="text-secondary px-5">{{ article.articleNo }}. {{ article.subject }}</h2>
              </div>
              <div class="col">
                <div class="col-md-8">
                  <div class="row">
                    <b-avatar
                      class="me-2 float-md-start bg-light p-2"
                      :src="avatarSrc"
                      alt="Avatar"
                    ></b-avatar>
                    
                    <p class="userId fw-bold">{{ article.userId }}</p> <br />
                    
                  </div>
                </div>
                <p class="right text-secondary fw-light">{{ article.registerTime }} 조회: {{ article.hit }}</p>
  <!--               <div class="col-md-4 align-self-center text-end">댓글 : 17</div> -->
                <hr class="mb-3" />
                <div class="content text-secondary">
                  {{ article.content }}
                </div>
                <div v-if="article.fileInfos" class="mt-3">
                  <ul>
                    <li class="row justify-content-start" v-for="file in article.fileInfos" :key="file.originalFile">
                      {{ file.originalFile }} <a :href="fileDownloadLink(file.saveFolder, file.originalFile, file.saveFile)">[다운로드]</a>
                    </li>
                  </ul>
                </div>
                <hr class="mt-3 mb-3" />
                <div class="d-flex justify-content-end">
                  <b-button @click="goToList" variant="outline-primary" class="mb-3">글목록</b-button>
                  <template v-if="isCurrentUserArticleOwner">
                    <b-button @click="goToModify" variant="outline-success" class="mb-3 ms-1">글수정</b-button>
                    <b-button @click="confirmDelete" variant="outline-danger" class="mb-3 ms-1">글삭제</b-button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import http from "@/api/http.js";
  
  export default {
    name: "boardDeatil",
    components: {

    },
    props: {
          detail: {
            type: Array,
        }
    },
    data() {
      return {
        article: {  // Replace with your article object
          articleNo: 1,
          subject: 'Sample Subject',
          userId: 'john123',
          registerTime: '2023-05-18',
          hit: 10,
          content: 'Sample content',
          fileInfos: [
            { originalFile: 'file1.pdf', saveFolder: 'folder1', saveFile: 'file1-123456789.pdf' },
            { originalFile: 'file2.pdf', saveFolder: 'folder2', saveFile: 'file2-987654321.pdf' },
          ],
        },
        userinfo: {  // Replace with your user info object
          userId: 'john123',
        },
      };
    },
    created() {
        console.log(this.$store.articleNo);
        http
              .get("/board/view", {params: {
					articleNo:this.$store.state.articleNo,
				}})
              .then((response) => {
                    console.log(response.data);
                    this.article.articleNo = response.data.articleNo;
                    this.article.subject = response.data.subject;
                    this.article.userId = response.data.userId;
                    this.article.registerTime = response.data.registerTime;
                    this.article.hit = response.data.hit;
                    this.article.content = response.data.content;
                    this.article.fileInfos = response.data.fileInfos;

                    this.userinfo.userId = response.data.userId;
              });
    },
    computed: {
      avatarSrc() {
        return 'https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg';
      },
      isCurrentUserArticleOwner() {
        return this.userinfo.userId === this.article.userId;
      },
    },
    methods: {
      fileDownloadLink(saveFolder, originalFile, saveFile) {
        return `${this.root}/file/download/${saveFolder}/${originalFile}/${saveFile}`;
      },
      goToList() {
            this.$router.push("/tripboard").catch(() => { });
      },
      goToModify() {
        this.$router.push("/tripboard/modify").catch(() => { });
      },
      confirmDelete() {
        if (confirm('정말 삭제하시겠습니까?')) {
            http
                .get("/board/delete", {
                    params: {
                        articleNo:this.article.articleNo,
                    }
                })
                .then((response) => { 
                    console.log(response.data);
                    this.$router.push('/tripboard').catch(() => { });
                });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .userId {
    text-align: left;
  }
  .content {
    text-align: left;
  }

  .right {
    text-align: right;
  }
  </style>