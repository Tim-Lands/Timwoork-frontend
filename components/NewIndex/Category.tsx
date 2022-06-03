import React, { ReactElement } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

function Category({ thumbnail, name, slug }): ReactElement {
    const thumbnailUrl = `url(${thumbnail})`;
  return (
    <Link href={`/`}>
      <a className='category-items'>
          <div className="category-item-image" style={{ backgroundImage: thumbnailUrl }}/>
          <div className="category-item-content">
              <p className="meta">{slug}</p>
              <h3 className="cat-name">{name}</h3>
          </div>
      </a>
    </Link>
  )
}

Category.propTypes = {
    thumbnail: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
}

export default Category
