import { breedService } from './breed-service.js';
import { catService } from './cat-service.js';

async function generateHomepageContent () {
    const allCatsData = await catService.getAllCats();

    return allCatsData
        .map(catData => `
            <li>
                <img src="${catData.imageURL ?? '/assets/no-image-available.jpg'}">
                <h3>${catData.name ?? 'Unnamed Cat'}</h3>
                ${
                    catData.breedName
                    ? `<p><span>Breed: </span>${catData.breedName}</p>`
                    : ''
                }
                ${
                    catData.description
                    ? `<p><span>Description: </span>${catData.description}</p>`
                    : ''
                }
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats/edit/${catData.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats/shelter/${catData.id}">New Home</a></li>
                </ul>
            </li>
        `)
        .join('\n');
}

async function generateBreedOptions () {
    const allBreedsData = await breedService.getAllBreeds();

    return allBreedsData
        .map(breedData => `<option value="${breedData.name}">${breedData.name}</option>`)
        .join('\n');
}

async function generateEditCatForm (catId) {
    const catData = await catService.getCatById(catId);
    if (!catData) throw new Error(`There is no cat with id ${catId}`);

    const allBreedsData = await breedService.getAllBreeds();

    return `
        <form action="/cats/edit/${catId}" method="post" class="cat-form">
            <h2>Edit Cat</h2>

            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${catData.name ?? ''}">

            <label for="description">Description</label>
            <textarea name="description" id="description">${catData.description ?? ''}</textarea>

            <label for="imageURL">Image URL</label>
            <input name="imageURL" type="text" id="imageURL" value="${catData.imageURL ?? ''}">

            <label for="group">Breed</label>
            <select name="breedName" id="group">
                ${
                    !allBreedsData.find(breedData => catData.breedId === breedData.id)
                    ? '<option selected disabled value="">select a breed</option>'
                    : ''
                }
                ${
                    allBreedsData
                        .map(breedData => `
                            <option
                                value="${breedData.name}"
                                ${
                                    catData.breedId === breedData.id
                                    ? 'selected' : ''
                                }
                            >
                                ${breedData.name}
                            </option>
                        `)
                        .join('\n')
                }
            </select>

            <button type="submit">Edit Cat</button>
        </form>
    `;
}

async function generateShelterCatForm (catId) {
    const catData = await catService.getCatById(catId);
    if (!catData) throw new Error(`There is no cat with id ${catId}`);

    return `
        <form action="/cats/shelter/${catId}" method="post" class="cat-form">
            <h2>Shelter the cat</h2>

            <img src="${catData.imageURL ?? '/assets/no-image-available.jpg'}">

            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${catData.name ?? 'Unnamed Cat'}" disabled>

            ${
                catData.description
                ? `
                    <label for="description">Description</label>
                    <textarea name="description" id="description" disabled>${catData.description}</textarea>
                ` : ''
            }

            ${
                catData.breedName
                ? `
                    <label for="group">Breed</label>
                    <select name="breedName" id="group" disabled>
                        <option value="${catData.breedName}">${catData.breedName}</option>
                    </select>
                ` : ''
            }

            <button type="submit">SHELTER THE CAT</button>
        </form>
    `;
}

export const generateHTMLContent = {
    homepage: generateHomepageContent,
    breedOptions: generateBreedOptions,
    editCatForm: generateEditCatForm,
    shelterCatForm: generateShelterCatForm
};