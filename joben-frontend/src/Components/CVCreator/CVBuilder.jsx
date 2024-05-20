import React from 'react';
import Group31 from "../../Assets/Group31.svg";
import styles from './CVBuilder.module.css'; 
import '../Common/style.css';

const CVBuilder = () => {
    return (
        <div className={styles.CVBuilder}> 
            <div className={styles.Builder}> 
                <h2 className={styles.CVH2}>Create Your CV</h2>
                <div className={styles.wrapper}> 
                    <img src={Group31} alt='Group31' className={styles.CVImg} />
                    <div className={styles.textbox}> 
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, dignissimos animi. Sequi aliquam voluptatibus, excepturi repudiandae ducimus eum aspernatur? Quod cumque qui voluptates excepturi laborum ex, adipisci corrupti repudiandae distinctio?</p>
                        <button className={styles['btn-primary']}>Try Free</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CVBuilder;