import React, { useState } from 'react'

const Services = () => {
    const [expandedSection, setExpandedSection] = useState('');

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? '' : section);
    };
    return (
        <div className="max-w-full mt-4">
            <div className="border rounded-md mb-6">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-lg font-medium">List all services</h2>
                    <button
                        onClick={() => toggleSection('listServices')}
                        className="focus:outline-none"
                    >
                        <svg
                            className={`w-6 h-6 transform transition-transform ${expandedSection === 'listServices' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                {expandedSection === 'listServices' && (
                    <div className="border-t p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-mono">GET</span>
                            <span className="font-mono text-gray-600">/services</span>
                        </div>

                        <div className="text-sm text-gray-700">List all Services</div>

                        <div className="mt-6">
                            <h3 className="text-base font-medium mb-4">Parameters</h3>
                            <div className="space-y-6">
                                {/* Size Parameter */}
                                <div>
                                    <div className="flex items-start mb-2">
                                        <div className="w-24 flex-shrink-0">
                                            <span className="font-mono text-sm">size</span>
                                            <div className="text-xs text-gray-500">integer</div>
                                            <div className="text-xs text-gray-500">(query)</div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm">Number of resources to be returned.</div>
                                            <div className="text-sm text-gray-500 italic">Default value: 100</div>
                                            <input
                                                type="text"
                                                defaultValue="100"
                                                className="mt-1 border rounded px-2 py-1 text-sm w-full max-w-[200px]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Offset Parameter */}
                                <div>
                                    <div className="flex items-start mb-2">
                                        <div className="w-24 flex-shrink-0">
                                            <span className="font-mono text-sm">offset</span>
                                            <div className="text-xs text-gray-500">string</div>
                                            <div className="text-xs text-gray-500">(query)</div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm">Offset from which to return the next set of resources. Use the value of the 'offset' field from the response of a list operation as input here to paginate through all the resources</div>
                                            <input
                                                type="text"
                                                placeholder="offset"
                                                className="mt-1 border rounded px-2 py-1 text-sm w-full max-w-[200px]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Tags Parameter */}
                                <div>
                                    <div className="flex items-start mb-2">
                                        <div className="w-24 flex-shrink-0">
                                            <span className="font-mono text-sm">tags</span>
                                            <div className="text-xs text-gray-500">string</div>
                                            <div className="text-xs text-gray-500">(query)</div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm">A list of tags to filter the list of resources on. Multiple tags can be concatenated using <code className="bg-gray-100 px-1">,</code> to mean AND or using <code className="bg-gray-100 px-1">/</code> to mean OR.</div>
                                            <div className="text-sm text-gray-500 italic">Example: tag1,tag2</div>
                                            <input
                                                type="text"
                                                placeholder="tag1,tag2"
                                                className="mt-1 border rounded px-2 py-1 text-sm w-full max-w-[200px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button className="px-4 py-2 text-white-100 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Try it out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Services
