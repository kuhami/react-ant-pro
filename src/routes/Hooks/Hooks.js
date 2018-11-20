import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Divider, Tag, Card, Button, Popconfirm, Input } from 'antd';
import ImageWrapper from 'components/ImageWrapper'; // aware of the relative path
//import TableForm from './TableForm';
function Hooks() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0)
    console.log(count);
    return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
    );
}
export default Hooks;

