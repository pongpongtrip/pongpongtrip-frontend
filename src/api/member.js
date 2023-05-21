import { apiInstance } from './http.js';

const api = apiInstance();

async function login(user, success, fail) {
	await api.post(`/member/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
	api.defaults.headers['access-token'] = sessionStorage.getItem('access-token');
	await api.get(`/member/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
	api.defaults.headers['refresh-token'] = sessionStorage.getItem('refresh-token'); //axios header에 refresh-token 셋팅
	await api.post(`/member/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
	await api.get(`/member/logout/${userid}`).then(success).catch(fail);
}

async function isPossibleId(userId, success, fail) {
	await api.get(`/member/${userId}`).then(success).catch(fail);
}

async function regist(user, success, fail) {
	await api.post(`/member/regist`, user).then(success).catch(fail);
}

async function isCorrectPwd(user, success, fail) {
	await api.post(`/member/checkpassword`, JSON.stringify(user)).then(success).catch(fail);
}

async function update(user, success, fail) {
	await api.post(`member/update`, JSON.stringify(user)).then(success).catch(fail);
}

async function deleteMember(userid, success, fail) {
	await api.get(`member/delete/${userid}`).then(success).catch(fail);
}

async function userlist(success, fail) {
	await api.get(`admin/user/list`).then(success).catch(fail);
}

export {
	login,
	findById,
	tokenRegeneration,
	logout,
	isPossibleId,
	regist,
	isCorrectPwd,
	update,
	deleteMember,
	userlist,
};
