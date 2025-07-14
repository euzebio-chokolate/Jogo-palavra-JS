const initialStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLose: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: {
         '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0
    }
};

export function getStats() {
    const storedStats = localStorage.getItem('wordGuessStats');
    return storedStats ? JSON.parse(storedStats) : initialStats;
}

export function saveStats(stats) {
    localStorage.setItem('wordGuessStats', JSON.stringify(stats));
}

export function updateStats(won, attempts) {
    const stats = getStats();
    stats.gamesPlayed++;

    if (won) {
        stats.gamesWon++;
        stats.currentStreak++;
        if (stats.currentStreak > stats.maxStreak) {
            stats.maxStreak = stats.currentStreak;
        }
        
        if (stats.guessDistribution.hasOwnProperty(attempts)) {
            stats.guessDistribution[attempts]++;
        }         
    } else {
        stats.currentStreak = 0;
        stats.gamesLose++;
    }
    saveStats(stats);
}