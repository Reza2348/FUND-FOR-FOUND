const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          About Us
        </h1>
        <p className="text-gray-600 mt-4 sm:mt-5 leading-relaxed text-sm sm:text-base md:text-lg">
          Introducing <span className="font-semibold">"MixMaster"</span>, the
          ultimate party sidekick app that fetches cocktails from the hilarious
          Cocktails DB API. With a flick of your finger, you'll unlock a
          treasure trove of enchanting drink recipes that'll make your taste
          buds dance and your friends jump with joy.
        </p>
        <p className="text-gray-600 mt-3 leading-relaxed text-sm sm:text-base md:text-lg">
          Get ready to shake up your mixology game, one fantastical mocktail at
          a time, and let the laughter and giggles flow!
        </p>
      </div>
    </div>
  );
};

export default About;
