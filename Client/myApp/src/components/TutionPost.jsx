import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Swal from 'sweetalert2';
const TutionPost = () => {
    const tutionPostSchema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        subject: yup.string().required(),
        location: yup.string().required(),
        salary: yup.number().positive().required(),
        contact: yup.string().matches(/^[0-9]{10}$/).required(),
    });
    const{register,handleSubmit,reset,formState:{errors}}=useForm({
        resolver:yupResolver(tutionPostSchema),
        mode:"onChange"
    })
    const onSubmit = async (data) => {
        try {
            const tutionPostResponse = await axios.post("http://localhost:3000/user/PostTution", data);
            console.log("Tution Post Response:", tutionPostResponse.data);
            reset();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Tution posted successfully.',
                confirmButtonColor: '#4f46e5',
            });
        } catch (error) {
            console.error("Error posting tution:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to post tution. Please try again.',
                confirmButtonColor: '#4f46e5',
            });
        }
    }
    return (
        <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-slate-100 mx-auto my-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white px-8 py-10 md:p-14 text-center relative border-b border-slate-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] opacity-40 -mr-32 -mt-32"></div>
            <div className="relative">
                <header className="space-y-3">
                    <p className="text-indigo-600 font-black tracking-[0.3em] uppercase text-[10px]">Tution Marketplace</p>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                        Post a <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Requirement</span>   
                    </h1>
                    <p className="text-slate-400 font-bold text-sm max-w-sm mx-auto leading-relaxed">Fill in the details below to connect with verified expert tutors.</p>
                </header>
            </div>
        </div>

            <form className="p-8 md:p-12 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-slate-900 font-black text-xs uppercase tracking-widest pl-1" htmlFor="title">Job Title</label>
                        <input
                            type="text" 
                            placeholder="e.g. O-Levels Math Tutor"
                            {...register("title")}
                            className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold placeholder:text-slate-300 shadow-sm"
                        />
                        {errors.title && <p className="text-red-500 text-xs font-bold mt-1 pl-1">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-slate-900 font-black text-xs uppercase tracking-widest pl-1" htmlFor="subject">Subject</label>
                        <input
                            type="text" 
                            placeholder="e.g. Mathematics"
                            {...register("subject")}
                            className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold placeholder:text-slate-300 shadow-sm"
                        />
                        {errors.subject && <p className="text-red-500 text-xs font-bold mt-1 pl-1">{errors.subject.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-slate-900 font-black text-xs uppercase tracking-widest pl-1" htmlFor="description">Detailed Requirements</label>
                    <textarea
                        rows="4"
                        placeholder="Describe the student's level, timing requirements, and teaching style preferred..."
                        {...register("description")}
                        className="w-full text-slate-800 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold placeholder:text-slate-300 shadow-sm resize-none"
                    />
                    {errors.description && <p className="text-red-500 text-xs font-bold mt-1 pl-1">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-slate-900 font-black text-xs uppercase tracking-widest pl-1" htmlFor="location">Location</label>
                        <input
                            type="text" 
                            placeholder="City/Area"
                            {...register("location")}
                            className="w-full text-slate-800 px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold placeholder:text-slate-300 shadow-sm"
                        />
                        {errors.location && <p className="text-red-500 text-xs font-bold mt-1 pl-1">{errors.location.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-slate-900 font-black text-xs uppercase tracking-widest pl-1" htmlFor="salary">Budget (PKR)</label>
                        <input
                            type="text" 
                            placeholder="Salary"
                            {...register("salary")}
                            className="w-full text-slate-800 px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold placeholder:text-slate-300 shadow-sm"
                        />
                        {errors.salary && <p className="text-red-500 text-xs font-bold mt-1 pl-1">{errors.salary.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-slate-900 font-black text-xs uppercase tracking-widest pl-1" htmlFor="contact">Contact Number</label>
                        <input
                            type="tel" 
                            placeholder="03XXXXXXXXX"
                            {...register("contact")}
                            className="w-full text-slate-800 px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold placeholder:text-slate-300 shadow-sm"
                        />
                        {errors.contact && <p className="text-red-500 text-xs font-bold mt-1 pl-1">{errors.contact.message}</p>}
                    </div>
                </div>

                <button type="submit" className="group w-full bg-indigo-600 hover:bg-slate-900 text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 text-lg mt-4">
                  Confirm & Post Job
                  <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>                
            </form>            
        </div>        
    )
}

export default TutionPost