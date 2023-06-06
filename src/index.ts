export class Game {
	private players: Array<string> = [];
	private places: Array<number> = [];
	private purses: Array<number> = [];
	private inPenaltyBox: Array<boolean> = [];
	private currentPlayer: number = 0;
	private isGettingOutOfPenaltyBox: boolean = false;

	private popQuestions: Array<string> = [];
	private scienceQuestions: Array<string> = [];
	private sportsQuestions: Array<string> = [];
	private rockQuestions: Array<string> = [];

	constructor() {
		for (let i = 0; i < 50; i++) {
			this.popQuestions.push("Pop Question " + i);
			this.scienceQuestions.push("Science Question " + i);
			this.sportsQuestions.push("Sports Question " + i);
			this.rockQuestions.push(this.createRockQuestion(i));
		}
	}

	private createRockQuestion(index: number): string {
		return "Rock Question " + index;
	}

	public add(name: string) {
		this.players.push(name);
		this.places[this.howManyPlayers() - 1] = 0;
		this.purses[this.howManyPlayers() - 1] = 0;
		this.inPenaltyBox[this.howManyPlayers() - 1] = false;
		console.log(`New player added : ${name} at place 0, with 0 coin and not in penalty box.`);
	}

	private howManyPlayers(): number {
		return this.players.length;
	}

	public roll(roll: number) {
		console.log(`Player ${this.players[this.currentPlayer]} got ${roll} on their dice.`);
		if (this.inPenaltyBox[this.currentPlayer]) {
			if (roll % 2 != 0) {
				this.isGettingOutOfPenaltyBox = true;
				console.log(`Player ${this.players[this.currentPlayer]} just got out of penalty box.`);
				
				this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
				if (this.places[this.currentPlayer] > 11) {
					this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
					console.log(`Player ${this.players[this.currentPlayer]} has circled the board.`);
				}
				console.log(`Player ${this.players[this.currentPlayer]}'s new place is ${this.places[this.currentPlayer]}.`);
				
				this.askQuestion();
			} else {
				this.isGettingOutOfPenaltyBox = false;
				console.log(`Player ${this.players[this.currentPlayer]} stays in penalty box.`);
			}
		} else {
			this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
			if (this.places[this.currentPlayer] > 11) {
				this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
				console.log(`Player ${this.players[this.currentPlayer]} has circled the board.`);
			}
			console.log(`Player ${this.players[this.currentPlayer]}'s new place is ${this.places[this.currentPlayer]}.`);
			this.askQuestion();
		}
	}

	private askQuestion(): void {
		if (this.currentCategory() == "Pop") console.log(this.popQuestions.shift());
		if (this.currentCategory() == "Science") console.log(this.scienceQuestions.shift());
		if (this.currentCategory() == "Sports") console.log(this.sportsQuestions.shift());
		if (this.currentCategory() == "Rock") console.log(this.rockQuestions.shift());
	}

	private currentCategory(): string {
		if (this.places[this.currentPlayer] == 0) return "Pop";
		if (this.places[this.currentPlayer] == 4) return "Pop";
		if (this.places[this.currentPlayer] == 8) return "Pop";
		if (this.places[this.currentPlayer] == 1) return "Science";
		if (this.places[this.currentPlayer] == 5) return "Science";
		if (this.places[this.currentPlayer] == 9) return "Science";
		if (this.places[this.currentPlayer] == 2) return "Sports";
		if (this.places[this.currentPlayer] == 6) return "Sports";
		if (this.places[this.currentPlayer] == 10) return "Sports";
		return "Rock";
	}

	private didPlayerWin(): boolean {
		return this.purses[this.currentPlayer] == 6;
	}

	public wrongAnswer(): boolean {
		this.inPenaltyBox[this.currentPlayer] = true;
		console.log(`Player ${this.players[this.currentPlayer]} just got sent to penalty box.`);

		this.currentPlayer += 1;
		if (this.currentPlayer == this.players.length) {
			this.currentPlayer = 0;
		}
		console.log(`Next player : ${this.players[this.currentPlayer]}.`);
		return false;
	}

	public wasCorrectlyAnswered(): boolean {
		if (this.inPenaltyBox[this.currentPlayer]) {
			if (this.isGettingOutOfPenaltyBox) {
				this.inPenaltyBox[this.currentPlayer] = false;
				this.purses[this.currentPlayer] += 1;
				console.log(`Player ${this.players[this.currentPlayer]} got one more coin. They have ${this.purses[this.currentPlayer]} coin(s) in their purse.`);
				
				var winner = this.didPlayerWin();
				this.currentPlayer += 1;
				if (this.currentPlayer == this.players.length) {
					this.currentPlayer = 0;
				}
				console.log(`Next player : ${this.players[this.currentPlayer]}.`);
				
				return winner;
			} else {
				this.currentPlayer += 1;
				if (this.currentPlayer == this.players.length) {
					this.currentPlayer = 0;
				}
				console.log(`Next player : ${this.players[this.currentPlayer]}.`);
				return false;
			}
		} else {
		this.purses[this.currentPlayer] += 1;
		console.log(`Player ${this.players[this.currentPlayer]} got one more coin. They have ${this.purses[this.currentPlayer]} coin(s) in their purse.`);

		var winner = this.didPlayerWin();

		this.currentPlayer += 1;
		if (this.currentPlayer == this.players.length) {
			this.currentPlayer = 0;
		}
		console.log(`Next player : ${this.players[this.currentPlayer]}.`);

		return winner;
		}
	}
}
