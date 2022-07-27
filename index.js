// creating dark mode
let modetheme = document.querySelector("#mode-link")
let modeBtn = document.querySelector("#mode-button")
modeBtn.addEventListener('click', e=>{
    if (modetheme.getAttribute("href")==="style.css"){
        modetheme.href="style_dark.css"
    }
    else{
        modetheme.href="style.css"
    }
})

//Simply creating the event listener for the activity submit. Sending it to the next function
let actSubmit = document.querySelector("#activityForm")
actSubmit.addEventListener('submit',activitySubmit)
//Had to break out feetchEvent because recursively running preventDefault breaks the loop.
function activitySubmit(event){
    event.preventDefault();
    fetchEvent(event)}
//After a submit activity event, this function fetches an activity of the chosen type from the BORED API.
//It then confirms if the number of participants matches. If it doesn't, it re-fetches a new activity. Otherwise publish function runs.
function fetchEvent(event){
   let chosenActivity = document.querySelector("#actSelect")
   let numParticipants = document.querySelector("#numParticipants")
   fetch(`https://www.boredapi.com/api/activity?type=${chosenActivity.value}`)
   .then(res => res.json())
  .then(event => {
      if (numParticipants.value === `any`){
    return activityMessage(event)}
     if (numParticipants.value == event.participants){
         console.log("numbers matched")
       return activityMessage(event)
    }
     if (numParticipants.value !== event.participants){
         console.log("no match")
       return fetchEvent(event)}

    if(numParticipants.value == 5){
        return activityMessage(event)
    }

})}
//This is the publish function from the submit event on the activity form. It's gated to response slightly different depending on the activity delivered.
function activityMessage(Obj){
    let activityChosen = document.querySelector("#activityChosen");
    let players = document.querySelector("#participants");
      activityChosen.innerText = `${Obj.activity}`
      players.innerText= `This event calls for ${Obj.participants}, but it's only a suggestion`
    let typeMessage = document.querySelector("#actType")
    if(Obj.type === 'recreational'){
        typeMessage.innerText = `This recreational activity is about having fun! Indoors or out.`
    }
    else if (Obj.type === 'cooking'){
        typeMessage.innerText = `Time to break out the apron and get cooking!`
    }
    else if (Obj.type === 'education'){
        typeMessage.innerText = `I hope you've got your learning cap on. It's time for an education!`
    }
    else if (Obj.type === 'social'){
        typeMessage.innerText = `Channel some extroverted energy and get out there! It's a social event!`
    }
    else if (Obj.type === 'music'){
        typeMessage.innerText = `Will the music make you lose control? Only if you let it!`
    }
    else if (Obj.type === 'charity'){
        typeMessage.innerText = `There has never been a better time to help others. It feels good to!`
    }
    else if (Obj.type === 'relaxation'){
        typeMessage.innerText = `Unwind, take a deep breath, release. It is all about relaxation.`
    }
    else if (Obj.type === 'busywork'){
        typeMessage.innerText = `Being productive is always a good option!`
    }
    let activityAdd = document.querySelector("#planAddBtn")
    activityAdd.style = "visible"
}
//hooking up "add to plan button"
let addActivityBtn = document.querySelector("#planAddBtn") 
addActivityBtn.addEventListener("click", addActivity)

function addActivity(){
    alert("Activity added to plan")
    let finalActivityChosen = document.querySelector("#activityChosen").innerText;
    let finalActivity = document.querySelector("#finalActivity")
    finalActivity.innerText=finalActivityChosen    

}

// adding a drink
let cocktailSubmit = document.querySelector("#cocktail")
cocktailSubmit.addEventListener('submit',drinkSubmit)

function drinkSubmit(event){
    event.preventDefault();
    let ingredient = document.querySelector("#cocktailIngred").value
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(res =>res.json())
        .then(event => {
            
            addADrink(event)
        })

}
let drinkCard =""
function addADrink(drinkObj){
    for (let i=1; i<=3;i++){
        let randomDrink= drinkObj.drinks[Math.floor(Math.random() * drinkObj.drinks.length)];
        let drinkChoice = randomDrink.strDrink
        let drinkImgChoice = randomDrink.strDrinkThumb
        let drinkID = randomDrink.idDrink
        let drink = document.querySelector(`#drink${i}`)
        let drinkImg = document.querySelector(`#drink${i}Img`)
        let drinkIdAdd = document.querySelector(`#drink${i}ID`)
        let drinkCard = document.querySelector(`#drinkCard${i}`)
        drinkCard.style = "visible"
        drink.innerText = drinkChoice
        drinkImg.src = drinkImgChoice
        drinkIdAdd.innerText = drinkID
        addClickToDrink()
    }
}

function addClickToDrink(){
    let array = document.querySelectorAll(".drinkCard")
    array.forEach(drinkCard => {
        drinkCard.addEventListener('click', drinkClick)
    })}

function drinkClick(target){
   let drinkID = target.currentTarget.lastChild.previousSibling.innerHTML
    alert("Drink added to plan")
    finalizeDrink(drinkID)
}

//adding hover event to drink cards when they're created
function drinkHover(){
    for (let i=1; i<=3;i++){
let hoverDrink = document.querySelector(`#drinkCard${i}`)
hoverDrink.addEventListener('mouseenter', e => e.target.style.border = "5px inset rgb(62, 234, 15)")
hoverDrink.addEventListener('mouseleave', e => e.target.style.border = "5px inset rgb(48, 22, 222)")
}}
drinkHover()

//selecting a drink adds it to your plan for the night
function finalizeDrink(drinkID){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
    .then(e => e.json())
    .then (e => console.log(e))
}
// below is the API for the musicovery playlist builder. [[UPPRECASE]] is variables the form will select
//https://musicovery.com/api/V6/playlist.php?&fct=getfromtag&tag=[[GENRE/MOOD]]&popularitymin=50&popularitymax=100&listenercountry=us&yearmin=[[DECADE START]]&yearmax=[[DECADEEND]]

let musicForm = document.querySelector("#music")
musicForm.addEventListener('submit',musicFormSubmit)

function musicFormSubmit(event){
    event.preventDefault()
    let genre = document.querySelector("#musicGenre")
    let mood = document.querySelector("#musicMood")
    fetch(`https://nameless-lake-39088.herokuapp.com/https://musicovery.com/api/V6/playlist.php?&fct=getfromtag&tag=${genre.value}&popularitymin=50&popularitymax=100&listenercountry=us&yearmin=2000&yearmax=2009`,{
        Headers: {
            "Access-Control-Allow-Headers" : "*"
        }})
    .then(res=>res.json())
    .then(event=>console.log(event + "hello"))
}