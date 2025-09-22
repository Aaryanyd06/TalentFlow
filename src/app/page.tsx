'use client';

import type { FC, SVGProps } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Plus, File } from 'lucide-react';
import Image from 'next/image';

const MonitorIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
);

const GridIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);

const UsersIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const SaveIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
);

const TalentFlowLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} width="124" height="28" viewBox="0 0 124 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
        </defs>
        <path d="M4 14C4 8.47715 8.47715 4 14 4C19.5228 4 24 8.47715 24 14C24 19.5228 19.5228 24 14 24" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M14 4C19.5228 4 24 8.47715 24 14C24 19.5228 19.5228 24 14 24C8.47715 24 4 19.5228 4 14" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" strokeDasharray="40 60" transform="rotate(60 14 14)"/>
        <text fill="currentColor" x="32" y="21" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="bold">TalentFlow</text>
    </svg>
);


const AnimatedComponent: FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${className || ''} transition-all duration-700 ease-out`}
            style={{
                transitionDelay: `${delay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
        >
            {children}
        </div>
    );
};


const Card: FC<{
  avatar: string;
  name: string;
  email: string;
  description: string;
  files: number;
  progress: number;
}> = ({ avatar, name, email, description, files, progress }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:-translate-y-1">
    <div className="flex items-center gap-3">
      <Image src={avatar} alt={name} className="w-10 h-10 rounded-full" width={40} height={40} />
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
      </div>
    </div>
    <p className="text-xs text-gray-600 dark:text-gray-300 mt-3">{description}</p>
    <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
      <div className="flex items-center gap-1">
        <File className="w-3 h-3" />
        <span>{files} File</span>
      </div>
      <div className="flex items-center gap-2">
         <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
           <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
         </div>
        <span className='font-medium text-blue-500'>{progress}%</span>
      </div>
    </div>
  </div>
);


const KanbanColumn: FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => (
  <div className="flex-1 min-w-[250px]">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{title} ({count})</h3>
      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
        <Plus className="w-5 h-5" />
      </button>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);


