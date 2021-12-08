import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Post from '@/components/Post/Post';

function index({ products }): ReactElement {
    return (
        <div className="row">
            {products.map((e: any) => (
                <div className="col-md-4" key={e.id}>
                    <Post
                        size="small"
                        title={e.title}
                        author={e.author}
                        //rate={e.rate}
                        price={e.price}
                        thumbnail={e.thumbnail}
                        buyers={e.buyers}
                        product={e}
                    />
                </div>
            ))}
        </div>
    )
}
index.propTypes = {
    products: PropTypes.array,
};
export default index
