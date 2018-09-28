import fonts from '../public/images/characters/*.jpg';
import makeService from './swapi';

const randomPic = () => {
  const min = 1;
  const max = 88;
  const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
  return fonts[randInt];
};

const imgs = document.getElementsByClassName('character__image');
Array.from(imgs).forEach((img => img.setAttribute('src', randomPic())));


const Service = makeService('https://swapi.co/api');
const service = new Service();

(async function load() {
  const characters = await service.getAll(2);
  console.log(characters);
  console.log(await service.expandCharacter(characters[0]));
}());
