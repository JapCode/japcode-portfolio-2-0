function generateUniqueIdFront(): string {
  const currentDate = new Date();
  const random = Math.random().toString(36).substring(2, 8); // Genera una cadena aleatoria
  const uniqueId = `clave_${currentDate.getTime()}_${random}`;
  return uniqueId;
}

export default generateUniqueIdFront;
