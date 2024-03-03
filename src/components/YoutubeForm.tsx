import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;       
type FormValues = {
    username:string,
    email:string,
    channel:string
}


const YoutubeForm = () => {
    const form = useForm<FormValues>();
    const { register,control, handleSubmit } = form;
    renderCount++;

    const onSubmit = (data:FormValues) => {
        console.log('Form Submitted',data);
        
    }

    return ( 
        <div className="youtube_form">
            <h1>YouTube Form {renderCount/2 }</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username")}/>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email")} />

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" {...register("channel")} />

                <button>submit </button>

            </form>
            <DevTool control = {control}/>
        </div>
     );
}
 
export default YoutubeForm;