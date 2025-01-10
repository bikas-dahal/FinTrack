import { create } from 'zustand';


type NewPortfolioState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewPortfolio = create<NewPortfolioState>()((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

