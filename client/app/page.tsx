'use client';

import React from 'react';
interface StepCardProps {
  number: string;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
  icon: JSX.Element;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  iconColor: string;
}

interface FAQItemProps {
  question: string;
  isOpen?: boolean;
  onToggle: () => void;
}

interface EmailFormProps {
  className?: string;
  onSubmit: (email: string) => void;
}

interface NavItemProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`self-stretch my-auto hover:text-yellow-500 transition-colors ${className}`}
    aria-label={label}
  >
    {label}
  </button>
);

const StepCard: React.FC<StepCardProps> = ({ number, title, description, iconColor, bgColor }) => (
  <div className="flex flex-col self-stretch pt-11 my-auto rounded-none min-w-[240px] w-[350px]">
    <div className={`overflow-hidden z-10 self-center px-4 ml-12 text-2xl font-black text-gray-800 whitespace-nowrap ${bgColor} h-[60px] rounded-[1000px] w-[60px]`}>
      {number}
    </div>
    <div className="flex overflow-hidden flex-col items-center py-11 mt-0 min-h-[419px]">
      <div className={`overflow-hidden px-2.5 text-6xl font-black ${iconColor} whitespace-nowrap bg-gray-800 border border-gray-800 border-solid aspect-square min-h-[200px] rounded-[1000px] w-[200px] max-md:text-4xl`} />
      <h3 className="mt-6 text-2xl font-bold text-violet-100">
        {title}
      </h3>
      <p className="mt-6 text-base text-white">
        {description}
      </p>
    </div>
  </div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, iconColor }) => (
  <div className="flex overflow-hidden flex-col grow shrink items-start self-stretch px-5 py-8 my-auto w-80 bg-gray-800 rounded-2xl min-h-[240px] min-w-[240px]">
    <div className={`text-5xl font-black text-center ${iconColor} max-md:text-4xl`}>
      {icon}
    </div>
    <h3 className="mt-6 text-3xl font-bold text-center text-violet-100">
      {title}
    </h3>
    <p className="self-stretch mt-6 text-base font-semibold text-neutral-400">
      {description}
    </p>
  </div>
);

const FAQItem: React.FC<FAQItemProps> = ({ question, isOpen = false, onToggle }) => (
  <button
    onClick={onToggle}
    className="flex overflow-hidden flex-wrap justify-between items-center px-8 py-9 w-full bg-gray-800 rounded-3xl min-h-[100px] max-md:px-5 hover:bg-gray-700 transition-colors"
    aria-expanded={isOpen}
  >
    <div className="flex-1 shrink self-stretch my-auto text-2xl basis-0 max-md:max-w-full text-left">
      {question}
    </div>
    <div className="self-stretch my-auto text-5xl text-center w-[33px] max-md:text-4xl transform transition-transform">
      {isOpen ? '-' : '+'}
    </div>
  </button>
);

