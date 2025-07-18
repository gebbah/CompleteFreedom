# CompleteFreedom
<!DOCTYPE html>
<html>
<head>
    <title>Дайтона - Complete Freedom</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="css/pageCss.css">
    <link rel="icon" type="image" href="pictures/3.png">
    <meta charset="utf-8">
</head>
<body>
    <!-- Обёртка для контента поверх фона -->
    <div class="content-wrapper">
        <div class="game">
            <div id="mainChar"></div>
            <div id="block"></div>
        </div>
        
        <p>Score: <span id="scoreSpan"></span></p>

        <audio id="player">
            <source src="music/Start Menu Dreams.mp3" type="audio/mp3">
        </audio>

        <!-- Блок инструкций -->
        <div id="tutorial-container">
            <div id="tutorial-box">
                <p>Нажимайте на экран, чтоб увернуться! <br> Или используйте ПРОБЕЛ, СТРЕЛКУ ВВЕРХ или КЛАВИШУ W <br> <a href="https://band.link/completefreedom" target="_blank">Кликай сюда, чтобы прослушать альбом на всех площадках! <br> Побольше Frutiger Aero и  Webcore в ваши дома</a></p>
            </div>
        </div>
    </div>
    
    <!-- Модальное окно Game Over -->
    <div id="gameOverModal" class="modal">
        <div class="modal-content">
            <h2>Game Over</h2>
            <p>Your score: <span id="finalScore"></span></p>
            <p>
                <a href="https://band.link/completefreedom" target="_blank">
                    Кликай сюда, чтобы прослушать альбом на всех площадках!<br>
                    Побольше Frutiger Aero и Webcore в ваши дома
                </a>
            </p>
            <button id="restartButton">Restart</button>
        </div>
    </div>
    
    <!-- Сообщение о повороте устройства -->
    <div id="rotate-message">
        Пожалуйста, поверните устройство в горизонтальную ориентацию!
    </div>
    
    <script type="text/javascript" src="JS/myJs.js"></script>
</body>
</html>
