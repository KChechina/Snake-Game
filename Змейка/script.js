let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = 'margin: auto; margin-bottom: 40px; font-size: 30px; display: block; text-align: center;';

let span = document.createElement('input');
document.body.appendChild(span);
span.style.cssText = 'margin: auto; margin-bottom: 40px; font-size: 20px; display: block; text-align: center;'

let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');


for (let i = 1; i < 101; i++){
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1;
let y = 10;

for (let i = 0; i < excel.length; i++){
    if (x>10){
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

let posX;
let posY;

let snakeBody = [document.querySelector('[posX = "6"][posY = "6"]'), document.querySelector('[posX = "5"][posY = "6"]')]
for (let i = 0; i < snakeBody.length; i++){
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('snakeHead');

let apple;

function createApple (){
    function generateApple(){
        let posX = Math.round(Math.random()* (10-1)+1);
        let posY = Math.round(Math.random()* (10-1)+1);
        return [posX, posY];
    }
    let appleCoordinates = generateApple();

    apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] + '"]');

    while (apple.classList.contains('snakeBody')){
        let appleCoordinates = generateApple();
        apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] + '"]');
    }

    apple.classList.add('apple');
}

createApple();
let direction = 'right';
let steps = false;

let score = 0;
let record = localStorage.getItem('maxScore');
input.value = `Ваши очки: ${score}`;
span.value = `Ваш рекорд: ${record}`
function move(){
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];

    snakeBody[0].classList.remove('snakeHead');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction === 'right'){
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+ snakeCoordinates[0]+1) + '"][posY = "' + snakeCoordinates[1] + '"]'))
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'))
        }
    } else if (direction === 'left'){
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+ snakeCoordinates[0]-1) + '"][posY = "' + snakeCoordinates[1] + '"]'))
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'))
        }
    } else if (direction === 'up'){
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+ snakeCoordinates[1]+1) + '"]'))
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'))
        }
    } else if (direction === 'down'){
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+ snakeCoordinates[1]-1) + '"]'))
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'))
        }
    }

    if (snakeBody[0].getAttribute('posX') === apple.getAttribute('posX') && snakeBody[0].getAttribute('posY') === apple.getAttribute('posY')){
        apple.classList.remove('apple');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createApple();
        score++;
        input.value = `Ваши очки: ${score}`;
        span.value = `Ваш рекорд: ${record}`
    }
    
    if (snakeBody[0].classList.contains('snakeBody')){
        if(score > record){
            localStorage.setItem('maxScore', score)
        }
        alert(`Игра окончена. Ваши очки: ${score}. Ваш рекорд: ${record}`);
        clearInterval(interval);

        document.body.innerHTML += `<button class="restart">Restart</button>`;
        document.querySelector('.restart').addEventListener('click', function (){
            window.location.reload();
        });
    }

    snakeBody[0].classList.add('snakeHead');
    for (let i = 0; i < snakeBody.length; i++){
        snakeBody[i].classList.add('snakeBody');
    }

    steps = true;
}
let interval = setInterval(move, 500);



window.addEventListener('keydown', function(e){
    if (steps === true){
    if(e.which === 37 && direction!= 'right'){
        direction = 'left';
        steps = false;
    }
    else if(e.which === 38 && direction!= 'down'){
        direction = 'up';
        steps = false;
    }
    else if(e.which === 39 && direction!= 'left'){
        direction = 'right';
        steps = false;
    }
    else if (e.which === 40 && direction!= 'up'){
        direction = 'down';
        steps = false;
    }}
});
