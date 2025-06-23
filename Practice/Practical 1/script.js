// Object to store votes for each programming language
const votes = {
  javascript: 0,
  python: 0,
  java: 0,
  cpp: 0,
};

// Function to handle voting
function vote(language) {
  votes[language]++;
  updateVotes();
}

// Function to update the vote display and progress bars
function updateVotes() {
  const totalVotes = Object.values(votes).reduce(
    (sum, count) => sum + count,
    0
  );

  console.log(Object.values(votes).reduce(
    (sum, count) => sum + count,
    0
  ))

  console.log(Object.values(votes))

  // Update each language's vote count and progress bar
  for (const language in votes) {
    const voteCount = votes[language];
    const percentage = totalVotes === 0 ? 0 : (voteCount / totalVotes) * 100;

    // Update vote count
    document.getElementById(`${language}-votes`).textContent = voteCount;

    // Update progress bar
    document.getElementById(`${language}-bar`).style.width = `${percentage}%`;
  }
}

// Simulate real-time voting from other users
function simulateVoting() {
  const languages = Object.keys(votes);
  const randomLanguage =
    languages[Math.floor(Math.random() * languages.length)];
  vote(randomLanguage);
}

// Start simulating votes every 2 seconds
// setInterval(simulateVoting, 2000);

// Initialize the display
updateVotes();
