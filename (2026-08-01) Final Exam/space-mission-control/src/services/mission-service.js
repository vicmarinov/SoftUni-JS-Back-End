import { prisma } from '../lib/prisma.js';

function getAll () {
    const missions = prisma.mission.findMany({
        select: {
            id: true,
            name: true,
            type: true,
            destination: true,
            imageUrl: true,
            crew: true,
        }
    });
    return missions;
}

function getById (missionId) {
    const mission = prisma.mission.findUnique({
        where: { id: missionId },
        include: {
            owner: {
                select: { email: true }
            },
            supportList: {
                select: { id: true }
            }
        }
    });

    return mission;
}

async function getOwnerById (missionId) {
    const missionOwner = (
        await prisma.mission.findUnique({
            select: { owner: true },
            where: { id: missionId },
        })
    )?.owner;

    return missionOwner;
}

function getRecent () {
    const missions = prisma.mission.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
            id: true,
            name: true,
            destination: true,
            imageUrl: true,
            description: true,
        }
    });

    return missions;
}

async function getLatest () {
    const missions = await prisma.mission.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: { owner: true }
    });

    return missions.map(mission => ({
        name: mission.name,
        type: mission.type,
        destination: mission.destination,
        imageUrl: mission.imageUrl,
        crew: mission.crew,
        launchDate: mission.launchDate,
        duration: mission.duration,
        description: mission.description,
        ownerEmail: mission.owner.email,
        createdAt: mission.createdAt
    }));
}

function create (missionData, ownerId) {
    const mission = prisma.mission.create({ data: { ...missionData, ownerId, } });
    return mission;
}

function support (missionId, userId) {
    const mission = prisma.mission.update({
        data: {
            supportList: { connect: { id: userId } }
        },
        where: { id: missionId },
        include: { supportList: true }
    });

    return mission;
}

function edit (missionId, ownerId, missionData) {
    const mission = prisma.mission.update({
        data: missionData,
        where: { id: missionId, ownerId }
    });

    return mission;
}

function remove (missionId, ownerId) {
    const mission = prisma.mission.delete({
        where: { id: missionId, ownerId }
    });

    return mission;
}

export const missionService = {
    getAll,
    getById,
    getOwnerById,
    getRecent,
    getLatest,
    create,
    support,
    edit,
    remove
};