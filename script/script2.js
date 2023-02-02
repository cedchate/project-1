document.querySelector('#menu').style.backgroundImage= 'url("./img/boite.jpeg")';
const startBtn= document.querySelector('#start');
startBtn.addEventListener('click', ()=> {
    createGame();
    document.querySelector('#menu').remove();
    document.querySelector('h1').style.visibility= 'visible';
});

function createGame(){
    const players= ['Colonel Moutarde', 'Madame Pervenche',  'Madame Leblanc', 'Mademoiselle Rose', 'Docteur Olive', 'Professeur Violet'];
    const rooms= ['Kitchen', 'Dining room', 'Living room','Lounge', 'Hall','Winter Garden', 'Billiard room', 'Library', 'Office room'];
    const wepons= ['Candlestick', 'Wrench', 'Rope', 'Knife', 'Lamp', 'Hammer', 'Baton', 'Poison', 'Revolver'];
    let game= new Game(players, rooms, wepons);
    game.getRandom();
    console.log(game.randomChoice);
    makeSectionGame(game);
}

function makeUlInSection (){
    const sectionElement= document.querySelector('#game');

    const divPlay= document.createElement('div');
    const divPlayers= document.createElement('div');
    divPlay.classList.add('container');
    const h2Players= document.createElement('h2');
    // divPlay.append(ulPlayers);
    divPlay.append(h2Players);
    divPlay.append(divPlayers);
    divPlayers.classList.add('players');
    h2Players.textContent= "PLAYERS :";
    
    const plateElement= document.createElement('div');
    const h2Rooms= document.createElement('h2');
    const divRoomElement= document.createElement('div');
    divRoomElement.classList.add('container');
    const column1Plate= document.createElement('div');
    const column2Plate= document.createElement('div');
    const column3Plate= document.createElement('div');
    plateElement.append(column1Plate,column2Plate,column3Plate);
    divRoomElement.append(h2Rooms);
    divRoomElement.append(plateElement);
    plateElement.classList.add('rooms');
    h2Rooms.textContent= "ROOMS :";
    
    const divWepons= document.createElement('div');
    divWep= document.createElement('div');
    divWep.classList.add('container');
    const h2Wepons= document.createElement('h2');
    divWep.append(h2Wepons);
    divWepons.classList.add('wepons');
    h2Wepons.textContent= "WEAPONS :";
    divWep.append(divWepons);

    // const divUp= document.createElement('div');
    const divGame= document.createElement('div');
    divGame.classList.add('up');
    divGame.append(divWep,divPlay,divRoomElement);

    const submitBtn= document.createElement('button');
    submitBtn.classList.add('submit');
    submitBtn.textContent= "Submit";
    const submitElem= document.createElement('div');
    const counterElement= document.createElement('h2');
    counterElement.classList.add('counter');
    counterElement.textContent= 0;
    counterdiv= document.createElement('div');
    submtDiv= document.createElement('div');
    submtDiv.classList.add('andReplay')
    counterdiv.append(counterElement);
    submtDiv.append(submitBtn)
    submitElem.append(counterdiv);
    submitElem.append(submtDiv);



    const divElement= document.createElement("div");
    divElement.classList.add('game');
    sectionElement.append(divElement);
    divElement.append( divGame, submitElem);

    
}

function updateBtnSubmit(game){
    if(game.selection.includes(' ')){
        document.querySelector('.submit').classList.remove('open');
    }else {
        document.querySelector('.submit').classList.add('open');
    }
}

function innocentClassforRooms(el){
    for(let key in el.selectedRooms){
        if(el.selectedRooms[key].length===9){
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
function innocentClassforRoomsforWepon(el){
    for(let key in el.selectedRooms){
        if(el.selectedRooms[key].length===6){
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
function innocentClassforWepons(el){
    for(let key in el.selectedWepons){
            if(el.selectedWepons[key].length===9){
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
function innocentClassforWeponsforRoom(el){
    for(let key in el.selectedWepons){
        if(el.selectedWepons[key].length===6){
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
            innocentClassforWeponsforRoom(room);
            updateBtnSubmit(game);
        });
    });
}

function weponsInUl(game){
    game.wepons.forEach((wep)=> {
        const li= document.createElement('div');
        document.querySelector('.wepons').append(li);
        li.setAttribute('id', wep.getId());
        li.classList.add('wepon');
        const imgElement= document.createElement('img');
        imgElement.src= `./img/${wep.getId()}.png`;
        li.append(imgElement);
            li.addEventListener('click', ()=> {
                if(!game.selection.includes(wep)){
                    game.selectWepon(wep);
                }else {
                    game.selectWepon(' ');
                }
                li.classList.toggle('selected');
                li.parentElement.classList.toggle('done');

                innocentClassforPlayers(wep);
                innocentClassforRoomsforWepon(wep);
                updateBtnSubmit(game);
            }); 
    });
}

function playersInUL(game){
    game.players.forEach((player)=> {
        const li= document.createElement('div');
        li.setAttribute('id', player.getId());
        li.classList.add('player');
        const imgElement= document.createElement('img');
        imgElement.src= `./img/${player.getId()}.jpg`;
        li.append(imgElement);
        document.querySelector('.players').append(li);
        li.addEventListener('click', ()=> {
            if(!game.selection.includes(player)){
                game.selectPlayer(player);
            }else {
                game.selectPlayer(' ');
            }
            li.classList.toggle('selected');
            li.parentElement.classList.toggle('done');

            innocentClassforRooms(player);
            innocentClassforWepons(player);
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
        if (game.isItTrue()){
            game.nbAttemps= "win";
            document.querySelector('#affiche').textContent= `Yes it was ${game.selection[0].name} with the ${game.selection[1].name} in the ${game.selection[2].name}!`;
            document.querySelector('#affiche').style.visibility= 'visible';
            const replayBtn = document.createElement('button');
            replayBtn.textContent= 'Replay';
            document.querySelector('.andReplay').append(replayBtn);
            replayBtn.addEventListener('click', ()=> {
                console.log('again');
                document.querySelector('.game').remove();
                createGame();
            });
        }else {
            game.nbAttemps++;
            setTimeout(()=>document.querySelector('#affiche').style.visibility= 'hidden', 10000);
            document.querySelector('#affiche').textContent= `It is not ${game.selection[0].name} with the ${game.selection[1].name} in the ${game.selection[2].name}...`;
            document.querySelector('#affiche').style.visibility= 'visible';
        }
        document.querySelector('.counter').textContent= game.nbAttemps;
        
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