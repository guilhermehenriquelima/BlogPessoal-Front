import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import User from '../../models/User';
import { buscaId } from '../../services/Service';
import { addToken } from '../../store/token/Actions';
import { UserState } from '../../store/token/Reducer';
import './Perfil.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Perfil() {

    let history = useNavigate()

    const dispatch = useDispatch()

    // Pega o ID guardado no Store
    const id = useSelector<UserState, UserState["id"]>(
        (state) => state.id
    );

    // Pega o Token guardado no Store
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    )

    const [user, setUser] = useState<User>({
        id: +id,    // Faz uma conversão de String para Number
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (token === "") {
            toast.error('Usuário não autenticado!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            history("/login")
        }
    }, [token])

    // Método para pegar os dados de um Usuário especifico pelo ID
    async function findById(id: string) {
        try {
            await buscaId(`/usuarios/${id}`, setUser, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.response?.status === 403) {
                dispatch(addToken(''))
            }
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    return (
        <Box className='card-principal'>
            <Box className='card-container-imagem'>
                <img className='card-imagem'
                    src={user.foto}
                    alt={user.nome} />
                <Link to="/atualizarusuario" className="text-decorator-none">
                    <Button variant="contained" color="info" >
                        Editar Perfil
                    </Button>
                </Link>
            </Box>


            <Box className='card-container-info'>
                <Box>
                    <h1>{user.nome}</h1>
                    <h3>{user.usuario}</h3>
                    <hr />
                </Box>

                <p className='card-container-texto'>
                    Desde que me interessei na área da programação, estudo diariamente para conseguir a minha primeira oportunidade como Desenvolvedor. Há 4 meses venho desenvolvendo projetos para colocar em prática todo o meu conhecimento. Participei de um bootcamp de 3 meses pela Generation Brasil, onde adquirir experiência nas linguagens Java e JavaScript, atuando tanto no Front-End, implementando React e TypeScript quanto no Back-End de projetos utilizando o Spring.
                </p>

            </Box>
        </Box>
    )
}

export default Perfil

