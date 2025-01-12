
const FAQSection = () => {
  return (
    <section className=" dark:text-gray-800 mt-12 mb-12">
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <h2 className="text-4xl text-green-600 font-semibold sm:text-3xl text-center">Frequently Asked Questions</h2>
        {/* <p className="mt-4 mb-8 dark:text-gray-600">Answers to commonly asked questions about MedicoDirect:</p> */}
        <div className="space-y-4">
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">Are substitutes safe to use?</summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Yes, opting for substitutes is safe. Substitutes contain the same salt composition, undergo the same testing standards, and are as effective as branded medicines. They just cost much less, helping you save every time you purchase medicines.</p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How do I know the medicines are of good quality?</summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">At MedicoDirect, your health is our top priority. We never compromise on the quality of the medicines we recommend. We only sell medicines produced by the top 1% of medicine manufacturers.</p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What are substitutes?</summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Substitutes contain the same salt composition, undergo the same testing standards, and are as effective as branded medicines. They may differ in shape, size, color, and packaging, but they definitely cost much less than branded medicines.</p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">Why do I have to pay delivery charges?</summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Delivery charges are applied to orders below a certain amount. You can view the charges on the order summary page. Increase the overall order amount to qualify for free delivery.</p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
