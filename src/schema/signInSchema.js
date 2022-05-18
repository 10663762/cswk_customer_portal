import * as Yup from 'yup'

const registrationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(5).max(30)
})

export default registrationSchema