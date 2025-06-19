// Функция для добавления новой задачи (хабита)
function addHabit() {
    // Получаем input, где пользователь вводит текст задачи
    const input = document.getElementById("plans");

    // Убираем пробелы в начале и конце введённого текста
    const value = input.value.trim();

    // Если поле пустое — выходим из функции, ничего не добавляем
    if (value === "") return;

    // Добавляем в контейнер #habitdisplay новую задачу в формате:
    // div с классом habit-item, внутри label с кастомным чекбоксом и текстом задачи
    // Используем "+=" чтобы не перезаписывать, а добавлять в конец списка
    document.getElementById("habitdisplay").innerHTML += `
        <div class="habit-item">  
            <label class="checkbox-wrapper">
                <input type="checkbox" class="checkbox">
                <span class="custom-checkbox"></span>
                ${value}  <!-- Здесь выводим текст задачи -->
            </label>
        </div>
        <hr>  <!-- Разделительная линия между задачами -->
    `;

    // Очищаем поле ввода после добавления
    input.value = "";
}

// ========== Кнопка переключения темы (светлая/тёмная) ==========

// Получаем кнопку по id
const togglebutton = document.getElementById('themetoggle');

// Получаем из localStorage сохранённую тему (если есть)
const savedTheme = localStorage.getItem('theme');

// При загрузке страницы устанавливаем тему, если она сохранена
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode'); // Включаем класс для темной темы
    togglebutton.innerHTML = '<i class="fas fa-moon"></i>'; // Показываем иконку луны
} else {
    // Если темы нет или она светлая
    document.body.classList.remove('dark-mode'); // Убираем класс темной темы
    togglebutton.innerHTML = '<i class="fas fa-sun"></i>'; // Показываем иконку солнца
}

// Добавляем обработчик клика на кнопку переключения темы
togglebutton.addEventListener('click', function () {
    // Переключаем класс dark-mode у body
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        // Если сейчас темная тема активна
        togglebutton.innerHTML = '<i class="fas fa-moon"></i>'; // Ставим иконку луны
        localStorage.setItem('theme', 'dark'); // Сохраняем выбор в localStorage
    } else {
        // Если сейчас светлая тема
        togglebutton.innerHTML = '<i class="fas fa-sun"></i>'; // Ставим иконку солнца
        localStorage.setItem('theme', 'light'); // Сохраняем выбор в localStorage
    }
});
