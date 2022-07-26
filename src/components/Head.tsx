import React from "react"
import { Helmet } from 'react-helmet'
import PropTypes from "prop-types"

function Head({ title, description, author, lang, children }) {
    return (
        <Helmet htmlAttributes={{ lang }}>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:creator" content={author} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {children}
        </Helmet>
    )
}

Head.defaultProps = {
    description: ``,
    author: ``,
    children: ``,
    lang: `pt-br`,
}

Head.propTypes = {
    lang: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
}

export default Head