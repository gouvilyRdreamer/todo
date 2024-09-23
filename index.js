const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        add(todo);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault(); //デフォルトのイベントを発生しないように中断できる
    add(); //画面に追加
});

function add(todo) {
    let todoText = input.value.trim();

    if (todo) {
        todoText = todo.text;
    }

    if (todoText && !isDuplicate(todoText)) { // 重複チェックを追加
        const li = document.createElement("li");

        li.innerText = todoText;
        li.classList.add("list-group-item"); //HTMLのliにclassを追加

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        //クリックで完了（打ち消し線）
        li.addEventListener("click", function() {
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        // 右クリックで削除（デスクトップ向け）
         li.addEventListener("contextmenu", function (event) { //contextmenu で右クリック検知
            event.preventDefault(); // 右クリックのデフォルトイベントをブロック
            if (confirm("本当に削除しますか？")) {
                li.remove();
                saveData();
            }
        });

        // スマホ向けの長押し検知
        let touchDuration = 0;
        let touchTimer;

        li.addEventListener("touchstart", function() {
            touchTimer = setTimeout(function() {
                if (confirm("本当に削除しますか？")) {
                    li.remove();
                    saveData();
                }
            }, 500); // 500ミリ秒で長押しとみなす
        });

        li.addEventListener("touchend", function() {
            clearTimeout(touchTimer); // タイマーをクリア
        });

        ul.appendChild(li); //ulのこどもとしてliを追加
        input.value = "";
        saveData(); //画面リロードしても消えないように保存
    }
}

function isDuplicate(todoText) {
    const items = ul.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        if (items[i].innerText === todoText) {
            return true; // 重複している場合
        }
    }
    return false; // 重複していない場合
}

function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];

    lists.forEach((li) => {
        todos.push({
            text: li.innerText,
            completed: li.classList.contains("text-decoration-line-through"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}
