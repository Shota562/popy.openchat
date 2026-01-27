// DOM が読み込まれてから実行
document.addEventListener("DOMContentLoaded", () => {

  const ADMIN_PASSWORD_HASH =
    "60adefa4285c915503edaacc67fd6ba93144534c0f4e2992efbfee695a8e13d6";

  const loginBtn = document.getElementById("login-btn");
  const passInput = document.getElementById("admin-pass");

  const maintenance = document.getElementById("maintenance");
  const mainContent = document.getElementById("main-content");

  async function sha256(text) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return [...new Uint8Array(buf)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  loginBtn.addEventListener("click", async () => {

    // ① 未入力チェック
    if (passInput.value.trim() === "") {
      alert("パスワードを入力してください");
      return;
    }

    // ② ハッシュ化して比較
    const inputHash = await sha256(passInput.value);

    if (inputHash !== ADMIN_PASSWORD_HASH) {
      alert("パスワードが一致しません");
      return;
    }

    // ③ 一致した場合
    maintenance.style.display = "none";
    mainContent.style.display = "block";

  });

  // -------------------------------
  // 照合ボタン処理も同じDOMContentLoaded内に入れる
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
