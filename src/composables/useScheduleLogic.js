import { computed } from 'vue';

export function useScheduleLogic() {
  // Analyse des horaires
  const analyzeSchedule = (schedule, currentTime) => {
    if (!schedule || typeof schedule !== 'string') return null;
    
    const cleanSchedule = schedule.toLowerCase().trim();
    
    if (cleanSchedule === '-' || cleanSchedule === '–') return false;
    if (cleanSchedule.includes('fermé')) return false;
    if (cleanSchedule.includes('24h') || cleanSchedule.includes('24 h')) return true;
    
    // Pattern pour capturer différents formats d'horaires
    const pattern = /(\d{1,2})(?:[h:.](\d{2}))?\s*[-–à]\s*(\d{1,2})(?:[h:.](\d{2}))?/g;
    const matches = [...cleanSchedule.matchAll(pattern)];
    
    if (matches.length === 0) {
      return null;
    }
    
    for (const match of matches) {
      const [, startHour, startMin, endHour, endMin] = match;
      
      const start = parseInt(startHour) * 100 + parseInt(startMin || '0');
      let end = parseInt(endHour) * 100 + parseInt(endMin || '0');
      
      
      // Gestion des horaires qui traversent minuit (ex: 22h-6h)
      if (end < start) {
        if (currentTime >= start || currentTime <= end) {
          return true;
        }
      } else {
        // Horaires normaux dans la même journée
        if (currentTime >= start && currentTime <= end) {
          return true;
        }
      }
    }
    
    return false;
  };

  // Fonction qui permet de savoir si l'élément est ouvert
  const getOpeningStatus = (location, selectedDay = null) => {
    if (location.ouvert_24h?.toLowerCase() === 'oui') {
      return { status: 'ouvert', priority: 1, label: 'Ouvert 24h/24' };
    }

    const now = new Date();
    const daysMap = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const currentDay = daysMap[now.getDay()];
    
    const dayToCheck = selectedDay || currentDay;
    const isCurrentDay = dayToCheck === currentDay;

    const schedule = location[`horaires_${dayToCheck}`];
  
    if (schedule && schedule.toLowerCase().includes('fermé')) {
      return { status: 'ferme', priority: 3, label: 'Fermé' };
    }

    
    if (!schedule || schedule.trim() === '' || schedule === '–' || schedule === null) {
      // Utiliser statut_ouverture SEULEMENT si c'est le jour actuel
      if (isCurrentDay && location.statut_ouverture?.toLowerCase() === 'ouvert') {
        return { status: 'ouvert', priority: 1, label: 'Ouvert' };
      }
      return { status: 'nc', priority: 2, label: 'N.C.' };
    }

    // Analyser les horaires pour l'heure actuelle (seulement si jour actuel)
    if (isCurrentDay) {
      const currentTime = now.getHours() * 100 + now.getMinutes();
      const isOpen = analyzeSchedule(schedule, currentTime);
      
      if (isOpen === true) {
        return { status: 'ouvert', priority: 1, label: `Ouvert (${schedule})` };
      } else if (isOpen === false) {
        return { status: 'ferme', priority: 3, label: `Fermé (${schedule})` };
      }
      
      return { status: 'ferme', priority: 3, label: `Fermé (${schedule})` };
    }

    return { status: 'nc', priority: 2, label: `Horaires: ${schedule.trim()}` };
  };

  // Tri par statut d'ouverture
  const sortByOpeningStatus = (data, selectedDay = null) => {
    return [...data].sort((a, b) => {
      const statusA = getOpeningStatus(a, selectedDay);
      const statusB = getOpeningStatus(b, selectedDay);
      
      // Comparaison par priorité
      if (statusA.priority !== statusB.priority) {
        return statusA.priority - statusB.priority;
      }
      
      return (a.nom || '').localeCompare(b.nom || '');
    });
  };

  return {
    analyzeSchedule,
    getOpeningStatus,
    sortByOpeningStatus
  };
}
