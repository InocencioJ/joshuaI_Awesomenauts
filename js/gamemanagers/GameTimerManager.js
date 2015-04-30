game.GameTimerManager = Object.extend({
   init: function(x, y, settings){
       this.now = new Date().getTime();
       this.lastCreep = new Date().getTime();
       this.pause = false;
       this.alwaysUpdate = true;
   },
   //updates the amount of gold you get and checks the time of the creep spawning
   update: function(){
       this.now = new Date().getTime();
       this.goldTimerCheck();
       this.creepTimerCheck();
       
       return true;
   },
   //adds one gold if a creep is killed or if 1 second has passed. also can be changed if gold amount is upgraded
   goldTimerCheck: function(){
       if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)) {
          game.data.gold += (game.data.exp1 + 1);
          console.log("Current gold: " +game.data.gold);
       }
   },
   //adds a creep every 1 second
   creepTimerCheck: function(){
              if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
           this.lastCreep = this.now;
           var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
           me.game.world.addChild(creepe, 5);
       }
   }
});


