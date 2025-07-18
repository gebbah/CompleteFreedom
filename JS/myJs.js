// ======== Аудио-логика ========
const audio = document.getElementById('player');
audio.volume = 0.7;

// Элемент для сообщения
const audioMessage = document.createElement('div');
audioMessage.id = 'audioMessage';
document.body.appendChild(audioMessage);

// Флаг для отслеживания первого запуска аудио
let audioStarted = false;

// Функция запуска аудио
function tryStartAudio() {
    if (audioStarted) return;
    
    audio.play().then(() => {
        console.log("Аудио запущено");
        audioStarted = true;
        audioMessage.style.display = 'none';
    }).catch(e => {
        console.log("Ошибка запуска аудио:", e);
        audioMessage.textContent = "Коснитесь экрана, чтобы запустить музыку";
        audioMessage.style.display = 'block';
    });
}

// Запускаем после полной загрузки страницы
window.addEventListener('load', () => {
    audio.volume = 0.6;
    setTimeout(tryStartAudio, 500);
    
    // Проверка ориентации при загрузке
    checkOrientation();
});

// Проверка ориентации устройства
function checkOrientation() {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    
    if (isPortrait && window.innerWidth <= 768) {
        document.getElementById('rotate-message').style.display = 'flex';
    } else {
        document.getElementById('rotate-message').style.display = 'none';
    }
}

// Слушатель изменения ориентации
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

// Запуск при любом взаимодействии с игрой
function setupAudioInteractions() {
    // Клик/касание по игровой области
    document.querySelector('.game').addEventListener('click', tryStartAudio);
    document.querySelector('.game').addEventListener('touchstart', tryStartAudio);
    
    // Нажатие любой клавиши
    document.addEventListener('keydown', (e) => {
        tryStartAudio();
        
        // Пробуем запустить прыжок, если это управляющая клавиша
        if (canJump) {
            const isJumpKey = 
                jumpControls.keys.includes(e.code) || 
                jumpControls.keys.includes(e.key) ||
                jumpControls.keyCodes.includes(e.keyCode);
            
            if (isJumpKey) {
                e.preventDefault();
                jump();
            }
        }
    });
}

// Инициализируем аудио-взаимодействия
setupAudioInteractions();

// Повтор музыки
audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play();
});

// ======== Игровая логика ========
var mainChar = document.getElementById("mainChar");
var block = document.getElementById("block");
var counter = 0;

// Элементы модального окна
const gameOverModal = document.getElementById("gameOverModal");
const finalScoreElement = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

// Сохраняем исходное положение блока
const originalBlockPosition = "95vw";

// Конфигурация управления прыжком
const jumpControls = {
    keys: ['Space', ' ', 'ArrowUp', 'KeyW'], // Современные коды клавиш
    keyCodes: [32, 38, 87],                 // Устаревшие keyCodes
    mouse: true                             // Разрешить клик мышью
};

// Состояние прыжка
let canJump = true;
const JUMP_COOLDOWN = 490; // Время анимации прыжка

// ======== СЛУЧАЙНЫЕ ИЗОБРАЖЕНИЯ ДЛЯ БЛОКОВ ========
const blockImages = [
    'pictures/1.png',
    'pictures/2.png',
    'pictures/3.png',
    'pictures/4.png',
];

// Функция для получения случайного изображения
function getRandomBlockImage() {
    const randomIndex = Math.floor(Math.random() * blockImages.length);
    return blockImages[randomIndex];
}

// Установка случайного изображения для блока
function setRandomBlockImage() {
    const randomImage = getRandomBlockImage();
    block.style.backgroundImage = `url('${randomImage}')`;
}

// Функция прыжка
function jump() {
    if (!canJump || mainChar.classList.contains("animate")) return;
    
    canJump = false;
    mainChar.classList.add("animate");
    
    setTimeout(() => {
        mainChar.classList.remove("animate");
        canJump = true;
    }, JUMP_COOLDOWN);
}

// Обработчики управления
function setupControls() {
    // Клик по игровой области
    if (jumpControls.mouse) {
        document.querySelector('.game').addEventListener('click', () => {
            if (canJump) jump();
        });
    }
    
    // Обработка касаний для мобильных
    document.querySelector('.game').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (canJump) jump();
    });
}

// Инициализация управления
setupControls();

// Функция перезапуска игры
function restartGame() {
    // Сбрасываем положение блока
    block.style.animation = "none";
    block.style.left = originalBlockPosition;
    
    // Сбрасываем счёт
    counter = 0;
    document.getElementById("scoreSpan").innerHTML = "0";
    
    // Устанавливаем новое случайное изображение
    setRandomBlockImage();
    
    // Перезапускаем анимацию
    setTimeout(() => {
        block.style.animation = "block 1.3s infinite linear";
    }, 10);
    
    // Скрываем модальное окно
    gameOverModal.style.display = "none";
}

// Обработчик кнопки рестарта
restartButton.addEventListener('click', restartGame);

// Проверка столкновений через коллайдеры
var checkDead = setInterval(function() {
    const charRect = mainChar.getBoundingClientRect();
    const blockRect = block.getBoundingClientRect();
    
    // Проверка пересечения
    const collision = !(
        charRect.right < blockRect.left || 
        charRect.left > blockRect.right || 
        charRect.bottom < blockRect.top || 
        charRect.top > blockRect.bottom
    );
    
    if(collision) {
        // Сохраняем текущий счёт
        const finalScore = Math.floor(counter/100);
        
        // Полностью сбрасываем анимацию и позицию
        block.style.animation = "none";
        block.style.left = originalBlockPosition;
        
        // Устанавливаем новое случайное изображение
        setRandomBlockImage();
        
        // Показываем модальное окно
        finalScoreElement.textContent = finalScore;
        gameOverModal.style.display = "block";
        
        // Сбрасываем счётчик
        counter = 0;
    } else {
        counter++;
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);

// Устанавливаем первое случайное изображение при загрузке
setRandomBlockImage();

// Адаптация скорости для мобильных
if (window.innerWidth <= 768) {
    block.style.animation = "block 2s infinite linear";
}