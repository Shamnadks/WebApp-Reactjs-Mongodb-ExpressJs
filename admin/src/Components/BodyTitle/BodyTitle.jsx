import React from 'react'
import './BodyTitle.css'

function BodyTitle(props) {
    return (
        <div>
            <div className="pagetitle">
                <h1>{props.data}</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">{}</a>
                        </li>
                        <li className="breadcrumb-item active">{}</li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}

export default BodyTitle