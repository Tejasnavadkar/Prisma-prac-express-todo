
type InputProps = {
    lable?:string
    placeholder?:string
    classname?:string
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}

function Input({lable,placeholder="",classname,onChange}:InputProps){

    return <>
    
    <div className="flex flex-col w-full  ">
        <div className="flex flex-col mx-3">
        <label  className="font-semibold text-lg" htmlFor="">{lable}</label>
        <input onChange={onChange} type="text" className={`py-2 rounded-md ${classname} `} placeholder={placeholder} />
        </div>
    </div>
    
    </>
}

export default Input