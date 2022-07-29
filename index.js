// creating dark mode
let modetheme = document.querySelector("#mode-link")
let modeBtn = document.querySelector("#mode-button")
modeBtn.addEventListener('click', e=>{
    if (modetheme.getAttribute("href")==="style.css"){
        modetheme.href="style_dark.css"
        modeBtn.innerText = "Light Mode"
    }
    else{
        modetheme.href="style.css"
        modeBtn.innerText = "Dark Mode"
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
   fetch(`http://www.boredapi.com/api/activity?type=${chosenActivity.value}`)
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
    alert("Activity added to plan at bottom of page")
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
    alert("Drink added to plan at bottom of page")
    fetchDrinkDetails(drinkID)
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
function fetchDrinkDetails(drinkID){
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`)
    .then(e => e.json())
    .then (e => getIngredients(e))
}

function getIngredients(drinkArray){
        let drinkObj = drinkArray.drinks[0]
        let ingredientArray = []
           if(drinkObj.strIngredient1 !== null){
               ingredientArray.push(drinkObj.strIngredient1)
           }
           if(drinkObj.strIngredient2 !== null){
            ingredientArray.push(drinkObj.strIngredient2)
           }
           if(drinkObj.strIngredient3 !== null){
            ingredientArray.push(drinkObj.strIngredient3)
        }
        if(drinkObj.strIngredient4 !== null){
            ingredientArray.push(drinkObj.strIngredient4)
        }
        if(drinkObj.strIngredient5 !== null){
            ingredientArray.push(drinkObj.strIngredient5)
        }
        if(drinkObj.strIngredient6 !== null){
            ingredientArray.push(drinkObj.strIngredient6)
        }
        if(drinkObj.strIngredient7 !== null){
            ingredientArray.push(drinkObj.strIngredient7)
        }
        if(drinkObj.strIngredient8 !== null){
            ingredientArray.push(drinkObj.strIngredient8)
        }
        let drinkName = document.querySelector("#finalDrink")
        drinkName.innerText = drinkObj.strDrink   
        finalieDrink(ingredientArray)
        }

function finalieDrink(ingredientArray){
    let ingredientList = document.querySelector("#listOfIngredients")
    ingredientArray.map(element =>{
        let li = document.createElement('li')
        li.appendChild(document. createTextNode(element));
        ingredientList.appendChild(li)
    })
}

let musicForm = document.querySelector("#music")
musicForm.addEventListener('submit',musicFormSubmit)

// <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0vHZ8elq0UK?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>


function musicFormSubmit(event){
        event.preventDefault()
        let mood = document.querySelector("#musicMood")
        let playlistImage = document.querySelector("#playlistPic")
        let playlistBtn = document.querySelector("#musicAddBtn")

        if (mood.value === `Feelin`){
            playlistImage.src = "https://i.scdn.co/image/ab67706c0000bebb128a34ba3a5ba8edf3590bad"
        }
        if (mood.value === `Peaceful`){
            playlistImage.src = "https://i.scdn.co/image/ab67706f00000003da3856c6073117386958fd48"
        }
        if (mood.value === `Studious`){
            playlistImage.src = "https://i.scdn.co/image/ab67616d0000b27324e2fde8d3bc3f5e85ffeea3"
        }
        if (mood.value === `Energetic`){
            playlistImage.src = "https://i.scdn.co/image/ab67706f00000003d8719001db822961551b017c"
        }
        if (mood.value === `Happy`){
            playlistImage.src = "https://i.scdn.co/image/ab67706f000000035af1070c80cd50dbbb4cfa19"
        }
        if (mood.value === `Nostalgic`){
            playlistImage.src = "https://i.scdn.co/image/ab67706f0000000385b35b1ca11e8a1ea8885011"
        }
        if (mood.value === `Rock`){
            playlistImage.src = "https://i.scdn.co/image/ab67616d00001e0263dcefae395de2e18cf2b932"
        }
        playlistImage.style = "visible"
        playlistBtn.style = "visible"
    }

let musicSelection = document.querySelector('#musicAddBtn')
musicSelection.addEventListener('click', playlistApproved)

function playlistApproved(){
    alert("Playlist added to plan below")
    let finalMusic = document.querySelector("#musicChoice")
    let mood = document.querySelector("#musicMood")
    if (mood.value === `Feelin`){
    finalMusic.innerHTML = `<iframe id="finalMusic" style="border-radius:70px 10px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX66m4icL86Ru?utm_source=generator&theme=0" width="100%" display="inline-block" height="380" frameBorder="0" allowfullscreen="" defer allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
    }
    if (mood.value === `Peaceful`){
        finalMusic.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWTjLfR5thd2p?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
        }
        if (mood.value === `Studious`){
            finalMusic.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/4WvKA2Da1YSVLyrW6aTNaK?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
            }
            if (mood.value === `Energetic`){
                finalMusic.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0vHZ8elq0UK?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
                }
                if (mood.value === `Happy`){
                    finalMusic.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
                    }
                    if (mood.value === `Nostalgic`){
                        finalMusic.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4uU3TGzIPXL?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
                        }
                        if (mood.value === `Rock`){
                            finalMusic.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1EQpj7X7UK8OOF?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
                            }
}

// <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1EQpj7X7UK8OOF?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>

// below is the API for the musicovery playlist builder. [[UPPRECASE]] is variables the form will select
//https://musicovery.com/api/V6/playlist.php?&fct=getfromtag&tag=[[GENRE/MOOD]]&popularitymin=50&popularitymax=100&listenercountry=us&yearmin=[[DECADE START]]&yearmax=[[DECADEEND]]

// let musicForm = document.querySelector("#music")
// musicForm.addEventListener('submit',musicFormSubmit)

// function musicFormSubmit(event){
//     event.preventDefault()
//     let genre = document.querySelector("#musicGenre")
//     let mood = document.querySelector("#musicMood")
//     fetch(`https://musicovery.com/api/V6/playlist.php?&fct=getfromtag&tag=${genre.value}&popularitymin=50&popularitymax=100&listenercountry=us&yearmin=2000&yearmax=2009`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': 'https://joespizz.github.io'
//         }
//       })
//     .then((response) => response.json())
//     .then(data => console.log(data+ "hello"));
//     }