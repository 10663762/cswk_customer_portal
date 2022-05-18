import * as Yup from 'yup'

const payClientSchema = Yup.object().shape({
    payee_name: Yup.string().min(5).max(30).required(),
    payee_account_number: Yup.string().min(8).max(17).required(),
    amount: Yup.number().lessThan(20000).required().label("Amount exceeds maximum transaction threshold"),
    payee_phone: Yup.string().min(8).max(20).required(),
    payee_email: Yup.string().email().required()
    // password: Yup.string().required().min(5).max(30)
})

export default payClientSchema