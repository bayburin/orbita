import { createAction, props } from '@ngrx/store';

export const openSidebar = createAction('[Layout] Open Sidebar');

export const closeSidebar = createAction('[Layout] Close Sidebar');

export const loadTheme = createAction('[Layout] Load Theme');

export const setTheme = createAction('[Layout] Set Theme', props<{ theme: string }>());
