
const startBtn= document.querySelector('#start');
startBtn.addEventListener('click', ()=> {
    createGame();
    document.querySelector('#menu').remove();
})


function createGame(){
    let game= new Game();
    const players= ['Gilbert Gamelin', 'Eglantine Clavet', 'André Chaussée', 'Aurore Ferland'];
    const rooms= ['Kitchen', 'Bedroom', 'Bathroom', 'Living room'];
    const wepons= ['Spoon', 'Pillow', 'Towel Holder', 'TV'];
    players.forEach((p)=> {
        game.addPlayer(new Player(p));
    });
    rooms.forEach((r) => {
        game.addRoom(new Room(r));
    })
    wepons.forEach((w) => {
        game.addWepon(new Wepon(w));
    });
    game.getRandom();
    console.log(game.randomChoice);
    makeSectionGame(game);
}

function makeSectionGame(game) {
    const sectionElement= document.querySelector('#game');
    const divElement= document.createElement("div");
    const consoleElement= document.createElement("ol");
    sectionElement.append(consoleElement);

     sectionElement.append(divElement);
     const ulPlayers= document.createElement('ul');
     ulPlayers.classList.add('players');
     ulPlayers.textContent= "PLAYERS :";
     const ulRooms= document.createElement('ul');
     ulRooms.classList.add('rooms');
     ulRooms.textContent= "ROOMS :";
     const ulWepons= document.createElement('ul');
     ulWepons.classList.add('wepons');
     ulWepons.textContent= "WEPONS :";
     const submitBtn= document.createElement('button');
     submitBtn.classList.add('submit');
     submitBtn.textContent= "Submit";

     divElement.append(ulPlayers, ulRooms, ulWepons, submitBtn);
     divElement.style.display="flex";

    game.players.forEach((player)=> {
        const li= document.createElement('li');
        ulPlayers.append(li);
        li.setAttribute('id', player.getId());
        li.textContent= player.name;
        li.addEventListener('click', ()=> {
            if(!game.selection.includes(player)){
                game.selectPlayer(player);
            }else {
                game.selectPlayer(' ');
            }
            li.classList.toggle('selected');
            li.parentElement.classList.toggle('done');

            for(let key in player.selectedRooms){
                if(player.selectedRooms[key].length===4){
                    document.querySelector(`#${key}`).classList.toggle('innocentfs');
                }
            }
            for(let key in player.selectedWepons){
                if(player.selectedWepons[key].length===4){
                    document.querySelector(`#${key}`).classList.toggle('innocentfs');
                }
            }
            
            const selectR= document.querySelector('.rooms >.selected');
            if(selectR){
                
                if(player.selectedRooms[selectR.getAttribute('id')]){
                    player.selectedRooms[selectR.getAttribute('id')].forEach((wep) =>{
                        document.querySelector(`#${wep.getId()}`).classList.toggle('innocent');
                    })
                }
            }
            const selectW= document.querySelector('.wepons >.selected');
            if(selectW){
                if(player.selectedWepons[selectW.getAttribute('id')]){
                    player.selectedWepons[selectW.getAttribute('id')].forEach((room) =>{
                        document.querySelector(`#${room.getId()}`).classList.toggle('innocent');
                    })
                }
            }
            // player.selectedRooms.forEach((room) => {
            //     document.querySelector(`.${room.getId()}`).classList.toggle('innocent');
            // });
            // player.selectedWepons.forEach((wep) => {
            //     document.querySelector(`.${wep.getId()}`).classList.toggle('innocent');
            // });
            if(game.selection.includes(' ')){
                submitBtn.classList.remove('open');
            }else {
                submitBtn.classList.add('open');
            }
        });
    });

    game.rooms.forEach((room)=> {
        const li= document.createElement('li');
        ulRooms.append(li);
        li.setAttribute('id', room.getId());
        li.textContent= room.name;
        li.addEventListener('click', ()=> {
            if(!game.selection.includes(room)){
                game.selectRoom(room);
            }else {
                game.selectRoom(' ');
            }
            li.classList.toggle('selected');
            li.parentElement.classList.toggle('done');
            
            for(let key in room.selectedWepons){
                if(room.selectedWepons[key].length===4){
                    document.querySelector(`#${key}`).classList.toggle('innocentfs');
                }
            }
            for(let key in room.selectedPlayers){
                if(room.selectedPlayers[key].length===4){
                    document.querySelector(`#${key}`).classList.toggle('innocentfs');
                }
            }

            const selectP= document.querySelector('.players >.selected');
            if(selectP){
                if(room.selectedPlayers[selectP.getAttribute('id')]){
                    room.selectedPlayers[selectP.getAttribute('id')].forEach((wep) =>{
                        document.querySelector(`#${wep.getId()}`).classList.toggle('innocent');
                    })
                }
            }
            const selectW= document.querySelector('.wepons >.selected');
            if(selectW){
                if(room.selectedWepons[selectW.getAttribute('id')]){
                    room.selectedWepons[selectW.getAttribute('id')].forEach((player) =>{
                        document.querySelector(`#${player.getId()}`).classList.toggle('innocent');
                    })
                }
            }
                // room.selectedPlayer.forEach((player) => {
                //     document.querySelector(`.${player.getId()}`).classList.toggle('innocent');
                // });
                // room.selectedWepons.forEach((wep) => {
                //     document.querySelector(`.${wep.getId()}`).classList.toggle('innocent');
                // });
            
                if(game.selection.includes(' ')){
                    submitBtn.classList.remove('open');
                }else {
                    submitBtn.classList.add('open');
                }
        });
    });

    game.wepons.forEach((wep)=> {
        const li= document.createElement('li');
        ulWepons.append(li);
        li.setAttribute('id', wep.getId());
        li.textContent= wep.name;
            li.addEventListener('click', ()=> {
                if(!game.selection.includes(wep)){
                    game.selectWepon(wep);
                }else {
                    game.selectWepon(' ');
                }
                li.classList.toggle('selected');
                li.parentElement.classList.toggle('done');

                for(let key in wep.selectedRooms){
                    if(wep.selectedRooms[key].length===4){
                        document.querySelector(`#${key}`).classList.toggle('innocentfs');
                    }
                }
                for(let key in wep.selectedPlayers){
                    if(wep.selectedPlayers[key].length===4){
                        document.querySelector(`#${key}`).classList.toggle('innocentfs');
                    }
                }

                const selectP= document.querySelector('.players >.selected');
                if(selectP){
                    if(wep.selectedPlayers[selectP.getAttribute('id')]){
                        wep.selectedPlayers[selectP.getAttribute('id')].forEach((room) =>{
                            document.querySelector(`#${room.getId()}`).classList.toggle('innocent');
                        })
                    }
                }
                const selectR= document.querySelector('.rooms >.selected');
                if(selectR){
                    if(wep.selectedRooms[selectR.getAttribute('id')]){
                        wep.selectedRooms[selectR.getAttribute('id')].forEach((player) =>{
                            document.querySelector(`#${player.getId()}`).classList.toggle('innocent');
                        })
                    }
                }
                    // wep.selectedPlayer.forEach((player) => {
                    //     document.querySelector(`.${player.getId()}`).classList.toggle('innocent');
                    // });
                    // wep.selectedRooms.forEach((room) => {
                    //     document.querySelector(`.${room.getId()}`).classList.toggle('innocent');
                    // });
                    if(game.selection.includes(' ')){
                        submitBtn.classList.remove('open');
                    }else {
                        submitBtn.classList.add('open');
                    }
            }); 
    });

        submitBtn.addEventListener('click', ()=> {        
            document.querySelectorAll('.selected').forEach((el)=> el.classList.remove('selected'));
            document.querySelectorAll('.done').forEach((el)=> el.classList.remove('done'));
            document.querySelectorAll('.innocent').forEach((el)=> el.classList.remove('innocent')); 
            document.querySelectorAll('.innocentfs').forEach((el)=> el.classList.remove('innocentfs')); 
            submitBtn.classList.remove('open');
            console.log(game.selection);
            const conLiElement= document.createElement('li');
            consoleElement.append(conLiElement);
            conLiElement.textContent= `${game.selection[0].name} in the ${game.selection[1].name} with the ${game.selection[2].name}`;
            game.nbAttemps++;
            if (game.isItTrue()){
                conLiElement.textContent= `It is true that ${game.selection[0].name} in the ${game.selection[1].name} with the ${game.selection[2].name}`;
            }
            game.selection=[' ', ' ', ' '];
        });
};