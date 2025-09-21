function About() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-black text-gray-200 flex flex-col items-center justify-center px-6 py-12">
            <h1 className="text-4xl font-bold text-indigo-200 mb-6">About WorkTrace</h1>
            <p className="max-w-2xl text-center text-lg leading-relaxed">
                WorkTrace is a modern attendance and productivity tracking app
                designed to help teams stay on time and stay productive.
                With powerful features like leave management, reporting,
                and smart notifications, WorkTrace makes managing presence simple & efficient.
            </p>
            <p className="mt-4 text-indigo-300 italic">"Your time matters — let’s track it wisely!"</p>
        </div>
    );
}

export default About;
