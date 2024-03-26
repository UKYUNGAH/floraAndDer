import { API_URL } from "/public/js/constants.js";
// import { API_URL } from '/public/js/constants.js'
const token = localStorage.getItem("jwt");
if (!token) {
  alert("관리자 계정으로 접속해 주세요");
}

const getUsers = async () => {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`${API_URL}admin/users`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");
  }
  const userDatas = await res.json();
  if (userDatas.error === "jwt expired") {
    localStorage.removeItem("jwt");
    alert("로그인 인증이 만료되었습니다");
    location.href = "/user/login.html";
    return false;
  }
  const adminContainerEl = document.querySelector(".admin-container");
  userDatas.data.forEach((data) => {
    adminContainerEl.insertAdjacentHTML(
      "beforeend",
      `
      <div class="admin-user-data">
      <p class="user-id-num">${data._id}</p>
      <p class="user-name">${data.user_name}</p>
      <p class="user-phone-num">${data.phone_number}</p>
      <p class="user-email">${data.email}</p>
      <p class="user-address">${data.address}, ${data.address_detail}</p>
      <p class="user-createdAt">${data.createdAt.slice(0, 10)}</p>
    </div>
        `
    );
  });
};
getUsers();

//logOut
const logOut_btn = document.querySelector(".logOut-btn");
logOut_btn.addEventListener("click", () => {
  localStorage.removeItem("jwt");
});
