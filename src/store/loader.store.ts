import {create} from 'zustand'

interface LoaderStore{
    loading: boolean;
    setLoading: (state: boolean) => void;
}

const loaderStore = create<LoaderStore>()((set) => ({
    loading: false,
    setLoading: (state: boolean) => set({ loading: state }),
}));

export default loaderStore;