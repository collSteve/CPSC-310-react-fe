import { createContext } from 'react';
import { DataSetType } from '../shared/dataset-consts';

export type DataSetContextType = {type: DataSetType; datasetPrefix: string};
export const DataSetContext = createContext({type: DataSetType.Sections, datasetPrefix: "sections"});

