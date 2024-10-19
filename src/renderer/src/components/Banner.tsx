import { GetStartedButton, ReadDocsButton } from '@/components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  banner: 'justify-center items-center',
  btnGroup: 'flex gap-x-8 justify-center items-center',
  bannerText:
    'w-fit mx-auto mt-48 mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-500'
};

const Banner = () => {
  const showToast = () => {
    toast.info('This feature is under development.');
  };

  return (
    <div className={styles.banner}>
      <div>
        <h3 className={styles.bannerText}>Local Custom Domains</h3>
      </div>
      <div className={styles.btnGroup}>

        <button onClick={showToast}>
          <GetStartedButton />
        </button>

        <button onClick={showToast}>
          <ReadDocsButton />
        </button>
        
        <ToastContainer position="bottom-right" />

      </div>
    </div>
  );
};

export default Banner;

