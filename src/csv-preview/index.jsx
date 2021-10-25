import './csv-preview.css';

export default function CsvPreview({ data }) {
    return <div>
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
                            <td>{d.value}</td>
                            <td>{d.state_fips}</td>
                            <td>{d.county_fips}</td>
                        </tr>
                    })
                    :
                    <tr />
                }
            </tbody>
        </table>
    </div>
}