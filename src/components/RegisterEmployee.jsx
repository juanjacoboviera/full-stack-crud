import React from 'react'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
        

const RegisterEmployee = () => {
  return (
    <div className='layout flex justify-center'>
        <div className="container w-1/2">
            <form className='flex flex-row gap-5 flex-wrap justify-center mt-10' action="">
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstName">First name</label>
                    <InputText className='border-solid border-black border rounded' id="firstName" aria-describedby="username-help" />
                    <small id="username-help">
                        Enter your username to reset your password.
                    </small>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">Last Name</label>
                    <InputText className='border-solid border-black border rounded' id="lastName" aria-describedby="username-help" />
                    <small id="username-help">
                        Enter your username to reset your password.
                    </small>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">E-mail</label>
                    <InputText className='border-solid border-black border rounded' id="lastName" aria-describedby="username-help" />
                    <small id="username-help">
                        Enter your username to reset your password.
                    </small>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">Job title</label>
                    <InputText className='border-solid border-black border rounded' id="lastName" aria-describedby="username-help" />
                    <small id="username-help">
                        Enter your username to reset your password.
                    </small>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterEmployee