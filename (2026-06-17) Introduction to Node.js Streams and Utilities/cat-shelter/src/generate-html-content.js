import { catService } from './cat-service.js';

async function generateHomepageContent () {
    const allCatsData = await catService.getAllCats();

    return allCatsData
        .map(catData => `
            <li>
                <img src="${catData.imageURL}">
                <h3>${catData.name}</h3>
                <p><span>Breed: </span>${catData.breedName}</p>
                <p><span>Description: </span>${catData.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats/edit/${catData.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats/shelter/${catData.id}">New Home</a></li>
                </ul>
            </li>
        `)
        .join('\n');
}

export const generateHTMLContent = {
    homepage: generateHomepageContent
};