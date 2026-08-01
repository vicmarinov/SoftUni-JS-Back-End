import { furnitureRepository } from '../repositories';

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