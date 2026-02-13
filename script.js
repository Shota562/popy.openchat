const MAINTENANCE_MODE = true; // ← 本番時は false

document.addEventListener("DOMContentLoaded", () => {

  // --- 開発者用メンテ解除 (?dev=1 でメンテ無効)
  const urlParams = new URLSearchParams(window.location.search);
  const isDev = urlParams.get("dev") === "1";

  // --- メンテナンスモード ---
  if (MAINTENANCE_MODE && !isDev) {
    document.body.innerHTML = `
      <div style="text-align:center;margin-top:30px;font-size:10px;">
        <h1>🔧 ただいまメンテナンス中です</h1>
        <p>現在ツールはご利用いただけません。<br>
        メンテナンスが終了次第、再度ご利用可能になります。</p>
        <p>ご迷惑をおかけしますがご了承くださいませ。</p>
      </div>`;
    return;
  }

  // -------------------------
  // ここから通常処理
  // -------------------------

  // 照合
  const announceEl = document.getElementById("announce");
  const btn = document.getElementById("my-btn");

  btn.addEventListener("click", () => {
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
      diffEl.innerHTML = "";
    } else {
      result.textContent = "一致していません ❌";
      result.style.color = "red";

      let html = "";
      const maxLen = Math.max(announce.length, message.length);

      for (let i = 0; i < maxLen; i++) {
        const a = announce[i] || "";
        if (a === message[i]) {
          html += a;
        } else {
          html += `<span class="diff-wrong">${a || "□"}</span>`;
        }
      }
      diffEl.innerHTML = html;
    }
  });

  // 管理者ログイン
  const ADMIN_PASSWORD_HASH =
    "ab15b78885d5043704c07d8ffa7266baecf94064c072186a9a348a1831c7aa8a";

  const loginBtn = document.getElementById("login-btn");
  const passInput = document.getElementById("admin-pass");

  async function sha256(text) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  }

  loginBtn.addEventListener("click", async () => {
    if (!passInput.value.trim()) {
      alert("パスワードを入力してください");
      return;
    }

    const inputHash = await sha256(passInput.value);
    if (inputHash !== ADMIN_PASSWORD_HASH) {
      alert("パスワードが一致しません");
      return;
    }

    window.location.href = "admin.html";
  });

});
