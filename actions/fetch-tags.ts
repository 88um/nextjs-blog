'use server'

import prisma from "@/lib/db";
export async function fetchAllTags(amount?: number) {
    ['c++',
    'python',
    'java',
    'javascript',
    'html',
    'css',
    'php',
    'ruby',
    'cplusplus',
    'golang',
    'swift',
    'rustlang',
    'typescript']
    const defaultAmount = 10; 
    const cur_tags = await prisma.tag.findMany({
        take: amount || defaultAmount, 
    });

    const tagNames = cur_tags.map(tag => tag.name);

    return tagNames;
}