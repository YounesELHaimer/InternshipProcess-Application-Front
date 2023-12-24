document.addEventListener('DOMContentLoaded', function() {
    // Définir la date cible du countdown (1er novembre de l'année suivante)
    const targetDate = new Date(new Date().getFullYear(), 11, 31);
  
    function updateCountdown() {
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;
  
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  
      // Vérifier si la date actuelle est arrivée
      if (timeDifference <= 0) {
        document.getElementById('countdown').innerHTML = 'La date est arrivée !';
      }
    }
  
    // Mettre à jour le countdown toutes les secondes
    setInterval(updateCountdown, 1000);
  });