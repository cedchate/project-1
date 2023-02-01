class Game {
    constructor(players, rooms, wepons){
        this.players= [];
        players.forEach((p)=> this.players.push(new Player(p)));
        this.rooms= [];
        rooms.forEach((r) => this.rooms.push(new Room(r)));
        this.wepons= [];
        wepons.forEach((w)=> this.wepons.push(new Wepon(w)));
        this.selection= [' ', ' ', ' '];
        this.randomChoice= [];
        this.nbAttemps= 0;
    }

    getRandom(){
        const randomPlayer= Math.floor(Math.random()*this.players.length);
        const randomRoom= Math.floor(Math.random()*this.rooms.length);
        const randomWepon= Math.floor(Math.random()*this.wepons.length);
        this.randomChoice= [this.players[randomPlayer], this.rooms[randomRoom], this.wepons[randomWepon]];
    }

    isItTrue(){
        let i=0;
        if(!this.selection.length){
            return false;
        }
        let isIt= true
        this.selection.forEach((el) => {
            if(el.name!==this.randomChoice[i].name){
                isIt= false;
            }
            i++;
        });
        if(!isIt){
            this.selection[0].notRelated(this.selection[1],this.selection[2]);
            this.selection[1].notRelated(this.selection[0],this.selection[2]);
            this.selection[2].notRelated(this.selection[0],this.selection[1]);
        }
        return isIt; 
    }
    selectPlayer(player){
        this.selection[0]= player;
    }
    selectRoom(room){
        this.selection[1]= room;
    }
    selectWepon(wep){
        this.selection[2]= wep;
    }
}