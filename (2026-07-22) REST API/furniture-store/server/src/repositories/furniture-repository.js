import { prisma } from '../lib/prisma.js';

export async function create ({
    make,
    model,
    year,
    description,
    price,
    imageURL,
    material = undefined,
    createdBy
}) {
    try {
        const furnitureItem = await prisma.furniture.create({
            data: {
                make,
                model,
                year,
                description,
                price,
                imageURL,
                material,
                createdBy
            }
        });

        return furnitureItem;
    } catch (error) {
        throw new Error('Failed to create furniture item');
    }
}