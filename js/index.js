(function () {
    var slideContainer = $('.slide-container');
    slideContainer.slick({
        arrows: false,
        infinite: false
    });
    $(window).load(function () {
        setTimeout(function () {
            $("#overlay").remove()
        }, 4000);
    })

    $(".nextBtn").on("click", function () {
        slideContainer.slick("slickNext")
    })

    $(".prevBtn").on("click", function () {
        slideContainer.slick("slickPrev")
    })
})();
function copyToClipboard(id) {
    var from = document.getElementById(id);
    var range = document.createRange();
    window.getSelection().removeAllRanges();
    range.selectNode(from);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
var countDownDate = new Date("Jan 26, 2019 10:00:00").getTime();
var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    $(".days").text(days);
    $(".hours").text(hours);
    $(".minutes").text(minutes);
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);




function GET(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

if (GET('name', window.location.href) !== null) {
    $(".personName").text(atob(GET('name', window.location.href)));
} else {
    $(".invitee").html("&nbsp;");
}


function copytoClip(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
}

var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
c = canvas.getContext('2d');

window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    initCanvas();
})

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        drawCircles();
    }
)
window.addEventListener("touchmove",
    function (event) {
        let touch = event.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        drawCircles();
    }
)

function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.vx = vx;
    this.vy = vy;
    this.birth = birth;
    this.life = life;
    this.opacity = opacity;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = 'rgba(' + rgb + ',' + this.opacity + ')';
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.opacity = 1 - (((frame - this.birth) * 1) / this.life);

        if (frame > this.birth + this.life) {
            for (let i = 0; i < circleArray.length; i++) {
                if (this.birth == circleArray[i].birth && this.life == circleArray[i].life) {
                    circleArray.splice(i, 1);
                    break;
                }
            }
        } else {
            this.draw();
        }
    }

}

var circleArray = [];

function initCanvas() {
    circleArray = [];
}

var colorArray = [
    // '355,85,80',
    // '9,80,100',
    // '343,81,45',
    '255,230,129',
    '249,198,85',
    '207,145,45'
]

function drawCircles() {
    for (let i = 0; i < 6; i++) {
        let radius = Math.floor(Math.random() * 4) + 2;
        let vx = (Math.random() * 2) - 1;
        let vy = (Math.random() * 2) - 1;
        let spawnFrame = frame;
        let rgb = colorArray[Math.floor(Math.random() * colorArray.length)];
        let life = 100;
        circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life));
    }
}

var frame = 0;
function animate() {
    requestAnimationFrame(animate);
    frame += 1;
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

initCanvas();
animate();

// // This is just for demo purposes :
// for (let i = 1; i < 110; i++) {
//     (function (index) {
//         setTimeout(function () { 
//             mouse.x = 100 + i * 10;
//             mouse.y = 100;
//             drawCircles();
//          }, i * 10);
//     })(i);
// }