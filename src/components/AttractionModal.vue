<template>
    <div>
      <b-modal :visible="modalVisible" title="상세 정보" @hide="resetModal" >
        <div>
          <h4>{{ name }}</h4>
          <p>{{ address }}</p>
          <img :src="image" alt="이미지">
          <p>{{ description }}</p>
          <a :href="website" target="_blank">{{ website }}</a>
        </div>
        <template #modal-footer>
            <b-button variant="secondary" @click="$emit('close-modal')">닫기</b-button>
        </template>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        modalVisible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
      return {
        name: '이름',
        address: '주소',
        image: '이미지 URL',
        description: '상세 설명',
        website: '홈페이지 URL',
      };
    },
    methods: {
        resetModal() {
            this.$emit('close-modal');
        },
    },
  };
  </script>