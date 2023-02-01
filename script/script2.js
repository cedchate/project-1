
const startBtn= document.querySelector('#start');
startBtn.addEventListener('click', ()=> {
    createGame();
    document.querySelector('#menu').remove();
})

function createGame(){
    const players= ['Colonel Moutarde', 'Madame Pervenche', 'Mademoiselle Rose', 'Professeur Violet', 'Madame Leblanc', 'Docteur Olive'];
    const rooms= ['Kitchen', 'Dining room', 'Living room','Lounge', 'Hall','Winter Garden', 'Billiard room', 'Library', 'Office room'];
    const wepons= ['Candlestick', 'Wrench', 'Rope', 'Knife', 'Lamp', 'Hammer', 'Baton', 'Poison', 'Revolver'];
    let game= new Game(players, rooms, wepons);
    game.getRandom();
    console.log(game.randomChoice);
    makeSectionGame(game);
}

function makeUlInSection (){
    const sectionElement= document.querySelector('#game');
    
    
    const divElement= document.createElement("div");
    divElement.classList.add('game');
    sectionElement.append(divElement);
    

    const ulPlayers= document.createElement('ul');
    const h2Players= document.createElement('h2');
    ulPlayers.append(h2Players);
    ulPlayers.classList.add('players');
    h2Players.textContent= "PLAYERS :";
    
    const ulRooms= document.createElement('div');
    const h2Rooms= document.createElement('h2');
    const plateElement= document.createElement('div');
    const column1Plate= document.createElement('div');
    const column2Plate= document.createElement('div');
    const column3Plate= document.createElement('div');
    plateElement.append(column1Plate,column2Plate,column3Plate);
    ulRooms.append(h2Rooms, plateElement);
    plateElement.classList.add('rooms');
    h2Rooms.textContent= "ROOMS :";
    
    const ulWepons= document.createElement('ul');
    const h2Wepons= document.createElement('h2');
    const divWepons= document.createElement('div');
    divElement.append(ulWepons);
    ulWepons.append(h2Wepons);
    ulWepons.classList.add('wepons');
    h2Wepons.textContent= "WEPONS :";
    
    const submitBtn= document.createElement('button');
    submitBtn.classList.add('submit');
    submitBtn.textContent= "Submit";
    const divPlay= document.createElement('div');

    const consoleElement= document.createElement("ol");

    divPlay.append(ulPlayers);
    divElement.append( divWepons, divPlay, ulRooms);
    divElement.style.display="flex";

    const submitElem= document.querySelector('#submit');
    submitElem.append(submitBtn);
    const resultElem= document.createElement('ol');
    sectionElement.append(resultElem);
}

function updateBtnSubmit(game){
    if(game.selection.includes(' ')){
        document.querySelector('.submit').classList.remove('open');
    }else {
        document.querySelector('.submit').classList.add('open');
    }
}

function innocentClassforRooms(el, game){
    const rooms = game.rooms.map(room=> room.name);
    console.log(wepons);
    for(let key in el.selectedRooms){
        if((rooms.includes(key)&&el.selectedWepons[key].length===6) ||el.selectedRooms[key].length===9){
            document.querySelector(`#${key}`).classList.toggle('innocentfs');
        }
    }
    const selectR= document.querySelector('.rooms div .selected');
            if(selectR){
                
                if(el.selectedRooms[selectR.getAttribute('id')]){
                    el.selectedRooms[selectR.getAttribute('id')].forEach((other) =>{
                        document.querySelector(`#${other.getId()}`).classList.toggle('innocent');
                    })
                }
            }
}
function innocentClassforWepons(el, game){
    const wepons = game.wepons.map(wep=> wep.name);
    for(let key in el.selectedWepons){
            if((wepons.includes(key)&&el.selectedWepons[key].length===6) ||el.selectedWepons[key].length===9){
                document.querySelector(`#${key}`).classList.toggle('innocentfs');
            }
    }
    const selectW= document.querySelector('.wepons >.selected');
            if(selectW){
                if(el.selectedWepons[selectW.getAttribute('id')]){
                    el.selectedWepons[selectW.getAttribute('id')].forEach((other) =>{
                        document.querySelector(`#${other.getId()}`).classList.toggle('innocent');
                    })
                }
            }
}
function innocentClassforPlayers(el){
    for(let key in el.selectedPlayers){
        if(el.selectedPlayers[key].length===9){
            document.querySelector(`#${key}`).classList.toggle('innocentfs');
        }
    }
    const selectP= document.querySelector('.players >.selected');
    if(selectP){
        if(el.selectedPlayers[selectP.getAttribute('id')]){
            el.selectedPlayers[selectP.getAttribute('id')].forEach((other) =>{
                document.querySelector(`#${other.getId()}`).classList.toggle('innocent');
            })
        }
    }
}

