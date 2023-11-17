import { createContext } from 'react';
import { DataSetType } from '../shared/dataset-consts';

export const DataSetTypeContext = createContext(DataSetType.Sections);