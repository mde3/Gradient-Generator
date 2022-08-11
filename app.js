//Get the container element from the DOM
const container = document.querySelector(".container");

//Amount of cards (gradients) to be displayed on the page
const cardAmount = 9;

//Boolean value we will be using later on
let bool = true;

//Array for the first and second colors of all gradients
let color1Arr = [];
let color2Arr = [];

//Function that generates a random color
function rndColor() {
    const x = Math.round(0xffffff * Math.random()).toString(16);
    const y = 6 - x.length;
    const z = "000000";
    const z1 = z.substring(0, y);
    const randomColor = "#" + z1 + x;
    return randomColor;
}

//Display amount of cards set in the cardAmount variable
for(let i = 0; i < cardAmount; i++) {
    //variables for the two colors of a gradient
    const color1 = rndColor();
    const color2 = rndColor();

    //add the colors to the arrays we created earlier
    color1Arr.push(color1);
    color2Arr.push(color2);

    //generate a card and dynamically insert the data with template literals
    container.innerHTML +=`
    <div class="card">
        <div class="card-header">
            <h3 class="card-id">00${i + 1}</h3>
            <button class="type">Linear</button>
        </div>
        <div class="card-body">
            <div 
                class="gradient"
                style="background: linear-gradient(
                    45deg, ${color1}, ${color2});"
                ></div>
        </div>
        <div class="card-footer">
            <div>
                <span class="color1">${color1}</span>
                <span class="color2">${color2}</span>
            </div>
            <button class="copy">Copy CSS</button>
        </div>
    </div>
    `;
}

//add a click event to the type button
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("type")) {
        //change gradient type
        bool = !bool;
        //get the gradient and card Id from the DOM
        const gradient = e.target.parentElement.parentElement.children[1].firstElementChild;
        const id = parseInt(e.target.parentElement.parentElement.children[0].firstElementChild.innerText.substr(2)) - 1;
        //toggle gradient type
        if (bool === true) {
            //set gradient to linear
            gradient.style.background = `linear-gradient(45deg, ${color1Arr[id]}, ${color2Arr[id]})`;
            e.target.innerText = "Linear";
        } else {
            //set gradient to radial
            gradient.style.background = `radial-gradient(circle, ${color1Arr[id]}, ${color2Arr[id]})`;
            e.target.innerText = "Radial";
        }
    }
});

//add click event to the copy button
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("copy")) {
        //get background of the gradient of the card that's been clicked
        const gradient = e.target.parentElement.parentElement.children[1].firstElementChild.style.background;
        //add the css code to the clipboard
        navigator.clipboard.writeText("background: " + gradient + ';');

        //set button text
        e.target.innerText = "Copied!";

        //reset button text after 2 seconds
        setTimeout(() => {
            e.target.innerText = "Copy CSS";
        }, 2000);
    }
});