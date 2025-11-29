export const getAccessToken = () => sessionStorage.getItem("accessToken");
export const setAccessToken = (t) => sessionStorage.setItem("accessToken", t);
export const clearAccessToken = () => sessionStorage.removeItem("accessToken");