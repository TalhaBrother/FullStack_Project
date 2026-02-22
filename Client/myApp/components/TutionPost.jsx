import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
const TutionPost = () => {
    const tutionPostSchema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        subject: yup.string().required(),
        location: yup.string().required(),
        salary: yup.number().positive().required(),
        contact: yup.string().matches(/^[0-9]{10}$/).required(),
    });
    const{register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(tutionPostSchema),
        mode:"onChange"
    })
    const onSubmit = async (data) => {
        try {
            const tutionPostResponse = await axios.post("http://localhost:3000/user/PostTution", data);
            console.log("Tution Post Response:", tutionPostResponse.data);
        } catch (error) {
            console.error("Error posting tution:", error);
        }
    }
    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10 lg:p-12 mx-auto my-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2 text-center">
                Post a Tution   
            </h1>
            <form className="space-y-6 sm:space-y-7" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">  Title</label>
                    <input
                        type="text" 
                        {...register("title")}
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description</label>
                    <textarea
                        {...register("description")}
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="subject">Subject</label>
                    <input
                        type="text" 
                        {...register("subject")}
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="location">Location</label>
                    <input
                        type="text" 
                        {...register("location")}
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="salary">Salary (PKR)</label>
                    <input
                        type="text" 
                        {...register("salary")}
                        className="w-full text-black px-4  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="contact">Contact Number</label>
                    <input
                        type="tel" 
                        {...register("contact")}
                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                  Post Tution
                </button>                
            </form>            
        </div>        
    )
}

export default TutionPost