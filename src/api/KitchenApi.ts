import { IPlannerState } from '../utilities/Interfaces';
import { handleResponse } from './apiUtils';
const baseUrl = process.env.API_URL + '/';

// export async function getKitchens(): Promise<any> {
//     try {
//         const handleRes = await fetch(baseUrl);
//         return handleResponse(handleRes);
//     } catch (handleError) {
//         return handleError(handleError);
//     }
// }

export async function saveKitchen(kitchen: IPlannerState): Promise<any> {
    try {
        const handleRes = await fetch(baseUrl + (kitchen.Id || ''), {
            // method: kitchen.Id ? 'PUT' : 'POST',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(kitchen),
        });
        return handleResponse(handleRes);
    } catch (handleError) {
        return handleError(handleError);
    }
}

// export async function deleteCourse(courseId: string): Promise<any> {
//     try {
//         const handleRes = await fetch(baseUrl + courseId, { method: 'DELETE' });
//         return handleResponse(handleRes);
//     } catch (handleError) {
//         return handleError(handleError);
//     }
// }
