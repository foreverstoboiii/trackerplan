// ====== Загружаем сохранённые задачи из localStorage ======
// Если в localStorage ничего нет, создаём пустой массив
let habits = JSON.parse(localStorage.getItem("habits")) || [];


// ====== Функция добавления новой задачи ======
function addHabit() {
    const input = document.getElementById("plans");       // Получаем поле ввода
    const value = input.value.trim();                     // Берём текст, удаляя пробелы

    if (value === "") return;                             // Если пусто — ничего не добавляем

    // Добавляем новую задачу в массив как объект
    habits.push({
        text: value,          // Текст задачи
        completed: false      // Галочка изначально не стоит
    });

    // Сохраняем обновлённый массив в localStorage
    localStorage.setItem("habits", JSON.stringify(habits));

    input.value = "";         // Очищаем поле ввода
    renderHabits();           // Перерисовываем список задач
}


// ====== Функция отображения всех задач (отрисовка на экране) ======
function renderHabits() {
    const container = document.getElementById("habitdisplay"); // Блок, куда выводим задачи
    container.innerHTML = ""; // Очищаем старое содержимое перед отрисовкой

    // Проходим по каждой задаче и создаём HTML для неё
    habits.forEach((habit, index) => {
        container.innerHTML += `
            <div class="habit-item">  
                <label class="checkbox-wrapper">
                    <!-- Чекбокс. Если задача выполнена — ставим галочку -->
                    <input type="checkbox" class="checkbox"
                        ${habit.completed ? "checked" : ""}
                        onchange="toggleCompleted(${index})">
                    <span class="custom-checkbox"></span>
                    ${habit.text} <!-- Показываем текст задачи -->
                </label>

                <!-- Кнопка удаления -->
                <button class="delete-button" onclick="deleteHabit(${index})">Delete</button>
            </div>
            <hr> <!-- Линия между задачами -->
        `;
    });
}


// ====== Обработка клика по чекбоксу ======
function toggleCompleted(index) {
    // Меняем состояние галочки: если было true — станет false, и наоборот
    habits[index].completed = !habits[index].completed;

    // Сохраняем обновлённый массив в localStorage
    localStorage.setItem("habits", JSON.stringify(habits));
}


// ====== Удаление задачи ======
function deleteHabit(index) {
    habits.splice(index, 1); // Удаляем 1 элемент из массива по индексу
    localStorage.setItem("habits", JSON.stringify(habits)); // Сохраняем обновлённый список
    renderHabits(); // Перерисовываем список задач
}


// ====== Обработка нажатия клавиши Enter ======
document.getElementById("plans").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addHabit(); // Если нажата клавиша Enter — вызываем функцию добавления
    }
});


// ====== Тёмная / светлая тема ======
const togglebutton = document.getElementById('themetoggle');      // Кнопка смены темы
const savedTheme = localStorage.getItem('theme');                 // Проверяем, была ли сохранена тема

// При загрузке страницы — устанавливаем нужную тему
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode'); // Включаем тёмную тему
    togglebutton.innerHTML = '<i class="fas fa-moon"></i>'; // Иконка луны
} else {
    document.body.classList.remove('dark-mode'); // Светлая тема
    togglebutton.innerHTML = '<i class="fas fa-sun"></i>'; // Иконка солнца
}

// При нажатии на кнопку переключаем тему
togglebutton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode'); // Включаем/выключаем класс

    if (document.body.classList.contains('dark-mode')) {
        togglebutton.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark'); // Сохраняем тему как "dark"
    } else {
        togglebutton.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light'); // Сохраняем тему как "light"
    }
});


// ====== Отображаем задачи при загрузке страницы ======
renderHabits(); // Это важно: иначе при перезагрузке задачи не появятся