function roomsInUl(game){
    game.rooms.forEach((room, index) => {
        const divElement= document.createElement('div');
        if(index<3){
            document.querySelector('.rooms> div:first-child').append(divElement);
        }else 
        if(index< 5){
            document.querySelector('.rooms> div:nth-child(2)').append(divElement);
        }else {
            document.querySelector('.rooms> div:nth-child(3)').append(divElement);
        }
        divElement.setAttribute('id', room.getId());
        divElement.textContent= room.name;
        divElement.style.backgroundImage = `url('./img/${room.getId()}.png')`;
        divElement.classList.add('room');
        divElement.addEventListener('click', ()=> {
            if(!game.selection.includes(room)){
                game.selectRoom(room);
            }else {
                game.selectRoom(' ');
            }
            divElement.classList.toggle('selected');
            document.querySelector('.rooms').classList.toggle('done');
            
            innocentClassforPlayers(room);
            innocentClassforWepons(room, game);
            updateBtnSubmit(game);
        });
    });
}
function weponsInUl(game){
    game.wepons.forEach((wep)=> {
        console.log(wep.getId(), `./img/${wep.getId()}.png`);
        const li= document.createElement('li');
        document.querySelector('.wepons').append(li);
        li.setAttribute('id', wep.getId());
        li.classList.add('wepon');
        const imgElement= document.createElement('img');
        imgElement.src= `./img/${wep.getId()}.png`;
        li.append(imgElement);
        const span= document.createElement('span');
        li.append(span);
        span.textContent= wep.name;
            li.addEventListener('click', ()=> {
                if(!game.selection.includes(wep)){
                    game.selectWepon(wep);
                }else {
                    game.selectWepon(' ');
                }
                li.classList.toggle('selected');
                li.parentElement.classList.toggle('done');

                innocentClassforPlayers(wep);
                innocentClassforRooms(wep, game);
                updateBtnSubmit(game);
            }); 
    });
}
function playersInUL(game){
    game.players.forEach((player)=> {
        const li= document.createElement('li');
        document.querySelector('.players').append(li);
        li.setAttribute('id', player.getId());
        li.classList.add('player');
        const imgElement= document.createElement('img');
        imgElement.src= `./img/${player.getId()}.jpg`;
        li.append(imgElement);
        const span= document.createElement('span');
        li.append(span);
        span.textContent= player.name;
        li.addEventListener('click', ()=> {
            if(!game.selection.includes(player)){
                game.selectPlayer(player);
            }else {
                game.selectPlayer(' ');
            }
            li.classList.toggle('selected');
            li.parentElement.classList.toggle('done');
            
            innocentClassforRooms(player, game);
            innocentClassforWepons(player, game);
            updateBtnSubmit(game);
        });
    });
}
function submitInUl(game){
    const submitBtn= document.querySelector('.submit');
    submitBtn.addEventListener('click', ()=> {        
        document.querySelectorAll('.selected').forEach((el)=> el.classList.remove('selected'));
        document.querySelectorAll('.done').forEach((el)=> el.classList.remove('done'));
        document.querySelectorAll('.innocent').forEach((el)=> el.classList.remove('innocent')); 
        document.querySelectorAll('.innocentfs').forEach((el)=> el.classList.remove('innocentfs')); 
        submitBtn.classList.remove('open');
        console.log(game.selection);
        const conLiElement= document.createElement('li');
        document.querySelector('ol').append(conLiElement);
        conLiElement.textContent= `Attemps ${game.nbAttemps}: No is not ${game.selection[0].name} in the ${game.selection[1].name} with the ${game.selection[2].name}`;
        game.nbAttemps++;
        if (game.isItTrue()){
            conLiElement.textContent= `Attemps ${game.nbAttemps}: It is true that ${game.selection[0].name} in the ${game.selection[1].name} with the ${game.selection[2].name}`;

        }
        game.selection=[' ', ' ', ' '];
    });
}

function makeSectionGame(game) {
    makeUlInSection();
    playersInUL(game);
    roomsInUl(game);
    weponsInUl(game);
    submitInUl(game);
};