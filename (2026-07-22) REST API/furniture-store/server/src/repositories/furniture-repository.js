import { prisma } from '../lib/prisma.js';

export function getAll () {
    try {
        const allFurnitureItems = prisma.furniture.findMany({
            select: {
                id: true,
                description: true,
                price: true,
                imageURL: true
            }
        });
    
        return allFurnitureItems;
    } catch (error) {
        throw new Error('Failed to retrieve furniture items.');
    }
}

export function getById (furnitureId) {
    try {
        const furnitureItem = prisma.furniture.findUnique({
            where: { id: furnitureId }
        });
    
        return furnitureItem;
    } catch (error) {
        throw new Error('Failed to retrieve furniture item.');
    }
}

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
        throw new Error('Failed to create furniture item.');
    }
}