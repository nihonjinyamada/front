document.addEventListener("DOMContentLoaded", function () {
    const recommendButton = document.getElementById("getRecommendation");
    const outputDiv = document.getElementById("output");
    let selectedGenre = null;
    let selectedTech = null;

    // ジャンルボタンの処理
    document.querySelectorAll(".genre-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".genre-btn").forEach(b => b.classList.remove("selected"));
            button.classList.add("selected");
            selectedGenre = button.getAttribute("data-genre");
        });
    });

    // 技術分野ボタンの処理
    document.querySelectorAll(".tech-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("selected"));
            button.classList.add("selected");
            selectedTech = button.getAttribute("data-tech");
        });
    });

    // おすすめボタンの処理
    recommendButton.addEventListener("click", async () => {
        outputDiv.innerHTML = ""; 

        if (!selectedGenre || !selectedTech) {
            outputDiv.innerHTML = `<p class="error-message">ジャンルと技術分野を選択してください。</p>`;
            return;
        }

        outputDiv.innerHTML = "<p class='loading-message'>データを取得中...</p>";

        try {
            const response = await fetch("https://back-2z0c.onrender.com/generate/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    ジャンル: selectedGenre,  
                    技術分野: selectedTech    
                })
            });

            if (!response.ok) {
                throw new Error("サーバーエラー");
            }

            const data = await response.json();

            outputDiv.innerHTML = `
                <p><strong>データセットURL:</strong> <a href="${data['データセットURL']}" target="_blank">${data['データセットURL']}</a></p>
                <p><strong>データ概要:</strong> ${data['データ概要']}</p>
                <p><strong>アプリまたはツール名:</strong> ${data['アプリまたはツール名']}</p>
                <p><strong>アプリまたはツールの説明:</strong> ${data['アプリまたはツールの説明']}</p>
            `;

        } catch (error) {
            console.error("エラー:", error);
            outputDiv.innerHTML = `<p class="error-message">サーバーに接続できませんでした。</p>`;
        }
    });
});