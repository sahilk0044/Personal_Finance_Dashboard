import {
  FaPlusCircle,
  FaBullseye,
  FaChartLine,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaPlusCircle />,
      title: "Add Transactions",
      description:
        "Record your income and expenses with categories, payment methods, and detailed tracking.",
    },
    {
      icon: <FaBullseye />,
      title: "Set Budgets",
      description:
        "Create monthly budgets for different categories and monitor spending in real-time.",
    },
    {
      icon: <FaChartLine />,
      title: "Track Growth",
      description:
        "Analyze financial performance, monitor health scores, and generate detailed reports.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-20">

          <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            How It Works
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            Start Managing Your
            <span className="block text-indigo-600">
              Finances In Minutes
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Finora simplifies personal finance management
            through a simple three-step process.
          </p>

        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center"
            >

              {/* Connector Line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-slate-200 z-0" />
              )}

              {/* Step Number */}
              <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-6">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {step.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;