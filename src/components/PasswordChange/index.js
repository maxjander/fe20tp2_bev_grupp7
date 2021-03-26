import React, { useState } from 'react'

import { withFirebase } from '../Firebase'

const PasswordChangeForm = (props) => {
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')
    const [error, setError] = useState(null)

    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

    const onSubmit = (event) => {
        props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                setPasswordOne('')
                setPasswordTwo('')
                setError(null)
            })
            .catch((error) => {
                setError(error)
            })

        event.preventDefault()
    }
    const onChangeOne = (event) => {
        setPasswordOne(event.target.value)
    }

    const onChangeTwo = (event) => {
        setPasswordTwo(event.target.value)
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChangeOne}
                type="password"
                placeholder="New Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChangeTwo}
                type="password"
                placeholder="Confirm New Password"
            />
            <button disabled={isInvalid} type="submit">
                Reset My Password
            </button>

            {error && <p> {error.message}</p>}
        </form>
    )
}
export default withFirebase(PasswordChangeForm)
