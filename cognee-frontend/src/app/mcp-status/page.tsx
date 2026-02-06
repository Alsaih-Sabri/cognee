"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetch } from "@/utils";
import { StatusDot } from "@/ui/elements";

interface MCPStatus {
    isConnected: boolean;
    lastChecked: Date | null;
    error: string | null;
    responseTime: number | null;
}

type TabType = "status" | "api-docs";

export default function MCPStatusPage() {
    const [status, setStatus] = useState<MCPStatus>({
        isConnected: false,
        lastChecked: null,
        error: null,
        responseTime: null,
    });
    const [isChecking, setIsChecking] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>("status");

    const checkMCPStatus = async () => {
        setIsChecking(true);
        const startTime = Date.now();

        try {
            await fetch.checkMCPHealth();
            const responseTime = Date.now() - startTime;
            setStatus({
                isConnected: true,
                lastChecked: new Date(),
                error: null,
                responseTime,
            });
        } catch (error: any) {
            setStatus({
                isConnected: false,
                lastChecked: new Date(),
                error: error?.message || "Failed to connect to MCP server",
                responseTime: null,
            });
        } finally {
            setIsChecking(false);
        }
    };

    useEffect(() => {
        checkMCPStatus();
        const interval = setInterval(checkMCPStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    const mcpApiUrl = process.env.NEXT_PUBLIC_MCP_API_URL || "http://localhost:8001";
    const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-indigo-600 dark:bg-indigo-700 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">MCP Server Status</h1>
                        <p className="text-indigo-100 dark:text-indigo-200 mt-1">Model Context Protocol Connection Monitor</p>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab("status")}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "status"
                                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                                    }`}
                            >
                                Status
                            </button>
                            <button
                                onClick={() => setActiveTab("api-docs")}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "api-docs"
                                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                                    }`}
                            >
                                API Documentation
                            </button>
                        </nav>
                    </div>

                    {/* Status Tab */}
                    {activeTab === "status" && (
                        <>
                            {/* Status Overview */}
                            <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <StatusDot isActive={status.isConnected} className="w-4 h-4" />
                                        <span className="text-2xl font-semibold">
                                            {status.isConnected ? (
                                                <span className="text-green-600 dark:text-green-400">Connected</span>
                                            ) : (
                                                <span className="text-red-600 dark:text-red-400">Disconnected</span>
                                            )}
                                        </span>
                                    </div>
                                    <button
                                        onClick={checkMCPStatus}
                                        disabled={isChecking}
                                        className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isChecking ? "Checking..." : "Refresh Status"}
                                    </button>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* MCP Server Info */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">MCP Server</h2>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Endpoint:</span>
                                            <span className="font-mono text-sm text-gray-900 dark:text-gray-100">{mcpApiUrl}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Transport:</span>
                                            <span className="font-mono text-sm text-gray-900 dark:text-gray-100">SSE</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Mode:</span>
                                            <span className="font-mono text-sm text-gray-900 dark:text-gray-100">API Mode</span>
                                        </div>
                                        {status.responseTime !== null && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Response Time:</span>
                                                <span className="font-mono text-sm text-gray-900 dark:text-gray-100">{status.responseTime}ms</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Backend Info */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Backend API</h2>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Endpoint:</span>
                                            <span className="font-mono text-sm text-gray-900 dark:text-gray-100">{backendApiUrl}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Connection:</span>
                                            <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                                                MCP → Backend (Internal)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Last Checked */}
                            {status.lastChecked && (
                                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Last checked:</span>
                                        <span className="text-gray-900 dark:text-gray-100">{status.lastChecked.toLocaleString()}</span>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {status.error && (
                                <div className="px-6 py-4 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800">
                                    <div className="flex items-start space-x-3">
                                        <svg className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Connection Error</h3>
                                            <p className="mt-1 text-sm text-red-700 dark:text-red-400">{status.error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Help Section */}
                            <div className="px-6 py-6 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800">
                                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Troubleshooting</h3>
                                <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
                                    <li>Ensure the MCP server is running: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">docker compose --profile mcp ps</code></li>
                                    <li>Check MCP logs: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">docker logs cognee-mcp</code></li>
                                    <li>Verify the backend is running: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">docker compose ps cognee</code></li>
                                    <li>MCP server should be accessible at: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">{mcpApiUrl}/health</code></li>
                                </ul>
                            </div>
                        </>
                    )}

                    {/* API Documentation Tab */}
                    {activeTab === "api-docs" && (
                        <div className="px-6 py-6 space-y-6">
                            {/* Cognee API Documentation Link */}
                            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">🚀 Cognee API Documentation</h2>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Interactive API documentation with all available endpoints, request/response schemas, and try-it-out functionality.
                                        </p>
                                        <a
                                            href="http://localhost:8000/docs"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-md"
                                        >
                                            Open API Docs (Swagger UI)
                                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">MCP API Endpoints</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    The MCP server exposes the following endpoints for IDE integration and health monitoring.
                                </p>
                            </div>

                            {/* Health Check Endpoint */}
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Health Check</h3>
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-mono rounded">GET</span>
                                </div>
                                <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm text-gray-900 dark:text-gray-100 mb-3">
                                    {mcpApiUrl}/health
                                </code>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Returns the health status of the MCP server.</p>
                                <div className="mt-3">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Response (200 OK):</p>
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                                        <code className="text-gray-900 dark:text-gray-100">{`{
  "status": "healthy",
  "timestamp": "2026-02-06T22:14:37Z"
}`}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* SSE Endpoint */}
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">SSE Stream</h3>
                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-mono rounded">GET</span>
                                </div>
                                <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm text-gray-900 dark:text-gray-100 mb-3">
                                    {mcpApiUrl}/sse
                                </code>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Server-Sent Events endpoint for real-time MCP communication with IDEs.
                                </p>
                            </div>

                            {/* Backend API Endpoint */}
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Backend API</h3>
                                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-mono rounded">PROXY</span>
                                </div>
                                <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm text-gray-900 dark:text-gray-100 mb-3">
                                    {backendApiUrl}/*
                                </code>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    MCP server proxies requests to the Cognee backend API for knowledge graph operations.
                                </p>
                            </div>

                            {/* Configuration Section */}
                            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">IDE Configuration</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    To connect your IDE to the MCP server, use the following configuration:
                                </p>
                                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                                    <code className="text-gray-900 dark:text-gray-100">{`{
  "mcpServers": {
    "cognee": {
      "url": "${mcpApiUrl}",
      "transport": "sse"
    }
  }
}`}</code>
                                </pre>
                            </div>

                            {/* External Documentation */}
                            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                                <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-2">📚 Full Documentation</h4>
                                <p className="text-sm text-indigo-800 dark:text-indigo-400 mb-3">
                                    For complete MCP setup guides and integration examples, visit:
                                </p>
                                <a
                                    href="https://docs.cognee.ai/cognee-mcp/mcp-local-setup"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm"
                                >
                                    View MCP Documentation
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
