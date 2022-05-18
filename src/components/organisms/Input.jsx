
import {IoHappyOutline} from 'react-icons/io5'
import { useFormikContext } from 'formik'


export default function Input({Icon=<IoHappyOutline />, label, error=false, name, ...input_props}) {

    const {errors, values, touched, setFieldTouched, setFieldValue} = useFormikContext()

    const handleOnChange = ({target})=>{
        setFieldTouched(name)
        setFieldValue(name, target.value)
    }

    const handleOnBlur=()=>setFieldTouched(name)

    
  return (
    <div className='w-full h-full flex rounded border-x-2 border-x-yellow-400 border-y border-y-black/20 bg-black/5'>

        <div className="w-2/12 flex justify-center items-center border-r border-r-black/20">
            {Icon}
        </div>

        <div className="w-11/12 h-full flex flex-col">

            <div className='w-full h-1/2 border-b border-b-black/10 px-2 flex justify-between items-center'>
                {label}
                {
                    (errors[name] && touched[name]) && (
                        <div className="w-3 h-1 ml-2 content bg-red-400 rounded-full"></div>
                    )
                }
            </div>

            <input
                {...input_props}
                className="w-full h-full outline-none px-2 placeholder:text-gray-400" 
                value={values[name]}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                name={name}
                id={name}
            />

        </div>
        
    </div>
  )
}
