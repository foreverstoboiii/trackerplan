// Загружаем задачи из localStorage (или создаём пустой массив)
let habits = JSON.parse(localStorage.getItem("habits")) || [];


// ====== Добавление новой задачи ======
function addHabit() {
    const input = document.getElementById("plans");
    const value = input.value.trim();

    if (value === "") return;

    // Добавляем объект с текстом и состоянием чекбокса
    habits.push({ text: value, completed: false });
    localStorage.setItem("habits", JSON.stringify(habits));

    input.value = "";
    renderHabits();
}


// ====== Отображение всех задач ======
function renderHabits() {
    const container = document.getElementById("habitdisplay");
    container.innerHTML = "";

    habits.forEach((habit, index) => {
        container.innerHTML += `
            <div class="habit-item">  
                <label class="checkbox-wrapper">
                    <input type="checkbox" class="checkbox"
                        ${habit.completed ? "checked" : ""}
                        onchange="toggleCompleted(${index})">
                    <span class="custom-checkbox"></span>
                    ${habit.text}
                </label>
                <button class="delete-button" onclick="deleteHabit(${index})">Delete</button>
            </div>
            <hr>
        `;
    });
}


// ====== Обработка переключения галочки (чекбокса) ======
function toggleCompleted(index) {
    habits[index].completed = !habits[index].completed;
    localStorage.setItem("habits", JSON.stringify(habits));
}


// ====== Удаление задачи ======
function deleteHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}


// ====== Обработка клавиши Enter ======
document.getElementById("plans").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addHabit();
    }
});


// ====== Темная / светлая тема ======
const togglebutton = document.getElementById('themetoggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    togglebutton.innerHTML = '<i class="fas fa-moon"></i>';
} else {
    document.body.classList.remove('dark-mode');
    togglebutton.innerHTML = '<i class="fas fa-sun"></i>';
}

togglebutton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        togglebutton.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        togglebutton.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    }
});


// ====== Показываем задачи при загрузке страницы ======
renderHabits();
