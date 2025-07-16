export const arrondissementLabel = (code) => {
  const number = parseInt(code.slice(-2), 10);
  return `PARIS ${number}${number === 1 ? 'ER' : 'EME'} ARRONDISSEMENT`;
};

export const inverseArrondissementLabel = (label) => {
  const match = label?.match(/PARIS (\d+)(?:ER|EME) ARRONDISSEMENT/);
  if (!match) return '';
  const num = parseInt(match[1], 10);
  return `750${num < 10 ? '0' + num : num}`;
};

// Fonction pour formatter les types de fontaines
export const formatFountainType = (type) => {
  if (!type) return '';
  
  // Normalisation des abréviations et erreurs courantes
  let normalized = type
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\bftne\b/g, 'fontaine')
    .replace(/\bfontne\b/g, 'fontaine')
    .replace(/\bfont\b(?!\s+de)/g, 'fontaine')
    .replace(/\bftn\b/g, 'fontaine')
    .replace(/\bpoing\s+eau\b/g, 'point d\'eau')
    .replace(/\bpt\s+eau\b/g, 'point d\'eau')
    .replace(/\bwallace\b/g, 'wallace')
    .replace(/\b2en1\b/g, '2 en 1')
    .replace(/\b2\s*en\s*1\b/g, '2 en 1');
  
  // Formatage final : capitalisation
  let formatted = normalized
    .split(' ')
    .map(word => {
      if (word === 'wallace') return 'Wallace';
      if (word === '2' || word === 'en' || word === '1') return word;
      
      if (word.includes('\'')) {
        return word.split('\'').map(part => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join('\'');
      }
      
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
  
  return formatted;
};

// Fonction pour formatter tous les types (équipements, espaces, fontaines)
export const formatDisplayType = (type, source = null) => {
  if (!type) return '';
  
  if (source === 'fontaines' || type.toLowerCase().includes('fontaine') || 
      type.toLowerCase().includes('ftne') || type.toLowerCase().includes('fontne')) {
    return formatFountainType(type);
  }
  
  return type
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
