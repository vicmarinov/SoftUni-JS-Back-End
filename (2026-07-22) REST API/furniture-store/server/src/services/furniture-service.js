import { furnitureRepository } from '../repositories';

export async function getAll () {
    const allFurnitureItems = await furnitureRepository.getAll();
    return allFurnitureItems.map(item => ({
        _id: item.id,
        img: item.imageURL,
        ...item
    }));
}

export async function getById (furnitureId) {
    const furnitureItem = await furnitureRepository.getById(furnitureId);
    return {
        _id: furnitureItem.id,
        _ownerId: furnitureItem.createdBy,
        img: furnitureItem.imageURL,
        ...furnitureItem
    };
}

export function getCreator (furnitureId) {
    const furnitureCreator = furnitureRepository.getCreator(furnitureId);
    return furnitureCreator;
}

export async function create (
    {
        make,
        model,
        year,
        description,
        price,
        imageURL,
        material = undefined
    },
    creatorId
) {
    const furnitureData = {
        make,
        model,
        year,
        description,
        price,
        imageURL,
        material,
        createdBy: creatorId
    };

    return furnitureRepository.create(furnitureData);
}

export function update (
    furnitureId,
    userId,
    {
        make,
        model,
        year,
        description,
        price,
        imageURL,
        material = undefined
    }
) {
    const updatedFurnitureItem = furnitureRepository.update(
        furnitureId,
        userId,
        {
            make,
            model,
            year,
            description,
            price,
            imageURL,
            material
        }
    );

    return updatedFurnitureItem;
}