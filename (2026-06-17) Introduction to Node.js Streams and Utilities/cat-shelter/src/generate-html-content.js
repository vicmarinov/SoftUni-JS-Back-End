import { breedService } from './breed-service.js';
import { catService } from './cat-service.js';
import { escapeHTMLCharacters as escapeChars } from './escape-HTML-characters.js';

async function generateHomepageContent (filterValue) {
    const allCatsData = filterValue
        ? await catService.getAllCats(
            (catData) => {
                return catData.name?.includes(filterValue) ||
                       catData.description?.includes(filterValue);
            }
        )
        : await catService.getAllCats();

    return allCatsData
        .map(catData => `
            <li>
                <img src="${escapeChars(catData.imageURL) ?? '/assets/no-image-available.jpg'}">
                <h3>${escapeChars(catData.name) ?? 'Unnamed Cat'}</h3>
                ${
                    catData.breedName
                    ? `<p><span>Breed: </span>${escapeChars(catData.breedName)}</p>`
                    : ''
                }
                ${
                    catData.description
                    ? `<p><span>Description: </span>${escapeChars(catData.description)}</p>`
                    : ''
                }
                <ul class="buttons">
                    <li class="btn edit">
                        <a href="/cats/edit/${escapeChars(catData.id)}">Change Info</a>
                    </li>
                    <li class="btn delete">
                        <a href="/cats/shelter/${escapeChars(catData.id)}">New Home</a>
                    </li>
                </ul>
            </li>
        `)
        .join('\n');
}

async function generateBreedOptions () {
    const allBreedsData = await breedService.getAllBreeds();

    return allBreedsData
        .map(breedData => `
            <option value="${escapeChars(breedData.name)}">
                ${escapeChars(breedData.name)}
            </option>
        `)
        .join('\n');
}

async function generateEditCatForm (catId) {
    const catData = await catService.getCatById(catId);
    if (!catData) throw new Error(`There is no cat with id ${catId}`);

    const allBreedsData = await breedService.getAllBreeds();

    return `
        <form action="/cats/edit/${escapeChars(catId)}" method="post" class="cat-form">
            <h2>Edit Cat</h2>

            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${escapeChars(catData.name) ?? ''}">

            <label for="description">Description</label>
            <textarea name="description" id="description">${escapeChars(catData.description) ?? ''}</textarea>

            <label for="imageURL">Image URL</label>
            <input name="imageURL" type="text" id="imageURL" value="${escapeChars(catData.imageURL) ?? ''}">

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
                                value="${escapeChars(breedData.name)}"
                                ${
                                    catData.breedId === breedData.id
                                    ? 'selected' : ''
                                }
                            >
                                ${escapeChars(breedData.name)}
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
        <form action="/cats/shelter/${escapeChars(catId)}" method="post" class="cat-form">
            <h2>Shelter the cat</h2>

            <img src="${escapeChars(catData.imageURL) ?? '/assets/no-image-available.jpg'}">

            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${escapeChars(catData.name) ?? 'Unnamed Cat'}" disabled>

            ${
                catData.description
                ? `
                    <label for="description">Description</label>
                    <textarea name="description" id="description" disabled>${escapeChars(catData.description)}</textarea>
                ` : ''
            }

            ${
                catData.breedName
                ? `
                    <label for="group">Breed</label>
                    <select name="breedName" id="group" disabled>
                        <option value="${escapeChars(catData.breedName)}">
                            ${escapeChars(catData.breedName)}
                        </option>
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