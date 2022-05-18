const register = async (userPayload)=>{

    const url = "http://localhost:5000/cswk-payment-platform-7d4a5/us-central1/customer_auth/register"

    try {

        const res = await fetch(url,{
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify(userPayload),
            method: "POST"
        })

        const _res = await (res.json())

        if(res.status === 200) {

            const current_user = _res?.user
            delete current_user.password

            localStorage.setItem("access_token", JSON.stringify(_res.token))
            localStorage.setItem("current_user", JSON.stringify(current_user))
            
            return{
                token: _res?.token,
                user: _res?.user
            }
        }

        throw new Error(_res.message)
        
    } catch (error) {
        throw error
    }
    
}


const signIn = async (userPayload)=>{

    const url = "http://localhost:5000/cswk-payment-platform-7d4a5/us-central1/customer_auth/signin"

    try {

        const res = await fetch(url,{
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify(userPayload),
            method: "POST"
        })

        const _res = await (res.json())

        if(res.status === 200) {

            const current_user = _res?.user
            delete current_user.password

            localStorage.setItem("access_token", JSON.stringify(_res.token))
            localStorage.setItem("current_user", JSON.stringify(current_user))
            
            return{
                token: _res?.token,
                user: _res?.user,
                message: _res?.message
            }
        }

        throw new Error(_res.message)
        
    } catch (error) {
        throw error
    }
    
}

const signOut = async ()=>{

    const url = "http://localhost:5000/cswk-payment-platform-7d4a5/us-central1/customer_auth/signout"

    try {

        const access_token = localStorage.getItem("access_token")
        const current_user = localStorage.getItem("current_user")

        const _access_token = JSON.parse(access_token)?.value

        const current_user_email = JSON.parse(current_user)?.email

        console.log(current_user_email)

        const res = await fetch(url,{
            headers:{
                'Content-Type': "application/json",
                'x-access-token': _access_token
            },
            method: "POST",
            body: JSON.stringify({
                email: current_user_email
            })
        })

        const _res = await (res.json())

        if(res.status === 200) {
            localStorage.setItem("access_token", JSON.stringify({}))
            localStorage.setItem("current_user", JSON.stringify({}))
            return
        }

        throw new Error(_res.message)
        
    } catch (error) {
        throw error
    }
    
}

const auth  ={
    register,
    signIn,
    signOut
}

export default auth