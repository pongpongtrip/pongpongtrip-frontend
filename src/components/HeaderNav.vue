<template>
    <header id="header" class="fixed-top d-flex align-items-center header-transparent">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="logo">
          <h1 class="text-light">
            <router-link to="/">
              <span>TRIP</span>
            </router-link>
          </h1>
        </div>
        <nav id="navbar" class="navbar">
          <ul>
            <li>
              <router-link to="/" class="active">홈</router-link>
            </li>
            <li>
              <router-link to="/attraction/tripsearch">지역별여행지</router-link>
            </li>
            <li>
              <router-link to="/tripplan">나의여행계획</router-link>
            </li>
            <li>
              <a href="#">핫플자랑하기</a>
            </li>
            <li>
              <router-link to="/board">여행정보공유</router-link>
            </li>
            <li class="dropdown">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                <span v-if="loggedInUser">{{ loggedInUser.name }} 님</span>
                <i class="bi bi-chevron-down"></i>
              </a>
              <ul v-if="loggedInUser">
                <li v-if="loggedInUser.admin">
                  <router-link to="/member/adminPage" class="btn">관리자 페이지</router-link>
                </li>
                <li>
                  <router-link :to="'/member/memberInfo/' + loggedInUser.id" class="btn">회원 정보</router-link>
                </li>
                <li>
                  <a @click.prevent="logout" class="btn">로그아웃</a>
                </li>
              </ul>
              <ul v-else>
                <li>
                  <router-link to="/member/login" class="btn">로그인</router-link>
                </li>
                <li>
                  <router-link to="/member/regist" class="btn">회원가입</router-link>
                </li>
              </ul>
            </li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderNav',
    data() {
          return {
              loggedInUser: null,
          };
    },
    mounted() {
          this.getUser();
    },
    methods: {
          getUser() {
            console.log("유저 가져오기");
          }
      },
}
</script>
<style>
@import "../assets/css/app.css";
@import "../assets/css/style.css";
</style>