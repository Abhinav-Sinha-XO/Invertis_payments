export function InputBox({label,placeholder,onChange}){
  return <div >
    <div className="flex pr-5 font-semibold text-lg  py-2  ">{label}</div>
    <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded-md border-slate-200 pb-4 pt-4  "></input>
  </div>
}