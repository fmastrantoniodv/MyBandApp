import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import googleIcon from '../img/googleIcon.svg'
import { FormButton, FormCard, Header } from '../components/Register/Form'
import LottieAnimation from '../components/Register/LoadingAnimation'
import Modal from "../components/Modals/Modal"
import { routes, inputsLogin } from '../const/constants'
import { useUser } from '../contexts/UserContext'
import { useModal } from "../hooks/useModal"
import { login } from '../services/usersServ'

const Login = () => {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [error, setError] = useState(false)

    const { setUser } = useUser()

    const navigate = useNavigate()

    const handleLoginSubmit = async (data) => {
        setError(false)
        openModal()
        try {
            const resp = await login(data)
            setUser(resp)
            closeModal()
            navigate(routes.home)
        } catch (error) {
            console.error('Error handleLoginSubmit: ', error)
            setError(true)
        }
    }

    return (
        <div className='register-container'>
            <Header textPrimaryButton={'Registrarse'} textSecondaryButton={'Volver a la página principal'} action1={() => navigate(routes.register)} action2={() => navigate(routes.home)}/>
            <div className={'container'}>
                <FormCard title={'Iniciar sesión'} inputs={inputsLogin} onSubmit={handleLoginSubmit}>
                    <button className='forgot-pass-btn' onClick={() => navigate(routes.register)} type='button'>
                        Olvidé mi contraseña
                    </button>
                    <div className='btns-container login'>
                        <FormButton text={'Ingresar'} type={'primary'} />
                        <FormButton text={'Registrarse'} type={'secondary'} action={() => navigate(routes.register)} />
                    </div>
                </FormCard>
                <Modal isOpen={isOpenModal} closeModal={closeModal}>
                    {error ? 
                        (<div className='modal-error'>
                            <b>No se pudo iniciar sesión</b>
                            Verifica tu correo electrónico y contraseña.
                            <FormButton text={'Volver'} type={'secondary'} action={() => closeModal()}/>
                        </div>) : 
                        (<div className='loading'>
                            <LottieAnimation width={200} height={200} />
                            Cargando...
                        </div>)
                    }
                </Modal>
            </div>
        </div>
    )
}

export default Login