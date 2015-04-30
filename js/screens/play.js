game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
    onResetEvent: function() {
        // reset the score
        game.data.score = 0;
        //it tells the program to load the map level01*/
        me.levelDirector.loadLevel("level01");

        //tells the player how much exp they have
        console.log(game.data.exp);
        //sets the spawn location
        this.resetPlayer(0, 420);
        //adds the gameTimeManager to the game
        var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
        me.game.world.addChild(gameTimerManager, 0);
        //controles the respawn time of your hero
        var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
        me.game.world.addChild(heroDeathManager, 0);
        //adds the ExperienceManager to the game
        var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
        me.game.world.addChild(experienceManager, 0);
        //adds the SpendGold to the game
        var spendGold = me.pool.pull("SpendGold", 0, 0, {});
        me.game.world.addChild(spendGold, 0);
        //binds keys to the game
        me.input.bindKey(me.input.KEY.B, "buy");
        me.input.bindKey(me.input.KEY.Q, "skill1");
        me.input.bindKey(me.input.KEY.W, "skill2");
        me.input.bindKey(me.input.KEY.E, "skill3");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.SPACE, "jump");
        me.input.bindKey(me.input.KEY.A, "attack");

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    // action to perform when leaving this screen (state change)
	 
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    },
        
        resetPlayer: function(x, y) {
        /*the player will spawn at the x-axis of 0 and y-axis of 420*/
        game.data.player = me.pool.pull("player", x, y, {});
        me.game.world.addChild(game.data.player, 5);
    }
});
