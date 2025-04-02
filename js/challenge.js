document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const counterDisplay = document.getElementById('counter');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('list');
  
    let counter = 0;
    let timer = null;
    let isPaused = false;
    let likeCounts = {};
    
    // Function to start the timer
    function startTimer() {
      timer = setInterval(() => {
        if (!isPaused) {
          counter++;
          updateCounter();
        }
      }, 1000);
    }
  
    // Update the counter display
    function updateCounter() {
      counterDisplay.textContent = counter;
    }
  
    // Handle "minus" button click
    minusButton.addEventListener('click', () => {
      counter--;
      updateCounter();
    });
  
    // Handle "plus" button click
    plusButton.addEventListener('click', () => {
      counter++;
      updateCounter();
    });
  
    // Handle "heart" button click (like the current counter value)
    heartButton.addEventListener('click', () => {
      // Increment like count for the current counter value
      if (!likeCounts[counter]) {
        likeCounts[counter] = 0;
      }
      likeCounts[counter]++;
      
      // Display the like count in the list
      let likeItem = document.createElement('li');
      likeItem.textContent = `${counter} has been liked ${likeCounts[counter]} times`;
      likesList.appendChild(likeItem);
    });
  
    // Handle "pause" button click (pause/resume counter)
    pauseButton.addEventListener('click', () => {
      if (isPaused) {
        isPaused = false;
        startTimer(); // Restart the timer if it's resumed
        pauseButton.textContent = 'pause';
        enableButtons();
      } else {
        isPaused = true;
        clearInterval(timer); // Stop the timer
        pauseButton.textContent = 'resume';
        disableButtons();
      }
    });
  
    // Disable all buttons except the pause button
    function disableButtons() {
      minusButton.disabled = true;
      plusButton.disabled = true;
      heartButton.disabled = true;
    }
  
    // Enable all buttons
    function enableButtons() {
      minusButton.disabled = false;
      plusButton.disabled = false;
      heartButton.disabled = false;
    }
  
    // Handle comment submission
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const commentText = commentInput.value.trim();
      if (commentText !== "") {
        const newComment = document.createElement('p');
        newComment.textContent = commentText;
        commentList.appendChild(newComment);
        commentInput.value = ''; // Clear the input field after submission
      }
    });
  
    // Start the timer when the page loads
    startTimer();
  });
  