const votes = {
    javascript: 0,
    python: 0,
    java: 0,
};

function vote(language) {
    votes[language]++;
    updateVotes();
}

function updateVotes() {
    const totalVotes = Object.values(votes).reduce(
        (sum, count) => sum + count,
        0
    )
}