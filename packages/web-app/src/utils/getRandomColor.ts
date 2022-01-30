import { Colors } from '../constants';

export const getRandomColor = () => Colors[Math.floor(Math.random() * Colors.length)];
