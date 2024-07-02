// src/components/spinner/Spinner.jsx
import { TailSpin } from 'react-loader-spinner';
import "../spinner/spinner.css";

const Spinner = () => (
  <div className="spinner-container">
    <TailSpin color="#00BFFF" height={50} width={50} />
  </div>
);

export default Spinner;
