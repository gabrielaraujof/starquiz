import fonts from '../public/images/characters/*.jpg';

const randomPic = () => {
    const min = 1;
    const max = 88; 
    const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return fonts[randInt];
};

const imgs = document.getElementsByClassName('character__image');
for (const img of imgs){
    img.setAttribute('src', randomPic());
}