const EmailForm: React.FC<EmailFormProps> = ({ className = '', onSubmit }) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex overflow-hidden flex-wrap gap-4 items-center px-5 text-xl rounded-2xl border border-solid bg-neutral-400 bg-opacity-30 border-neutral-400 border-opacity-50 min-h-[75px] w-[561px] ${className}`}>
      <div className="self-stretch my-auto w-10 text-2xl text-violet-100" />
      <div className="flex-1">
        <label htmlFor="emailInput" className="sr-only">Enter school email address</label>
        <input
          type="email"
          id="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent text-neutral-400 outline-none"
          placeholder="Enter school email address"
          required
        />
      </div>
      <button
        type="submit"
        className="overflow-hidden self-stretch py-3 my-auto font-bold bg-violet-100 rounded-xl border border-violet-100 border-solid min-h-[47px] text-slate-950 w-[143px] hover:bg-violet-200 transition-colors"
      >
        Get Started
      </button>
    </form>
  );
};

export default function LandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const handleEmailSubmit = (email: string) => {
    console.log('Email submitted:', email);
  };

  const handleNavClick = (section: string) => {
    console.log('Navigation clicked:', section);
  };

  const steps: StepCardProps[] = [
    {
      number: "1.",
      title: "Sign up for free",
      description: "Sign up with your university email address to ensure engagement with your peers",
      iconColor: "text-green-400",
      bgColor: "bg-green-400",
      icon: (<svg width="82" height="49" viewBox="0 0 82 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M78.75 12.25C81.625 13.125 81.625 17 78.75 17.875L43.875 28.625C41.375 29.375 39.125 29 38 28.625L13.625 21.125C12 22.125 11.125 23.875 11 25.75C12.125 26.375 13 27.625 13 29C13 30.375 12.25 31.5 11.25 32.25L14.375 46.625C14.625 47.875 13.75 49 12.5 49H5.375C4.125 49 3.25 47.875 3.5 46.625L6.625 32.25C5.625 31.5 5 30.375 5 29C5 27.625 5.75 26.375 7 25.625C7.125 23.5 7.875 21.375 9.25 19.75L3.125 17.875C0.25 17 0.25 13.125 3.125 12.25L38 1.5C39.875 0.875 42 0.875 43.875 1.5L78.75 12.25ZM45 32.5L63.125 26.875L65 41C65 45.5 54.25 49 41 49C27.625 49 17 45.5 17 41L18.75 26.875L36.875 32.5C38.375 33 41.5 33.5 45 32.5Z" fill="#36E86E" />
      </svg>)
    },
    {
      number: "2.",
      title: "Select game to join",
      description: "We curate games for you to play in based on your skill level, school, and sports you enjoy",
      iconColor: "text-sky-400",
      bgColor: "bg-sky-400",
      icon: (<svg width="82" height="49" viewBox="0 0 82 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M78.75 12.25C81.625 13.125 81.625 17 78.75 17.875L43.875 28.625C41.375 29.375 39.125 29 38 28.625L13.625 21.125C12 22.125 11.125 23.875 11 25.75C12.125 26.375 13 27.625 13 29C13 30.375 12.25 31.5 11.25 32.25L14.375 46.625C14.625 47.875 13.75 49 12.5 49H5.375C4.125 49 3.25 47.875 3.5 46.625L6.625 32.25C5.625 31.5 5 30.375 5 29C5 27.625 5.75 26.375 7 25.625C7.125 23.5 7.875 21.375 9.25 19.75L3.125 17.875C0.25 17 0.25 13.125 3.125 12.25L38 1.5C39.875 0.875 42 0.875 43.875 1.5L78.75 12.25ZM45 32.5L63.125 26.875L65 41C65 45.5 54.25 49 41 49C27.625 49 17 45.5 17 41L18.75 26.875L36.875 32.5C38.375 33 41.5 33.5 45 32.5Z" fill="#36E86E" />
      </svg>)
    },
    {
      number: "3.",
      title: "Enjoy the action",
      description: "Play in local pickup games with players of similar skill levels for competitive and enjoyable games",
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500",
      icon: (<svg width="82" height="49" viewBox="0 0 82 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M78.75 12.25C81.625 13.125 81.625 17 78.75 17.875L43.875 28.625C41.375 29.375 39.125 29 38 28.625L13.625 21.125C12 22.125 11.125 23.875 11 25.75C12.125 26.375 13 27.625 13 29C13 30.375 12.25 31.5 11.25 32.25L14.375 46.625C14.625 47.875 13.75 49 12.5 49H5.375C4.125 49 3.25 47.875 3.5 46.625L6.625 32.25C5.625 31.5 5 30.375 5 29C5 27.625 5.75 26.375 7 25.625C7.125 23.5 7.875 21.375 9.25 19.75L3.125 17.875C0.25 17 0.25 13.125 3.125 12.25L38 1.5C39.875 0.875 42 0.875 43.875 1.5L78.75 12.25ZM45 32.5L63.125 26.875L65 41C65 45.5 54.25 49 41 49C27.625 49 17 45.5 17 41L18.75 26.875L36.875 32.5C38.375 33 41.5 33.5 45 32.5Z" fill="#36E86E" />
      </svg>)
    }
  ];

  const features: FeatureCardProps[] = [
    {
      icon: "",
      title: "Network",
      description: "Play with people of similar academic and professional interests",
      iconColor: "text-green-400"
    },
    {
      icon: "",
      title: "Curated Matches",
      description: "Get the perfect game for you every time with our matchmaking system",
      iconColor: "text-sky-400"
    },
    {
      icon: "",
      title: "Discover New Sports",
      description: "Step out of your comfort zone and join beginner games for new sports",
      iconColor: "text-rose-500"
    }
  ];

  const faqQuestions = [
    "Is this application available to all colleges nationwide?",
    "Are community college students eligible to participate?",
    "Can I bring a friend who does not have an account?",
    "Which sports are available to play?"
  ];

  return (
    <div className="flex flex-col px-2">
      <div className="flex overflow-hidden relative flex-col w-full border border-black border-solid bg-slate-950 min-h-[4592px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:max-w-full">
        <nav className="flex overflow-hidden z-0 flex-wrap gap-2.5 justify-center items-center p-2.5 w-full text-xl font-semibold text-violet-100 min-h-[80px] max-md:max-w-full">
          <div className="flex-1 shrink self-stretch my-auto text-3xl font-extrabold text-yellow-500 basis-5">
            Campus Pickup
          </div>
          <div className="flex overflow-hidden flex-wrap gap-10 justify-center items-center self-stretch my-auto whitespace-nowrap min-h-[60px] min-w-[240px] w-[584px] max-md:max-w-full">
            <NavItem label="Games" onClick={() => handleNavClick('games')} />
            <NavItem label="Community" onClick={() => handleNavClick('community')} className="w-[119px]" />
            <NavItem label="Sports" onClick={() => handleNavClick('sports')} />
          </div>
          <NavItem label="Log in" onClick={() => handleNavClick('login')} className="overflow-hidden flex-1 shrink gap-2.5 self-stretch px-2.5 py-4 my-auto min-w-[240px]" />
        </nav>

        <main>
          <section className="hero-section">
            <div className="flex relative flex-col justify-center items-center px-20 py-36 min-h-[579px] max-md:px-5 max-md:py-24 max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bba5c174362a8999a333fe16ce9b2a7355c4a10b95978981866260acb66f4cb2?placeholderIfAbsent=true&apiKey=5da21df188f445a3b589bf87d350c7e8"
                alt="Campus Pickup hero background"
                className="object-cover absolute inset-0 size-full"
              />
              <div className="flex relative flex-col items-center mb-0 max-w-full w-[798px] max-md:mb-2.5">
                <h1 className="self-stretch text-6xl text-center text-violet-100 max-md:max-w-full max-md:text-4xl">
                  Pickup Sports Done Right.
                </h1>
                <p className="mt-4 text-2xl text-center text-neutral-400 max-md:max-w-full">
                  Engage with your campus community through sports.
                </p>
                <EmailForm className="mt-16 ml-5" onSubmit={handleEmailSubmit} />
                <p className="mt-3 text-base text-center text-neutral-400 max-md:max-w-full">
                  *Must have a valid student email address to participate
                </p>
              </div>
            </div>
          </section>

          <section className="steps-section">
            <h2 className="text-5xl font-semibold text-center text-violet-100 max-md:max-w-full max-md:text-4xl">
              How We Work
            </h2>
            <div className="flex overflow-hidden flex-wrap gap-10 justify-center items-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
              {steps.map((step, index) => (
                <StepCard key={index} {...step} />
              ))}
            </div>
          </section>

          <section className="features-section">
            <h2 className="text-5xl font-semibold text-center text-violet-100 max-md:max-w-full max-md:text-4xl">
              Why Campus Pickup?
            </h2>
            <div className="flex overflow-hidden flex-wrap gap-5 justify-center items-center px-3 mt-16 w-full max-md:mt-10 max-md:max-w-full">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </section>

          <section className="testimonial-section">
            <div className="flex overflow-hidden flex-col justify-between px-32 mt-36 w-full text-6xl font-black text-center text-yellow-500 min-h-[453px] max-md:px-5 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
              <blockquote className="self-center mt-7 text-3xl font-bold text-violet-100 max-md:max-w-full">
                I've made countless friends, played in the most enjoyable games, and never got left out of the action
              </blockquote>
              <cite className="self-center mt-7 text-2xl text-neutral-400 max-md:max-w-full">
                – Noah Scheuerman, San Jose State University
              </cite>
            </div>
          </section>

          <section className="cta-section">
            <div className="flex overflow-hidden flex-col justify-center items-center px-28 mt-36 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <h2 className="text-5xl font-semibold text-center text-violet-100 max-md:max-w-full max-md:text-4xl">
                Join the ever-growing community of 1,000+ college students today
              </h2>
              <EmailForm className="mt-12" onSubmit={handleEmailSubmit} />
            </div>
          </section>

          <section className="py-16">
            <div className="flex overflow-hidden relative flex-col px-60 mt-36 w-full text-violet-100 min-h-[659px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <h2 className="z-0 self-center text-5xl font-bold text-center max-md:max-w-full max-md:text-4xl">
                Frequently Asked Questions
              </h2>
              <div className="flex overflow-hidden absolute bottom-0 z-0 flex-col items-center px-1.5 pt-2.5 pb-20 font-semibold h-[532px] max-w-[918px] min-h-[532px] w-[918px] max-md:max-w-full">
                {faqQuestions.map((question, index) => (
                  <div key={index} className="mt-4 w-full first:mt-0">
                    <FAQItem
                      question={question}
                      isOpen={openFaqIndex === index}
                      onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}