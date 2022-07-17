let h1 = document.querySelector("h1")
h1.addEventListener('click', alertf)
function alertf(){
    alert("I've been clicked")
}

let actSubmit = document.querySelector("#activityForm")
actSubmit.addEventListener('submit',activitySubmit)

function activitySubmit(event){
    event.preventDefault();
   let chosenActivity = document.querySelector("#actSelect")
   let numParticipants = document.querySelector("#numParticipants")
   fetch(`http://www.boredapi.com/api/activity?type=${chosenActivity.value}`)
   .then(res => res.json())
  .then(event => {
      activityMessage(event)
})
}
// I really want this to work to allow to select for number of participants.
// if (numParticipants.value === any){
//     activityMessage(event)}
//     else if (numParticipants.value !== event.participants){
//         activitySubmit(event)
//     }
//     else {activityMessage(event)}
// })
// }
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



                        //  cooking
                        //  education
                        //  social
                        //  Music
                        //  charity
                        //  relaxation