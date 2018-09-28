import http from './http';

const follow = async url => http(await fetch(url));

export default baseUrl => function SWService() {
  if (!(this instanceof SWService)) {
    return new SWService();
  }

  SWService.prototype.getAll = async (page) => {
    const params = page ? `page=${page}` : '';
    const json = await http(await fetch(`${baseUrl}/people/?${params}`));
    return json.results;
  };

  SWService.prototype.getFilms = char => char.films.map(follow);
  SWService.prototype.getSpecies = char => char.species.map(follow);
  SWService.prototype.getVehicles = char => char.vehicles.map(follow);
  SWService.prototype.getStarships = char => char.starships.map(follow);

  SWService.prototype.expandCharacter = async (character) => {
    const [films, species, vehicles, starships] = await Promise.all([
      Promise.all(this.getFilms(character)),
      Promise.all(this.getSpecies(character)),
      Promise.all(this.getVehicles(character)),
      Promise.all(this.getStarships(character)),
    ]);

    return Object.assign({ }, character, {
      films, species, vehicles, starships,
    });
  };

  return this;
};
