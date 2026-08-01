import { prisma } from '../lib/prisma.js';

export async function getAll (creatorId = undefined) {
    try {
        const allFurnitureItems = await prisma.furniture.findMany({
            select: {
                id: true,
                description: true,
                price: true,
                imageURL: true
            },
            where: { createdBy: creatorId }
        });
    
        return allFurnitureItems;
    } catch (error) {
        throw new Error('Failed to retrieve furniture items.');
    }
}

export async function getById (furnitureId) {
    try {
        const furnitureItem = await prisma.furniture.findUnique({
            where: { id: furnitureId }
        });
    
        return furnitureItem;
    } catch (error) {
        throw new Error('Failed to retrieve furniture item.');
    }
}

export async function getCreator (furnitureId) {
    try {
        const furnitureCreator = (
            await prisma.furniture.findUnique({
                select: { creator: true },
                where: { id: furnitureId }
            })
        ).creator;

        return furnitureCreator;
    } catch (error) {
        throw new Error('Failed to retrieve furniture creator.');
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

export async function update (
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
    try {
        const updatedFurnitureItem = await prisma.furniture.update({
            data: {
                make,
                model,
                year,
                description,
                price,
                imageURL,
                material
            },
            where: {
                id: furnitureId,
                createdBy: userId
            }
        });

        return updatedFurnitureItem;
    } catch (error) {
        throw new Error('Failed to update furniture item.');
    }
}

export async function remove (furnitureId, userId) {
    try {
        await prisma.furniture.delete({
            where: {
                id: furnitureId,
                createdBy: userId
            }
        });
    } catch (error) {
        throw new Error('Failed to remove furniture item.');
    }
}