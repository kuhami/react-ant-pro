// index.js
import React from 'react';
import styles from './index.less'; // import style in css modules way

export default ({ src, desc, style }) => (
  <div style={style} className={styles.imageWrapper}>
    <img className={styles.img} src={src} alt={desc} />
    {desc && <div className={styles.desc}>{desc}</div>}
  </div>
);
