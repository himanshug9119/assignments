import { create } from 'zustand';
import { cars } from '../services/api';
import { Car } from '../types';

interface CarState {
  cars: Car[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchCars: () => Promise<void>;
  addCar: (car: Omit<Car, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCar: (id: string, car: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  searchCars: (query: string) => Promise<void>;
}

export const useCarStore = create<CarState>((set) => ({
  cars: [],
  searchTerm: "",

  setSearchTerm: (term) => set({ searchTerm: term }),

  fetchCars: async () => {
    try {
      const data = await cars.getAll();
      set({ cars: data });
      console.log("Cars fetched:", data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  },

  addCar: async (car) => {
    try {
      const newCar = await cars.create(car);
      
      set((state) => ({ cars: [...state.cars, newCar] }));
    } catch (error) {
      throw new Error("Failed to create car");
    }
  },

  updateCar: async (id, updatedCar) => {
    try {
      const updated = await cars.update(id, updatedCar);
      set((state) => ({
        cars: state.cars.map((car) => (car._id === id ? updated : car)),
      }));
    } catch (error) {
      throw new Error("Failed to update car");
    }
  },

  deleteCar: async (id) => {
    try {
      await cars.delete(id);
      set((state) => ({
        cars: state.cars.filter((car) => car._id !== id),
      }));
    } catch (error) {
      throw new Error("Failed to delete car");
    }
  },

  searchCars: async (query) => {
    try {
      const data = await cars.search(query);
      
      set({ cars: data });
    } catch (error) {
      console.error("Error searching cars:", error);
    }
  },
}));