import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'auth',
  initialState: {
    duaData: [],
    isWalkthrough: false,
    translationLoading: false,
    pre_umrah: [],
    hajj_guide: [],
    safety_guide: [],
    umrah_checklist: [],
    selectedLanguage: {id: '1', name: 'English', code: 'en', selected: true},
    isRTL: false,
    isFirstTime: true,
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
    clearDuaData: state => {
      state.duaData = [];
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
    setTranslationLoading: (state, action) => {
      state.translationLoading = action.payload;
    },
    setFirstTime: (state, action) => {
      state.isFirstTime = action.payload;
    },
    setIsRTL: (state, action) => {
      state.isRTL = action.payload;
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
  setTranslationLoading,
  setIsRTL,
  setFirstTime,
  clearDuaData,
} = appSlice.actions;

export default appSlice.reducer;
