import React from 'react';
import { Button } from 'zarm'
import s from './style.module.less';


const Index = () => {
  return <div className={s.index}>
    <div>样式</div>
    <h1>Index Page</h1>
    <Button>按键</Button>
  </div>; 
};

export default Index;