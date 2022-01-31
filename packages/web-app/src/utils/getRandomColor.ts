import { colors } from '../constants';

export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
