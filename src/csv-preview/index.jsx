import './csv-preview.css';

export default function CsvPreview({ data }) {

    return <div className="csv-preview-container">
        <table>
            <tbody>
                <tr>
                    <th>Value</th>
                    <th>State Fips</th>
                    <th>County Fips</th>
                </tr>
                {data ?
                    data.map((d, i) => {
                        return <tr key={i}>
                            <td><span>{d.value}</span></td>
                            <td><span>{d.state_fips}</span></td>
                            <td><span>{d.county_fips}</span></td>
                        </tr>
                    })
                    :
                    <tr />
                }
            </tbody>
        </table>
    </div>
}