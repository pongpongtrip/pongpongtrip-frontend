<template>
	<!--slide start  -->
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand href="#">Trip</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item to="/">홈</b-nav-item>
					<b-nav-item to="/tripsearch">지역별 여행지</b-nav-item>
					<b-nav-item to="/myplan">나의여행계획</b-nav-item>
					<b-nav-item to="/tripboard">여행정보 공유</b-nav-item>
					<b-nav-item to="/hotplace">핫 플레이스</b-nav-item>

					<!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template #button-content>
							<b-icon icon="person-circle"></b-icon>
							<!-- <em>User</em> -->
						</template>
						<b-dropdown-item to="/login"> 로그인</b-dropdown-item>
						<b-dropdown-item to="/regist"> 회원가입</b-dropdown-item>
						<b-dropdown-item to="/memberinfo"> 회원정보</b-dropdown-item>
						<b-dropdown-item to="/logout"> 로그아웃</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
	<!--slide end  -->
</template>
<script>
export default {
	name: 'TheHeaderNaviBar',
	components: {},
	data() {
		return {
			message: '',
		};
	},
};
</script>
