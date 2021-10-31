import GeoSelection from '../geo-selection';
import '../App.css';
import './stories.css';

export default {
    title: 'Geo',
    component: GeoSelection
}

export const GeoSelectionNormal = () => <GeoSelection onUpdate={selected => console.log(selected)}/>
