class ColorGame {
  constructor() {
    this.score = 0;
    this.targetColor = "";
    this.optionsContainer = document.querySelector(".options-container");
    this.colorBox = document.querySelector(".color-box");
    this.gameStatus = document.querySelector(".game-status");
    this.scoreElement = document.querySelector('[data-testid="score"]');
    this.newGameButton = document.querySelector(".new-game-button");

    this.newGameButton.addEventListener("click", () => this.resetGame());
    this.startNewGame();
  }

  generateRandomHSL() {
    return {
      h: Math.floor(Math.random() * 360),
      s: Math.floor(70 + Math.random() * 30),
      l: Math.floor(45 + Math.random() * 10),
    };
  }

  generateColors() {
    const colors = [];

    const baseColor = this.generateRandomHSL();
    const targetColor = `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)`;
    colors.push(targetColor);

    const similarLightness = Math.max(20, baseColor.l - 15);
    colors.push(`hsl(${baseColor.h}, ${baseColor.s}%, ${similarLightness}%)`);

    for (let i = 0; i < 4; i++) {
      const randomColor = this.generateRandomHSL();
      randomColor.h =
        (baseColor.h + 120 + Math.floor(Math.random() * 120)) % 360;
      colors.push(
        `hsl(${randomColor.h}, ${randomColor.s}%, ${randomColor.l}%)`
      );
    }

    return colors;
  }

  resetGame() {
    this.score = 0;
    this.scoreElement.textContent = this.score;
    this.startNewGame();
  }

  startNewGame() {
    const colors = this.generateColors();
    this.targetColor = colors[0];
    this.colorBox.style.backgroundColor = this.targetColor;

    const shuffledColors = colors.sort(() => Math.random() - 0.5);
    this.renderColorOptions(shuffledColors);
    this.gameStatus.textContent = "";
  }

  renderColorOptions(colors) {
    this.optionsContainer.innerHTML = "";
    colors.forEach((color) => {
      const button = document.createElement("button");
      button.className = "color-option";
      button.setAttribute("data-testid", "colorOption");
      button.style.backgroundColor = color;
      button.addEventListener("click", () => this.handleGuess(color));
      this.optionsContainer.appendChild(button);
    });
  }

  handleGuess(guessedColor) {
    if (guessedColor === this.targetColor) {
      this.score++;
      this.scoreElement.textContent = this.score;
      this.gameStatus.textContent = "Correct! Well done!";
      this.gameStatus.style.color = "green";
      this.gameStatus.style.fontWeight = "bold";
      this.gameStatus.className = "game-status correct-animation";
      setTimeout(() => this.startNewGame(), 1000);
    } else {
      this.gameStatus.textContent = "Wrong guess! Try again!";
      this.gameStatus.style.color = "red";
      this.gameStatus.className = "game-status wrong-animation";
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new ColorGame();
});
