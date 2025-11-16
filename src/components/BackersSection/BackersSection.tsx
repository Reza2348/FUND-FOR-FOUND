// components/BackersSection.js

export default function BackersSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold mb-8 flex items-center text-gray-800">
          <span className="w-4 h-4 bg-purple-600 inline-block mr-2"></span>
          TOP BACKERS & CONTRIBUTORS
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-normal text-gray-600 mb-5">
            Individuals
          </h3>
          <div className="flex flex-col items-start">
            <div
              className="w-40 h-40 flex items-center justify-center 
                                       rounded-xl bg-gray-100 border-4 border-indigo-500 
                                       shadow-md mb-3"
            ></div>
            <p className="text-base font-medium text-gray-700">
              Nasim shahbazi
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-normal text-gray-600 mb-5">
            Brand or Organization
          </h3>

          <div className="flex flex-col items-start">
            <div
              className="w-40 h-40 flex items-center justify-center 
                                       rounded-xl bg-gray-100 border-4 border-indigo-500 
                                       shadow-md mb-3"
            ></div>
            <p className="text-base font-medium text-gray-700">Kelaasor</p>
          </div>
        </div>
      </div>
    </section>
  );
}
