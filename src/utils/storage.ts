import { Model3D } from '../types/model';

const STORAGE_KEY = 'models';

const initializeStorage = (): void => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};

export const saveModel = (model: Model3D): void => {
  initializeStorage();
  const models = getModels();
  models.push(model);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
};

export const getModels = (): Model3D[] => {
  initializeStorage();
  try {
    const models = localStorage.getItem(STORAGE_KEY);
    return models ? JSON.parse(models) : [];
  } catch (error) {
    console.error('Error reading models from storage:', error);
    return [];
  }
};

export const searchModels = (query: string): Model3D[] => {
  const models = getModels();
  if (!models || !Array.isArray(models)) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return models.filter(model => 
    model.title.toLowerCase().includes(lowercaseQuery) ||
    model.description.toLowerCase().includes(lowercaseQuery) ||
    model.author.toLowerCase().includes(lowercaseQuery)
  );
};