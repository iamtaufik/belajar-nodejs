import React, { useState } from 'react';
import axios from 'axios';
import Button from './utils/Button';
import { useNavigate } from 'react-router-dom';

const AddData = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState();
  const [nohp, setNohp] = useState('');
  const navigate = useNavigate();
  const handlerSubmit = () => {
    try {
      axios.post('http://localhost:3001', {
        nama,
        email,
        nohp,
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/');
    }
  };
  return (
    <div className="container flex justify-center items-center w-screen flex-col mt-10">
      <div className="container w-1/2">
        <Button url={'/'} customClass={'btn-sm btn-outline'} btnName={'Kembali'} />
        <h1 className="font-bold text-2xl my-2 text-center">Tambah Data</h1>
        <div className="flex justify-center flex-col items-center">
          <form className="form-control w-full max-w-xs" onSubmit={handlerSubmit}>
            <label className="label">
              <span className="label-text">Nama:</span>
            </label>
            <input type="text" placeholder="contoh: Muhammad Taufik" className="input input-bordered w-full max-w-xs" required onChange={(e) => setNama(e.target.value)} />
            <label className="label">
              <span className="label-text">Email: </span>
            </label>
            <input type="email" placeholder="contoh: email2gmail.com" className="input input-bordered w-full max-w-xs" required onChange={(e) => setEmail(e.target.value)} />
            <label className="label">
              <span className="label-text">No HP</span>
            </label>
            <input type="text" placeholder="contoh: 081234567890" className="input input-bordered w-full max-w-xs" required onChange={(e) => setNohp(e.target.value)} />
            <button className="btn my-10 btn-outline btn-success" type="submit">
              Tambah
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddData;
