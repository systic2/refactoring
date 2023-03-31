export function acquireData(input) {
  return input
    .split('\n')
    .splice(1)
    .filter(line => line.trim() !== '')
    .map(line => line.split(','))
    .filter(line => line[1].trim() === 'India')
    .map(line => ({
        city: line[0].trim(), 
        phone: line[2].trim()
      }));
}