export default function LandingPage() {
  const benefits = [
    { Icon: MonitorIcon, title: "Easily Access", description: "You can access it on a phone or laptop." },
    { Icon: GridIcon, title: "Many Features", description: "We have the best features that help you manage." },
    { Icon: UsersIcon, title: "Collaboration", description: "With our platform, you can collaborate with the other HR." },
    { Icon: SaveIcon, title: "Auto Save", description: "Uses the internet so every update will auto save." }
  ];

  const testimonials = [
    { name: "Jane Cooper", company: "The Walt Disney Company", avatar: "JC", text: "Using this platform streamlined our HR processes, making everything from recruitment to the payroll management a breeze!" },
    { name: "Dianne Russell", company: "Pizza Hut", avatar: "DR", text: "It's simplified complex HR tasks and allowed us to focus more on our core business objectives." },
    { name: "Darrell Steward", company: "Gillette", avatar: "DS", text: "This Platform It is user-friendly and cover every aspect HR operations." },
    { name: "Leslie Alexander", company: "General Electric", avatar: "LA", text: "I'm impressed by the versatility and flexibility of this HR tool. It adapts to our needs effortlessly." },
    { name: "Theresa Webb", company: "tiket.com", avatar: "TW", text: "Our HR department has a significant upgrade since adopting platform. It's intuitive and robust!" },
    { name: "Savannah Nguyen", company: "Bank of America", avatar: "SN", text: "This platform has revolutionized how we can approach HR. It is the complete package for businesses of any scale tasks." },
  ];

  return (
    <>
    <main className="bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-white dark:bg-black px-6 pt-8 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-24">
         <AnimatedComponent>
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-300/10 dark:hover:ring-gray-300/20">
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-200">
                New
              </span>{' '}
              Automation Board With Job{' '}
              <a href="#" className="font-semibold text-blue-600 dark:text-blue-400">
                <span className="absolute inset-0" aria-hidden="true" />
                →
              </a>
            </div>
          </div>
          </AnimatedComponent>
          <AnimatedComponent delay={200}>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              HR Management Definitely Easy And Simple
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Simplify Operations, Empower Teams, And Optimize Workforce Efficiency With Our Comprehensive Human Resources Solutions
            </p>
            <div className="mt-10 flex items-center justify-center">
              <a
                href="#"
                className="rounded-md bg-gray-900 dark:bg-gray-700 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
              >
                Get Started For Free
              </a>
            </div>
          </div>
          </AnimatedComponent>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-24 sm:py-32 bg-gray-50/70 dark:bg-black">
       <AnimatedComponent className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Manage Your Entire Team In One Place</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  A single, centralized hub for all your recruitment needs. Track applicants, schedule interviews, and collaborate with your team seamlessly.
              </p>
          </div>
          <div className="mt-16 flow-root">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="rounded-lg bg-white dark:bg-black shadow-2xl ring-1 ring-gray-900/10">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="w-3 h-3 rounded-full bg-red-400"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    </div>
                    <div className="p-8 bg-gray-100/50 dark:bg-gray-900/50 min-h-[600px]">
                        <div className='flex justify-between items-start mb-8'>
                            <div>
                              <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Product Designer</h1>
                              <p className='text-sm text-gray-500 dark:text-gray-400'>Professional responsible for creating experience product</p>
                            </div>
                            <button className="bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
                              <File className="w-4 h-4" />
                              Export Report
                            </button>
                        </div>
                         <div className="flex gap-6 overflow-x-auto pb-4">
                            <KanbanColumn title="Applied Job" count={10}>
                              <Card name="Robert Fox" email="robertfox@email.com" avatar="https://placehold.co/40x40/E2E8F0/4A5568?text=RF" description="Passionate product designer dedicated to crafting..." files={13} progress={0} />
                              <Card name="Cody Fisher" email="cfisher@email.com" avatar="https://placehold.co/40x40/E2E8F0/4A5568?text=CF" description="Passion for creating intuitive and visually appealing..." files={11} progress={0} />
                            </KanbanColumn>
                            <KanbanColumn title="Review Profile" count={3}>
                               <Card name="Ralph Edwards" email="ralph.e@email.com" avatar="https://placehold.co/40x40/E2E8F0/4A5568?text=RE" description="Dedicated product designer, I am enthusiastic about..." files={13} progress={78} />
                               <Card name="Dianne Lane" email="dianne.l@email.com" avatar="https://placehold.co/40x40/E2E8F0/4A5568?text=DL" description="Deep understanding of user-centric design & strong..." files={11} progress={65} />
                            </KanbanColumn>
                             <KanbanColumn title="Interview" count={5}>
                                <Card name="Kathryn Murphy" email="kathryn.m@email.com" avatar="https://placehold.co/40x40/E2E8F0/4A5568?text=KM" description="Expertise in product design and my passion for..." files={13} progress={84} />
                                <Card name="Kristin Watson" email="kristin.w@email.com" avatar="https://placehold.co/40x40/E2E8F0/4A5568?text=KW" description="Interest in the product design, offering a strong foundation..." files={9} progress={87} />
                            </KanbanColumn>
                            <KanbanColumn title="Hiring Job" count={3}>
                                <Card name="Floyd Miles" email="floyd.m@email.com" avatar="https://placehold.co/40x40/E2E8F0/4A5568?text=FM" description="Passionate about the crafting seamless experiences..." files={5} progress={90} />
                                 <Card name="Bessie Cooper" email="bessie.c@email.com" avatar="https://placehold.co/40x40/E2E8F0/4A5568?text=BC" description="Delivering on the exceptional design..." files={11} progress={90} />
                            </KanbanColumn>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </AnimatedComponent>
      </section>
      
      <section className="py-24 sm:py-32">
        <AnimatedComponent className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Elevating Your Experience<br/>Key Benefits
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Embrace the Transformative Advantages that Propel Efficiency, Collaboration, and Success in HR Management
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:max-w-none lg:gap-y-16">
              {benefits.map((benefit, index) => (
                 <AnimatedComponent key={benefit.title} delay={index * 100}>
                   <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-900/50 shadow-md transition hover:shadow-xl hover:-translate-y-1">
                     <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                       <benefit.Icon className="h-6 w-6" aria-hidden="true" />
                     </div>
                     <dt className="mt-4 text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                       {benefit.title}
                     </dt>
                     <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{benefit.description}</dd>
                   </div>
                 </AnimatedComponent>
              ))}
            </dl>
          </div>
        </AnimatedComponent>
      </section>

      <section className="py-24 sm:py-32">
        <AnimatedComponent className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mt-16 flow-root">
                <div className="relative isolate">
                  <div className="relative mx-auto max-w-5xl rounded-xl bg-white dark:bg-gray-900/80 shadow-2xl ring-1 ring-gray-900/10 p-4">
                      <div className="flex">
                           <div className="w-64 bg-gray-50 dark:bg-gray-900 p-4 rounded-l-lg hidden lg:block">
                             <nav className="flex flex-col space-y-1 text-sm font-medium text-gray-500">
                               <a href="#" className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">Recruitment Board</a>
                               <a href="#" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Graphic Designer</a>
                               <a href="#" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Product Designer</a>
                               <a href="#" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">+ Add Board</a>
                             </nav>
                           </div>

                           <div className="relative flex-1 bg-gray-100/50 dark:bg-gray-900/50 p-6 rounded-r-lg">

                             <div className="blur-sm select-none">
                               <div className="flex justify-between items-center mb-4">
                                 <h3 className="font-semibold text-gray-800 dark:text-gray-200">Applied Job (10)</h3>
                               </div>
                               <div className="space-y-4">
                                 <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 h-24"></div>
                                 <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 h-24"></div>
                               </div>
                             </div>
                             
                             <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                               <div className="w-full max-w-sm bg-white dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 ring-1 ring-gray-900/10">
                                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Board</h3>
                                   <div className="mt-4 space-y-4 text-sm">
                                       <div>
                                         <label htmlFor="boardName" className="font-medium text-gray-700 dark:text-gray-300">Board Name</label>
                                         <input type="text" id="boardName" placeholder="Input board name..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600" />
                                       </div>
                                       <div>
                                         <label htmlFor="automationJob" className="font-medium text-gray-700 dark:text-gray-300">Automation Job</label>
                                         <select id="automationJob" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600">
                                           <option>Select open job</option>
                                         </select>
                                       </div>
                                       <div>
                                         <label className="font-medium text-gray-700 dark:text-gray-300">Select Section</label>
                                         <div className="mt-2 grid grid-cols-2 gap-2">
                                             <div className="flex items-center"><input id="appliedJob" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600" /><label htmlFor="appliedJob" className="ml-2 text-gray-600 dark:text-gray-300">Applied Job</label></div>
                                             <div className="flex items-center"><input id="reviewProfile" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600" /><label htmlFor="reviewProfile" className="ml-2 text-gray-600 dark:text-gray-300">Review Profile</label></div>
                                             <div className="flex items-center"><input id="interview" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" /><label htmlFor="interview" className="ml-2 text-gray-600 dark:text-gray-300">Interview</label></div>
                                             <div className="flex items-center"><input id="hiringJob" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" /><label htmlFor="hiringJob" className="ml-2 text-gray-600 dark:text-gray-300">Hiring Job</label></div>
                                         </div>
                                       </div>
                                   </div>
                                   <div className="mt-6">
                                       <button type="button" className="w-full rounded-md bg-gray-900 dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 dark:hover:bg-gray-600">
                                         Create Board
                                       </button>
                                   </div>
                               </div>
                             </div>
                           </div>
                      </div>
                  </div>
                </div>
            </div>
             <div className="mt-12 max-w-2xl mx-auto text-center">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Job automation</h3>
                <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
                   feature so that every candidate that appears in job recruitment is based on data from available open jobs
                </p>
            </div>
        </AnimatedComponent>
      </section>

      <section className="bg-white dark:bg-black py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <AnimatedComponent className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Client Success Stories And Testimonials
      </h2>
      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
        Explore Experiences Shared by Those Who&apos;ve Thrived With Our Human Resources Tools
      </p>
    </AnimatedComponent>

    <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <AnimatedComponent key={index} delay={index * 100}>
            <div className="break-inside-avoid-column rounded-xl bg-gray-100 dark:bg-gray-800/60 p-6 h-full shadow-sm">
              <p className="text-gray-700 dark:text-gray-300">&quot;{testimonial.text}&quot;</p>
              <div className="mt-4 flex items-center gap-3">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={`https://placehold.co/40x40/E2E8F0/4A5568?text=${testimonial.avatar}`}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedComponent>
        ))}
      </div>
    </div>
  </div>
