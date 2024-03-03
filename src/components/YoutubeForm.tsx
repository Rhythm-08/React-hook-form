import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
type FormValues = {
    username: string,
    email: string,
    channel: string,
    socials : {
        twitter: string,
        facebook : string
    };
    phoneNumbers : string[]
};



const YoutubeForm = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            username: '',
            email: '',
            channel: '',
            socials: { // nested Objects 
                twitter:'',
                facebook:''
            },
            phoneNumbers : ["",""] // Arrays in Forms
        },

    });
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    renderCount++;

    const onSubmit = (data: FormValues) => {
        console.log('Form Submitted', data);

    }

    return (
        <div className="youtube_form">
            <h1>YouTube Form {renderCount / 2}</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate >
                <div className="formControl">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register("username", {
                        required: {
                            value: true,
                            message: "UserName is Required"
                        }
                    })} />
                    <p className="error">{errors?.username?.message}</p>
                </div>

                <div className="formControl">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email", {
                        pattern: {
                            value: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
                            message: "Invalid Email Format"
                        },
                        required: {
                            value: true,
                            message: 'Email is Required'
                        },
                        validate: {
                            notAdmin :(fieldValue) => {
                                return fieldValue !== 'admin@example.com' || 'Enter a different email address';
                            },
                            notBlackListed : (fieldValue) => {
                                return !fieldValue.endsWith('badDomain.com') || 'This domain is not supported';
                            }
                        }
                    })} />
                    <p className="error">{errors?.email?.message}</p>
                </div>

                <div className="formControl">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" {...register("channel", {
                        required: { value: true, message: "Channel is Required" }
                    })} />
                    <p className="error">{errors?.channel?.message}</p>
                </div>

                <div className="formControl">
                    <label htmlFor="twitter">Twitter</label>
                    <input type="text" id="twitter" {...register("socials.twitter",{
                        required: {
                            value:true,
                            message:'Enter the Twitter Handle'
                        }
                    })} />
                       <p className="error">{errors?.socials?.twitter?.message}</p>
                </div>

                <div className="formControl">
                    <label htmlFor="facebook">FaceBook</label>
                    <input type="text" id="facebook" {...register("socials.facebook",{
                        required: {
                            value: true,
                            message : 'Enter the Facebook handle'
                        }
                    })} />
                       <p className="error">{errors?.socials?.facebook?.message}</p>
                </div>

                <div className="formControl">
                    <label htmlFor="primary-phone">Primary PhoneNumber</label>
                    <input type="text" id="primary-phone" {...register("phoneNumbers.0", {
                        required : {
                            value: true,
                            message: "Primary Phone Number is required"
                        }
                    })} />
                       <p className="error">{errors?.phoneNumbers?.[0]?.message}</p>
                </div>

                <div className="formControl">
                    <label htmlFor="secondary-phone">Secondary PhoneNumber</label>
                    <input type="text" id="secondary-phones" {...register("phoneNumbers.1", {
                        required : {
                            value : true,
                            message: "Secondary Phone Number is Required"
                        }
                    })} />
                       <p className="error">{errors?.phoneNumbers?.[1]?.message}</p>
                </div>

                <button>submit </button>

            </form>
            <DevTool control={control} />
        </div>
    );
}

export default YoutubeForm;