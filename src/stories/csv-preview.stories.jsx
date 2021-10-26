import CsvPreview from '../csv-preview';
import '../App.css';
import './stories.css';

export default {
    title: 'Csv Preview',
    component: CsvPreview
}

export const CsvPreviewEmpty = () => <CsvPreview />

const data = [
    {
        value: '2.5',
        percent: '2.4',
        state_fips: '05',
        county_fips: '056'
    },
    {
        value: '2.8',
        percent: '3.4',
        state_fips: '08',
        county_fips: '051'
    },
    {
        value: '2.1',
        percent: '4.4',
        state_fips: '08',
        county_fips: '124'
    }
];
export const CsvPreviewWithData = () => <CsvPreview data={data}/>