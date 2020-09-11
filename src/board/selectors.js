import { createSelector } from 'reselect'

const getSelected = (state) => state.map.selected;

export const isSelected = (state, pieceId) => createSelector(getSelected, (item) => item.includes(pieceId))