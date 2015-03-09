game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
        /*the code below are js codes that allow items not from this program to be know and used for this project*/
        {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
        {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
        {name: "player", type:"image", src: "data/img/orcSpear.png"},
        {name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
        /*this code allow the player to connect their maps too their progam*/
        {name: "level01", type: "tmx", src: "data/map/test.tmx"}


	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
