import React from 'react';
import useFetch from '../hooks/useFetch';
import Button from './utils/Button';

const Table = () => {
  const { data } = useFetch('http://localhost:3001');

  return (
    <div className="overflow-x-auto w-1/2">
      <Button url={'/add'} customClass={'btn-sm btn-success mb-4 btn-outline'} btnName={'Tambah Data'} />
      <div className="border">
        <table className="table table-zebra w-full  ">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Nama</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((res, i) => {
              i++;
              return (
                <tr key={res.id} className="text-center">
                  <th>{i}</th>
                  <td>{res.nama}</td>
                  <td>{res.email}</td>
                  <td>
                    <Button url={`/details/:${res._id}`} btnName={'Aksi'} customClass={'btn-sm btn-info btn-outline'} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
