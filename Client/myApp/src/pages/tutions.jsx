import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tutions = () => {
    const [tutions, setTutions] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/PostTution');
                if (!isCancelled) {
                    // Assuming response.data is the array of tuitions
                    setTutions(response.data);
                    setLoading(false);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError('Failed to load tuitions.');
                    setLoading(false);
                    console.error('Tutions fetch error:', err);
                }
            }
        };

        fetchData();
        return () => { isCancelled = true; };
    }, []);

    if (loading) return <div className="text-center mt-10 text-indigo-600 font-bold">Loading available tuitions...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
                Available Tuition Opportunities
            </h1>
            
            {tutions.length === 0 ? (
                <p className="text-gray-500">No tuitions posted yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutions.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-indigo-600 truncate">{item.title}</h2>
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        {item.salary} PKR
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1 font-medium">{item.subject}</p>
                                <p className="text-gray-600 mt-4 line-clamp-3 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="mt-6 flex items-center text-gray-500 text-sm">
                                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {item.location}
                                </div>
                                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                    <span className="text-xs text-gray-400">Contact: {item.contact}</span>
                                    <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800">
                                        Apply Now →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tutions;