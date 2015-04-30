game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();
       
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        
        this.addAnimation();
        
        this.renderable.setCurrentAnimation("idle");
    },
    //sets the height and width of the player
    setSuper: function(x, y){
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
    },
    //sets the speed of the spear attack
    setPlayerTimers: function(){
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastSpear = this.now;
        this.lastAttack = new Date().getTime();
    },
    //sets the speed of the player
    setAttributes: function(){
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    //sets the animations of the player
    addAnimation: function(){
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        
    },
    
    setFlags: function(){
        //keeps track of which direction your character is going
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    //checks the if player is dead, if a key is pressed, or if player is moving
    update: function(delta){
         this.now = new Date().getTime();
         this.dead = this.checkIfDead();
         this.checkKeyPressesAndMove();
         this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //check if the player is dead or health is zero
    checkIfDead: function(){
          if(this.health <= 0){
            return true;
        }
        return false;
    },
    //checks if keys right, left, jump, or attack is pressed
    checkKeyPressesAndMove: function(){
         if (me.input.isKeyPressed("right")) {
            this.moveRight();
        }else if(me.input.isKeyPressed("left")){
            this.moveLeft();
        }else{
            this.body.vel.x = 0;
        }
         if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
            this.jump();
            }else if(this.body.vel.y===0){
            this.jumping = false;
        }
       this.attacking = me.input.isKeyPressed("attack");
    },
    //moves the player to the right
    moveRight: function(){
        //adds to the position of the x by the velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
    },
    //moves the player to the left
    moveLeft: function(){
         this.facing = "left";
            this.body.vel.x-=this.body.accel.x *me.timer.tick;
            this.flipX(false);
    },
    //makes the player jump 
    jump: function(){
        this.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },
    //checks if the one of three skills are being used
    checkAbilityKeys: function() {
        if (me.inpt.isKeyPressed("skill1")) {
           // this.speedBurst();     
        } else if (me.input.isKeyPressed("skill2")) {
           // this.eatCreep();
        } else if (me.input.isKeyPressed("skill3")){
            this.throwSpear();
        }
    },
    //makes the spear move
    throwSpear: function(){
        if(this.lastSpear >= game.data.spearTimer && game.data.ability3 >= 0){
           this.lastSpear = this.now;
           var spear = me.pool.pull("spear", this.pos.x, this.pox.y, {});
           me.game.world.addChild(spear, 10);
       }
    },
    
    setAnimation: function(){
      if(this.attacking){
            if(!this.renderable.isCurrentAnimation("attack")){
                //Sets the current animation to attack and once that is over
                //goes back to the idle animation...
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that next time we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switch to another animation
                this.renderable.setAnimationFrame();
            }
        }
        //if player is not attcking then the player is walking
       else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        //if the player is not attacking then the player is in idle
        }else if(!this.renderable.isCurrentAnimation("attack")){        
            this.renderable.setCurrentAnimation("idle");
        }  
    },
    //allows the player to lose health
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    //if the player collides with a creep or object
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            this.collideWithEnemyBase(response);
      }else if(response.b.type==='EnemyCreep'){
          this.collideWithEnemyCreep(response);
       }
    },
    //if player collides with enemy base and attacks then the base looses health
    collideWithEnemyBase: function(response){
        var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;
            
            console.log("xdif " + xdif + " ydif " + ydif);
            
            
             if(ydif<-40 && xdif< 70 && xdif>-35){
                this.body.falling = false;
                this.body.vel.y = -1;
            } else if(xdif>-27 && this.facing==='right' && (xdif<0)){
                this.body.vel.x = 0;
            }else if(xdif<70 && this.facing==='left' && (xdif>0)){
                this.body.vel.x = 0;
            }
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
            this.lastHit = this.now;    
            response.b.loseHealth(game.data.playerAttack);
        }
    },
    //will stop movement of player or creep if collides
    collideWithEnemyCreep: function(response){
          var xdif = this.pos.x - response.b.pos.x;
          var ydif = this.pos.y - response.b.pos.y;
          
          this.stopMovement(xdif);
      
          if(this.checkAttack(xdif, ydif)){
              this.hitCreep(response);
          };
          
          
    },
    //sets the speed of stopMovement function
    stopMovement: function(xdif){
         if(xdif>0){
              if(this.facing==="left"){
                  this.body.vel.x = 0;
              }
          }else{
              if(this.facing==="right"){
                  this.body.vel.x = 0;
          }
      }
    },
    
    checkAttack: function(xdif, ydif){
        if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
                  && (Math.abs(ydif) <=40) && 
                  (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
                  ){
                this.lastHit = this.now;
                //if the creeps health is less than our attack, execute code in if statement
                return true;
          }
          return false;
    },
    
    hitCreep: function(response){
        if(response.b.health <= game.data.playerAttack){
                    //add one gold for a creep kill
                    game.data.gold += 1;
                    console.log("Current gold: " + game.data.gold);
                }
                
                response.b.loseHealth(game.data.playerAttack);
    }
});