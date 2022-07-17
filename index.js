let h1 = document.querySelector("h1")
h1.addEventListener('click', alertf)
function alertf(){
    alert("I've been clicked")
}
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
    console.log(event.participants)
    console.log(numParticipants.value)
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
}

let cocktailSubmit = document.querySelector("#cocktail")
cocktailSubmit.addEventListener('submit',drinkSubmit)

function drinkSubmit(event){
    event.preventDefault();
    let ingredient = document.querySelector("#cocktailIngred").value
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(res =>res.json())
        .then(event => console.log(event))
 
}