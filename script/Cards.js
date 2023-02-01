class Card {
    constructor(name){
        this.name= name;
    }

    notRelated(a,b){
    }

    getId(){
        if(this.name.indexOf(' ')==-1){
            return this.name;
        }else {
            return this.name.slice(0,this.name.indexOf(' '))+ this.name.slice(this.name.indexOf(' ')+1);
        }
    }
}

class Player extends Card {
    constructor(name){
        super(name);
        this.selectedRooms={};
        this.selectedWepons={};
    }

    addRoom(room){
        this.selectedRooms[room.getId()]= [];
    }

    addWepon(wep){
        this.selectedWepons[wep.getId()]= [];
    }

    notRelated(room, wepon){
        if(!this.selectedRooms[room.getId()]){
            this.addRoom(room);
        }
        if(!this.selectedRooms[room.getId()].includes(wepon)) { 
            this.selectedRooms[room.getId()].push(wepon);
        }
        if(!this.selectedWepons[wepon.getId()]){
            this.addWepon(wepon);
        }
        if(!this.selectedWepons[wepon.getId()].includes(wepon)) { 
            this.selectedWepons[wepon.getId()].push(room);
        }
    }

}

class Room extends Card {
    constructor(name){
        super(name);
        this.selectedPlayers={};
        this.selectedWepons={};
    }

    addPlayer(play){
        this.selectedPlayers[play.getId()]= [];
    }

    addWepon(wep){
        this.selectedWepons[wep.getId()]= [];
    }

    notRelated(player, wepon){
        if(!this.selectedPlayers[player.getId()]){
            this.addPlayer(player);
        }
        if(!this.selectedPlayers[player.getId()].includes(wepon)) { 
            this.selectedPlayers[player.getId()].push(wepon);
        }
        if(!this.selectedWepons[wepon.getId()]){
            this.addWepon(wepon);
        }
        if(!this.selectedWepons[wepon.getId()].includes(player)){
            this.selectedWepons[wepon.getId()].push(player);
        }
    }

}

class Wepon extends Card {
    constructor(name){
        super(name);
        this.selectedRooms={};
        this.selectedPlayers={};
    }

    addRoom(room){
        this.selectedRooms[room.getId()]= [];
    }

    addPlayer(play){
        this.selectedPlayers[play.getId()]= [];
    }

    notRelated(player, room){
        if(!this.selectedRooms[room.getId()]){
            this.addRoom(room);
        }
        if(!this.selectedRooms[room.getId()].includes(player)) { 
            this.selectedRooms[room.getId()].push(player);
        }
        if(!this.selectedPlayers[player.getId()]){
            this.addPlayer(player);
        }
        if(!this.selectedPlayers[player.getId()].includes(room)) { 
            this.selectedPlayers[player.getId()].push(room);
        }
    }
}