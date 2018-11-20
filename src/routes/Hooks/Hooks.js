import React, { Component, useState } from 'react';
import {Card, Button } from 'antd';
function Hooks() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0)
    console.log(count);
    return (
          <div>
            <Card title="React Hooks"  bordered={false}>
              <div>
                <p>You clicked {count} times</p>
                <Button type="primary" onClick={() => setCount(count + 1)}>
                  Click me
                </Button>
              </div>
            </Card>
          </div>
    );
}
export default Hooks;

