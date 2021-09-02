import React from 'react'
// styles
import './index.scss'

const Specifications = ({ specs }) => <div className="specifications">
    <h3>Specifications</h3>
    <table>
        <tbody>
            {
                Object.keys(specs).map(attribute =>
                  specs[attribute] && <tr className="specifications__row">
                        <td className="specifications__label">
                            {attribute}
                        </td>
                        <td className="specifications__data">
                            {specs[attribute]}
                        </td>
                    </tr>
                )}
        </tbody></table>
</div>

export default Specifications
