const getPayments = async ()=>{

    const url = "http://localhost:5000/cswk-payment-platform-7d4a5/us-central1/transaction/get-payments"

    try {

        const access_token = localStorage.getItem("access_token")
        const current_user = JSON.parse(localStorage.getItem("current_user"))
        const _access_token = JSON.parse(access_token)?.value

        
        const res = await fetch(url, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': _access_token
            },
            method: "POST",
            body: JSON.stringify({
                account_number: current_user.account_number.toString()
            })
        })

        const _res = await (res.json())

        if(res.status !==200) throw new Error(_res.message)

        if(res.status === 200){
            return _res.data
        }

        
    } catch (error) {
        throw error
    }
    
}

const getRefunds = async ()=>{

    const url = "http://localhost:5000/cswk-payment-platform-7d4a5/us-central1/transaction/get-refunds"

    try {

        const access_token = localStorage.getItem("access_token")
        const current_user = JSON.parse(localStorage.getItem("current_user"))
        const _access_token = JSON.parse(access_token)?.value

        
        const res = await fetch(url, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': _access_token
            },
            method: "POST",
            body: JSON.stringify({
                account_number: current_user.account_number.toString()
            })
        })

        const _res = await (res.json())

        if(res.status !==200) throw new Error(_res.message)

        if(res.status === 200){
            return _res.data
        }

        
    } catch (error) {
        throw error
    }
    
}

const refundPayment = async (payload)=>{

    const url = "http://localhost:5000/cswk-payment-platform-7d4a5/us-central1/transaction/refund-payment"

    try {

        const access_token = localStorage.getItem("access_token")
        const _access_token = JSON.parse(access_token)?.value

        
        const res = await fetch(url, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': _access_token
            },
            method: "POST",
            body: JSON.stringify(payload)
        })

        const _res = await (res.json())

        if(res.status !==200) throw new Error(_res.message)

        if(res.status === 200){
            return _res.data
        }

        
    } catch (error) {
        throw error
    }
    
}



const transaction ={
    getPayments,
    getRefunds,
    refundPayment
}

export default transaction