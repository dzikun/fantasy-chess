import { createSelector } from 'reselect'

const getSelected = (state) => state.map.selected;

export const isSelected = (state, pieceId) => createSelector(getSelected, (item) => item.includes(pieceId));

const getAllPieces = (state) => state.map.pieces;

export const getFloatyPieces = createSelector(getAllPieces, 
    (p) => p.filter(v => v.floaty)
            .valueSeq().toArray());