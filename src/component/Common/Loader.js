import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import "./loader.css";

const Loader = () => (
    <div>
        <div className="text-center loader">
            <LoadingOutlined style={{ fontSize: 50 }} spin />
        </div>
    </div>
);

export default Loader;