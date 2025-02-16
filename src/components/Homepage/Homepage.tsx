import React, { useState } from 'react'
import Services from './Services';

const KongAdminHomepage = () => {
    const [protocol, setProtocol] = useState('http');
    const [hostname, setHostname] = useState('localhost');
    const [port, setPort] = useState('8001');
    const [path, setPath] = useState('/');

    return (
        <div className="p-6 w-full">
            {/* Servers Section */}
            <div className="mb-8">
                <h2 className="text-lg font-medium mb-4">Servers</h2>
                <div className="mb-4">
                    <div className="relative inline-block w-full max-w-xl">
                        <div className="flex items-center border rounded-md p-2 bg-white">
                            <span className="text-gray-600">{`{${protocol}}://{${hostname}}:{${port}}{${path}}`}</span>
                            <span className="ml-2 text-gray-500">- Default Admin API URL</span>
                            <button className="ml-auto">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                    <span>Computed URL: </span>
                    <span className="font-mono">{`${protocol}://${hostname}:${port}${path}`}</span>
                </div>
            </div>

            <div className="flex justify-between items-start">
                {/* Server Variables Section */}
                <div className="w-80">
                    <h2 className="text-lg font-medium mb-4">Server variables</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-[100px,1fr] items-center">
                            <label className="text-gray-700">hostname</label>
                            <input
                                type="text"
                                value={hostname}
                                onChange={(e) => setHostname(e.target.value)}
                                className="border rounded-md px-3 py-1.5 w-full"
                            />
                        </div>
                        <div className="grid grid-cols-[100px,1fr] items-center">
                            <label className="text-gray-700">path</label>
                            <input
                                type="text"
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                                className="border rounded-md px-3 py-1.5 w-full"
                            />
                        </div>
                        <div className="grid grid-cols-[100px,1fr] items-center">
                            <label className="text-gray-700">port</label>
                            <input
                                type="text"
                                value={port}
                                onChange={(e) => setPort(e.target.value)}
                                className="border rounded-md px-3 py-1.5 w-full"
                            />
                        </div>
                        <div className="grid grid-cols-[100px,1fr] items-center">
                            <label className="text-gray-700">protocol</label>
                            <select
                                value={protocol}
                                onChange={(e) => setProtocol(e.target.value)}
                                className="border rounded-md px-3 py-1.5 w-full bg-white"
                            >
                                <option value="http">http</option>
                                <option value="https">https</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute right-6 flex gap-2">
                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-3xl hover:bg-blue-50">
                        View Raw
                    </button>
                    <button className="px-4 py-2 text-white-100 bg-blue-600 text-white rounded-3xl hover:bg-blue-700">
                        Authorize
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                    <h1 className="text-xl font-medium">Enterprise Kong Admin API</h1>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">3.9.0</span>
                </div>
                <p className="text-gray-600 mb-2">OpenAPI 3.0 spec for Kong Gateway's Enterprise Admin API.</p>
                <p className="text-gray-600 mb-4">
                    You can learn more about Kong Gateway at{' '}
                    <a href="https://docs.konghq.com" className="text-green-600 hover:underline">
                        docs.konghq.com
                    </a>
                    . Give Kong a star at{' '}
                    <a href="https://Kong/kong" className="text-green-600 hover:underline">
                        Kong/kong
                    </a>{' '}
                    repository.
                </p>
                <div className="space-y-1">
                    <a href="#" className="block text-green-600 hover:underline">Kong Inc - Website</a>
                    <a href="#" className="block text-green-600 hover:underline">Send email to Kong Inc</a>
                    <a href="#" className="block text-green-600 hover:underline">Apache 2.0</a>
                    <a href="#" className="block text-green-600 hover:underline">Kong Gateway Enterprise Admin API</a>
                </div>
            </div>

            <Services/>
            <Services/>
            <Services/>
            <Services/>
            <Services/>
        </div>
    );
};

export default KongAdminHomepage;