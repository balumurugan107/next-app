import { ValueOf } from 'src/types';

export default <T extends {}>(services: T[], query: string, properties: (keyof T)[]): T[] => {
  try {
    if (!query) {
      return services;
    }
    return services?.filter(service => {
      let matches = true;

      let containsQuery = false;

      properties.forEach(property => {
        const value: ValueOf<T> = service[property];
        if (value && typeof value === 'string') {
          if (value.toLowerCase().includes(query.toLowerCase())) {
            containsQuery = true;
          }
        }
        if (value && Array.isArray(value)) {
          value.forEach(element => {
            if (
              typeof element === 'string' &&
              element.toLowerCase().includes(query.toLowerCase())
            ) {
              containsQuery = true;
            }
          });
        }
      });

      if (!containsQuery) {
        matches = false;
      }

      return matches;
    });
  } catch (error) {
    console.error(`applyFilters-->${error}`);
    return services;
  }
};
