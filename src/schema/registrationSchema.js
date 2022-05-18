import * as Yup from 'yup'

const registrationSchema = Yup.object().shape({
    full_name: Yup.string().required().min(5).max(30),
    email: Yup.string().email().required(),
    phone: Yup.string().required().min(7).max(15),
    password: Yup.string().required().min(5).max(30)
})

export default registrationSchema