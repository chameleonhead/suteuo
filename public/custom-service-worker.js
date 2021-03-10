/* eslint-disable no-restricted-globals */
addEventListener("install", (e) => {
  console.log(e);
});
addEventListener("message", (e) => {
  console.log(e);
});
addEventListener("push", (e) => {
  if (!e.data) {
    return;
  }
  // ペイロードを JSON 形式でパース
  const payload = e.data.json();
  console.log(payload);
});
