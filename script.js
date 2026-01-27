// DOM が読み込まれてから実行
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("my-btn");

  btn.addEventListener("click", function () {

    const announceEl = document.getElementById("announce");
    const announce = announceEl.value || announceEl.placeholder;

    const message = document.getElementById("message").value;
    const result  = document.getElementById("result");
    const diffEl  = document.getElementById("diff");

    result.style.display = "block";
    diffEl.innerHTML = "";

    if (message.trim() === "") {
      result.textContent = "照合したいアナウンスを入力してください ⚠️";
      result.style.color = "yellow";
      return;
    }

    if (announce.trim() === message.trim()) {
  result.textContent = "一致しています ✅";
  result.style.color = "lime";
  diffEl.style.display = "none";
} else {
  result.textContent = "一致していません ❌";
  result.style.color = "red";
  diffEl.style.display = "block";

  let html = "";
  const maxLen = Math.max(announce.length, message.length);

  for (let i = 0; i < maxLen; i++) {
    const a = announce[i] || "";
    const m = message[i] || "";

    if (a === m) {
      html += a;
    } else {
      html += `<span class="diff-wrong">${a || "□"}</span>`;
    }
  }

  diffEl.innerHTML = html;
}
  });
});
