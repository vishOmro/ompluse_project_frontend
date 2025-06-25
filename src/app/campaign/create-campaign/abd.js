'use client';
import { useState } from 'react';

const Createcampaign = ({ entities = [], senders = [], templates = [] }) => {
    const [showForm, setShowForm] = useState(false);
    const [resource, setResource] = useState({
        campaign_name: '',
        entity_id: '',
        sender_id: '',
        template_id: '',
        desc: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your API logic here
        console.log('Submitted', resource);
        setSuccess('Campaign added successfully!');
        setError('');
    };

    return (

        <div className="bg-gradient-to-br from-indigo-200 to-indigo-400 min-h-screen flex items-center justify-center p-6 font-sans">
            <main className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl max-w-2xl w-full  md:p-6 relative overflow-visible">

                <button
                    onClick={() => setShowForm((prev) => !prev)}
                    className="mb-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                    {showForm ? 'Close Form' : 'Create Campaign'}
                </button>

                {showForm && (
                    <div className="w-full p-10 md:p-6">

                        <section className="flex flex-col flex-1 gap-4 p-6 max-w-3xl">
                            
                            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 select-none">Add Campaign {' '}
                                <span className="text-indigo-600">ID</span>
                            </h1>

                            {error && (
                                <p className="text-red-500 bg-red-100 px-4 py-2 rounded">{error}</p>
                            )}
                            {success && (
                                <p className="text-green-500 bg-green-100 px-4 py-2 rounded">{success}</p>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

                                <div className="flex gap-6 mb-6 flex-wrap">
                                    <div className="flex flex-col flex-1 min-w-[140px]">
                                        <label className="block text-gray-900 font-semibold mb-1 text-sm">
                                            Campaign Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full bg-white p-2 border rounded"
                                            placeholder="Enter Campaign Name"
                                            required
                                            value={resource.campaign_name}
                                            onChange={(e) =>
                                                setResource({ ...resource, campaign_name: e.target.value })
                                            }
                                        />
                                    </div>


                                    <div className="flex flex-col flex-1 min-w-[140px]">
                                        <label className="block text-gray-900 font-semibold mb-1 text-sm">
                                            Entity ID
                                        </label>
                                        <select
                                            className="w-full bg-white p-2 border rounded"
                                            required
                                            value={resource.entity_id}
                                            onChange={(e) =>
                                                setResource({ ...resource, entity_id: e.target.value })
                                            }
                                        >
                                            <option value="" disabled>Select Entity Id</option>
                                            {entities.map((entity) => (
                                                <option key={entity.id} value={entity.id}>
                                                    {entity.ueid} - {entity.entity_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-6 mb-6 flex-wrap">
                                    <div className="flex flex-col flex-1 min-w-[140px]">
                                        <label className="block text-gray-900 font-semibold mb-1 text-sm">
                                            Sender ID
                                        </label>
                                        <select
                                            className="w-full bg-white p-2 border rounded"
                                            required
                                            value={resource.sender_id}
                                            onChange={(e) =>
                                                setResource({ ...resource, sender_id: e.target.value })
                                            }
                                        >
                                            <option value="" disabled>Select Sender Id</option>
                                            {senders.map((sender) => (
                                                <option key={sender.id} value={sender.id}>
                                                    {sender.sender_id} - {sender.desc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col flex-1 min-w-[140px]">
                                        <label className="block text-gray-900 font-semibold mb-1 text-sm">
                                            Template ID
                                        </label>
                                        <select
                                            className="w-full bg-white p-2 border rounded"
                                            required
                                            value={resource.template_id}
                                            onChange={(e) =>
                                                setResource({ ...resource, template_id: e.target.value })
                                            }
                                        >
                                            <option value="" disabled>Select Template Id</option>
                                            {templates.map((template) => (
                                                <option key={template.id} value={template.id}>
                                                    {template.template_id} - {template.template_type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label className="block font-semibold mb-1">Description</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-white p-2 border rounded"
                                        placeholder="Enter Description"
                                        value={resource.desc}
                                        onChange={(e) =>
                                            setResource({ ...resource, desc: e.target.value })
                                        }
                                    ></textarea>
                                </div>

                                <div className="w-full">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-indigo-600 text-white p-3 rounded mt-2"
                                    >
                                        Submit Campaign
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                )}
            </main>
        </div>

    );
};

export default Createcampaign;
