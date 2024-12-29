# Memory Card Game

## Project Overview

The **Memory Card Game** is a fun and interactive web-based game developed using **HTML, CSS, and JavaScript**. Players flip cards to match pairs within a set time limit. The game offers customizable backgrounds and card colors, as well as limited hints to assist players in locating matching pairs.

---

## Features

- **Time Limit**: Set a custom time limit to complete the game.
- **Customizable Appearance**: Choose background and card colors.
- **Hints**: Hints reveal random card locations every 4 seconds.
- **Responsive Design**: Fully responsive on desktop and mobile devices.

---

## Project Structure

```
Memory-Card-Game/
├── images/
│   ├── img-1.png
│   ├── img-2.png
│   ├── img-3.png
│   ├── img-4.png
│   ├── img-5.png
│   ├── img-6.png
│   └── que_icon.svg
├── index.html
├── style.css
└── script.js
```

---

## How to Play

1. **Set Time**: Input the desired time limit (in seconds) and click the **Submit** button.
2. **Customize Appearance**: Use the color pickers to select background and card colors, then apply changes by clicking the **Apply Colors** button.
3. **Start the Game**: The game begins when you flip the first card.
4. **Flip and Match**: Click on a card to flip it and try to find its matching pair.
5. **Hints**: Every 4 seconds, a hint will reveal a random card for 0.5 seconds.
6. **Winning/Losing**:
   - Match all pairs within the time limit to win.
   - Failing to match all pairs before the timer expires results in a loss.

---

## How to Build and Run the Project

1. **Clone the Repository**:
   ```sh
   git clone <repository_url>
   cd Memory-Card-Game
   ```
2. **Run the Game**:
   - Open the `index.html` file in any modern web browser.

---

## Version Control Practices

### Initial Commit

- Project initialized with the message:
  ```
  Initial commit of Memory Card Game
  ```

### Branching and Merging

- **Branch**: A new branch `feature/color-customization` was created to add the color customization feature.
- **Implementation**: The feature was developed and committed to the `feature/color-customization` branch.
- **Merge**: After successful testing, the branch was merged into the main branch.

### .gitignore

The following entries are included in the `.gitignore` file to exclude unnecessary files:

```
node_modules/
*.log
*.DS_Store
```

---

## Challenges Faced

1. **Game Logic**: Ensuring the timer and hint functionalities work seamlessly with the card flipping logic.
2. **Dynamic Customization**: Implementing real-time color customization using JavaScript.

---

## Submission

The project is available at the following link:
[Memory Card Game Repository](https://github.com/aastu-software-engineering/Flip-card-memory-game)

---

Thank you for checking out the **Memory Card Game**! Feel free to contribute or provide feedback.
