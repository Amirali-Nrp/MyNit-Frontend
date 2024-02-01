import { create } from "zustand";

interface MobileNaveOpenStore {
    open: boolean,
    setOpen: (status: boolean) => void,
    toggle: () => void
}

export const useMobileNavOpenStore = create<MobileNaveOpenStore>((set) => ({
    open: false,
    toggle: () => set((state) => ({open: !state.open})),
    setOpen: (status: boolean) => set(()=>({open: status}))
}))