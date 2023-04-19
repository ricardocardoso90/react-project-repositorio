import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';

import api from '../../services/axios';
import { Props } from '../../types';

export const Menu = () => {

  const [repository, setRepository] = useState('');
  const [repositoryStore, setRepositoryStore] = useState<Props[]>([]);
  const [loading, setLoading] = useState(false);

  //BUSCAR::
  useEffect(() => {
    const repositoryLocalStore = localStorage.getItem('repositorySave');
    if (repositoryLocalStore) {
      setRepositoryStore(JSON.parse(repositoryLocalStore));
    };
  }, []);

  //SALVAR ALTERAÇÕES:
  useEffect(() => {
    localStorage.setItem('repositorySave', JSON.stringify(repositoryStore));
  }, [repositoryStore]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (repository) {
      const response = await api.get(`repos/${repository}`);

      const errorRepository = repositoryStore.find((result) => {
        return String(result.name) === repository;
      });

      if (errorRepository) {
        console.log('Repositório já EXISTE!');
      };

      const data = {
        name: response.data.full_name
      };
      setRepositoryStore([...repositoryStore, data]);
    };
    setRepository('');
    setLoading(false);
  };

  // const [nome, sobrenome] = ['Ricardo', 'Cardoso'];
  // console.log(nome);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepository(e.target.value);
  };

  const handleDelete = (item: any) => {
    const delRepository = repositoryStore.filter((result) => {
      return result.name !== item;
    });
    setRepositoryStore(delRepository);
  };

  return (
    <div className='container'>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={repository}
          onChange={handleChange}
          placeholder='Adicionar Repositórios' />

        {loading
          ? <button
            type='submit'
            disabled
            style={{ opacity: 0.7 }}>
            <FaSpinner style={{ color: '#FFF' }} size={14} />
          </button>
          : <button
            type='submit'>
            <FaPlus style={{ color: '#FFF' }} size={14} />
          </button>
        }
      </form>

      <ul className='list-repository'>
        {repositoryStore.map((item, index) => {
          return (
            <li key={index}>
              <> <FaTrash onClick={() => handleDelete(item.name)} style={{ cursor: 'pointer' }} size={14} /> {item.name}</>
              <Link to={`/repositorio/${encodeURIComponent(String(item.name))}`}><FaBars size={20} /></Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
};