import runGoldenMaster from "jest-golden-master";
import { Game } from ".";

test("My first scenario", async () => {
	runGoldenMaster(async () => {
		const game = new Game();
		game.add("Mathieu");
		game.add("Thomas");
		game.add("Clément");
		game.roll(1);
		game.wasCorrectlyAnswered();
		game.roll(1);
		game.wasCorrectlyAnswered();
		game.roll(1);
		game.wasCorrectlyAnswered();
		game.roll(1);
		game.wasCorrectlyAnswered();
		game.roll(1);
		game.wasCorrectlyAnswered();
		game.roll(1);
		game.wasCorrectlyAnswered();
		game.roll(1);
		game.wasCorrectlyAnswered();
		game.roll(1);
		game.wasCorrectlyAnswered();
	});
});

test("2nd scenario : player goes to penalty box", async () => {
	runGoldenMaster(async () => {
		const game = new Game();
		game.add("Mathieu");
		game.add("Thomas");
		game.roll(1);
		game.wrongAnswer();
	});
});

test("3rd scenario : player goes to penalty box then comes out", async () => {
	runGoldenMaster(async () => {
		const game = new Game();
		game.add("Mathieu");
		game.add("Thomas");
		game.roll(1);
		game.wrongAnswer();
		game.roll(2);
		game.wasCorrectlyAnswered();
		game.roll(3);
		game.wasCorrectlyAnswered();
	});
});

test("4th scenario : player goes to penalty box and stays there", async () => {
	runGoldenMaster(async () => {
		const game = new Game();
		game.add("Mathieu");
		game.add("Thomas");
		game.roll(1);
		game.wrongAnswer();
		game.roll(2);
		game.wasCorrectlyAnswered();
		game.roll(4);
	});
});

test("5th scenario : player goes to penalty box, comes out but goes back into it", async () => {
	runGoldenMaster(async () => {
		const game = new Game();
		game.add("Mathieu");
		game.add("Thomas");
		game.roll(1);
		game.wrongAnswer();
		game.roll(2);
		game.wasCorrectlyAnswered();
		game.roll(3);
		game.wrongAnswer();
	});
});

test("6th scenario : one player circles the board", async () => {
	runGoldenMaster(async () => {
		const game = new Game();
		game.add("Mathieu");
		game.add("Thomas");
		game.add("Clément");
		game.roll(6);
		game.wasCorrectlyAnswered();
		game.roll(1);
		game.wasCorrectlyAnswered();
		game.roll(2);
		game.wasCorrectlyAnswered();
		game.roll(6);
		game.wasCorrectlyAnswered();
	});
});