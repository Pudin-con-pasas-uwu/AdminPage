import styles from '../../styles/butomSelectProducts.module.css';

const ButtomBak = () => {
    return (
         <div class="container">
            <div className='row'>
                <div className='col'>
                    <a class="btn btn-dark" id={styles.bottomSpace} tipe="button" href="javascript:history.back()">Go back</a>
                </div>
            </div>
        </div>    
    );
  }
  
  export default ButtomBak