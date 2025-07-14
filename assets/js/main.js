import { getStats } from "./stats.js";

const buttonModal = document.getElementById('openStatsModalBtn');
const closeButton = document.querySelector('.close-button');
const statGamesPlayed = document.getElementById('statGamesPlayed');
const statGamesWon = document.getElementById('statGamesWon');
const statGamesLose = document.getElementById('statGamesLose');
const statCurrentStreak = document.getElementById('statCurrentStreak');
const statMaxStreak = document.getElementById('statMaxStreak');
const dists = document.querySelectorAll('.dist');

export function showModal() {
    loadModal();
    const modal = document.getElementById('statsModal');
    modal.classList.toggle('show')
}

function loadModal() {
    const stats = getStats();

    statGamesPlayed.innerText = stats.gamesPlayed;
    statGamesWon.innerHTML = stats.gamesWon;
    statGamesLose.innerHTML = stats.gamesLose;
    statCurrentStreak.innerHTML = stats.currentStreak
    statMaxStreak.innerHTML = stats.maxStreak;

    dists.forEach((dist, index) => {
        const attempt = (index + 1).toString();
        dist.innerHTML = stats.guessDistribution[attempt];
    });
}

buttonModal.addEventListener('click', showModal)
closeButton.addEventListener('click', showModal)