export const getColorName = (hexColor: string): string | null => {
    const colorMap: { [key: string]: string } = {
      '#e3e4e5': 'Plateado',
      '#000000': 'Negro',
      '#FFD700': 'Dorado',
      // Agrega más colores según tus necesidades
    };
  
    const colorName = colorMap[hexColor.toLowerCase()];
    return colorName || null;
  };
  