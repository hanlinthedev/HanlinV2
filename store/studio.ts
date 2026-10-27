'use client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { cleanStudio, DEFAULTS, type StudioSettings } from './studio-schema';
export const useStudio = create<StudioSettings>()(persist(()=>({...DEFAULTS}),{
 name:'han-lin-atlas-studio',version:1,storage:createJSONStorage(()=>localStorage),skipHydration:true,
 merge:(persisted,current)=>({...current,...cleanStudio(persisted)}),
}));
export function setStudio(patch:Partial<StudioSettings>) {useStudio.setState(cleanStudio({...useStudio.getState(),...patch}));}

export const useStudioDialog = create<{open:boolean}>(()=>({open:false}));
export function openStudio(){useStudioDialog.setState({open:true});}