</section>


    </main>

    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative -mt-16">
          <AnimatedComponent>
           <div className="relative overflow-hidden rounded-2xl bg-blue-600 px-6 py-16 text-center shadow-2xl sm:px-16">
             <div aria-hidden="true" className="absolute inset-0">
                 <div className="absolute inset-0 max-w-full overflow-hidden">
                     <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                         <circle cx="512" cy="512" r="512" fill="url(#gradient-circles)" fillOpacity="0.7" />
                         <defs>
                             <radialGradient id="gradient-circles">
                                 <stop stopColor="#7775D6" />
                                 <stop offset="1" stopColor="#3B82F6" />
                             </radialGradient>
                         </defs>
                     </svg>
                 </div>
             </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Let&apos;s Join And Get Convenience</h2>
            <p className="mt-4 text-lg text-blue-100">Experience the Features and convenience of Next Level Human Resource Management, With Us</p>
            <a href="#" className="mt-8 inline-block rounded-md bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Join Now
            </a>
           </div>
           </AnimatedComponent>
        </div>

        <div className="pt-24 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="md:col-span-2 lg:col-span-2">
                    <TalentFlowLogo className="h-7 text-gray-900 dark:text-white mb-4" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Street Washington Ave Number A2901.<br/>Manchester, Kentucky (39495)</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Section Page</h3>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Header</a></li>
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Advantage</a></li>
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Features</a></li>
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Useful Link</h3>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Services</a></li>
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Product</a></li>
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Features</a></li>
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Social Media</h3>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Instagram</a></li>
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Twitter</a></li>
                        <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Facebook</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">&copy; 2025 TalentFlow. All rights reserved</p>
            </div>
        </div>
      </div>
    </footer>
    </>
  );
}