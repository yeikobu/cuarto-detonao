import { atom } from 'nanostores';

// Crear una nueva Nanostore para manejar los datos del formulario
export interface FormData {
    sender: {
        name: string;
        lastname: string;
        nickname?: string;
        course: string;
        anonymous: boolean;
    };
    recipient: {
        name: string;
        lastname: string;
        nickname?: string;
        course: string;
    };
}

const savedForm = localStorage.getItem('formData');

export const formData = atom<FormData>(savedForm ? JSON.parse(savedForm) : {
    sender: { name: '', lastname: '', course: '', anonymous: false },
    recipient: { name: '', lastname: '', course: '' }
});

export function updateFormData(newData: FormData) {
    formData.set(newData);
    localStorage.setItem('formData', JSON.stringify(newData));
}

export function clearFormData() {
    formData.set({
        sender: { name: '', lastname: '', course: '', anonymous: false },
        recipient: { name: '', lastname: '', course: '' }
    });
    localStorage.removeItem('formData');
}