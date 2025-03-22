import {createSlice} from '@reduxjs/toolkit';
import {DUA_DATA} from '@src/shared/exporter';
import {UMRAH_CHECKLIST_DATA} from '@src/shared/utils/constant';

const appSlice = createSlice({
  name: 'auth',
  initialState: {
    duaData: DUA_DATA,
    isWalkthrough: false,
    pre_umrah: UMRAH_CHECKLIST_DATA,
    hajj_guide: UMRAH_CHECKLIST_DATA,
    safety_guide: UMRAH_CHECKLIST_DATA,
    umrah_checklist: UMRAH_CHECKLIST_DATA,
    selectedLanguage: {id: '1', name: 'English', code: 'en', selected: true},
  },
  reducers: {
    setIsWalkthrough: state => {
      state.isWalkthrough = true;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setDuaData: (state, action) => {
      state.duaData = action.payload;
    },
    setPreUmrah: (state, action) => {
      state.pre_umrah = action.payload;
    },
    setHajjGuide: (state, action) => {
      state.hajj_guide = action.payload;
    },
    setUmrahChecklist: (state, action) => {
      state.umrah_checklist = action.payload;
    },
    setSafetyGuide: (state, action) => {
      state.safety_guide = action.payload;
    },

    logOut: state => {
      state.isWalkthrough = false;
    },
  },
});

export const {
  logOut,
  setDuaData,
  setPreUmrah,
  setHajjGuide,
  setSafetyGuide,
  setIsWalkthrough,
  setUmrahChecklist,
  setSelectedLanguage,
} = appSlice.actions;

export default appSlice.reducer;
